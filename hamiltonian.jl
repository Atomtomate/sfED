
########################################################################
# Return the local orbital levels, define them by hand here
function getEps(smallValue::Float64)
	eps = zeros(Float64,Nmax)
	for i=0:norb-1              # Just shift one orbital down, the other up by +-1
		eps[2*i+1] = 1.0*(-1)^i    # up spin
		eps[2*i+2] = eps[2*i+1]    #dn spin
	end

	# add a very small random term to each local level to lift degeneracy and improve numerical stability
	for i=1:Nmax
		eps[i] += rand([-1,1]) * rand(Float64) * smallValue
	end
	return eps
end
########################################################################

########################################################################
# Return the hoppingmatrix, define by hand here
function getTmatrix()
	tmatrix = zeros(Float64,norb,norb)
	if norb==4
		# A B dimer
		tmatrix = -[0 0 t 0;
	  	 	         0 0 0 t;
	               t 0 0 0;
					   0 t 0 0]
	elseif norb==8
		# A B plaquette
		# C D
		tmatrix = -[0 0 t 0 t 0 0 0;
	  	 	         0 0 0 t 0 t 0 0;
	  	 	         t 0 0 0 0 0 t 0;
	  	 	         0 t 0 0 0 0 0 t;
	  	 	         t 0 0 0 0 0 t 0;
	  	 	         0 t 0 0 0 0 0 t;
	               0 0 t 0 t 0 0 0;
					   0 0 0 t 0 t 0 0]
	end
	return tmatrix
end
########################################################################

########################################################################
# Return the Coulomb interaction matrices, define them by hand here
function getUJmatrix()
	Umatrix = zeros(Float64,norb,norb)
	Jmatrix = zeros(Float64,norb,norb)
	if (norb==1)
		Umatrix = [U]
		Jmatrix = [0]
	elseif (norb==2)
		Umatrix = [U Up;
					  Up U]
		Jmatrix = [0 J;
					  J 0]
	elseif norb==4
		# A B dimer
		Umatrix = [U Up 0 0;   # we assume two orbitals per site
		           Up U 0 0;
					  0 0 U Up;
					  0 0 Up U]
		Jmatrix = [0 J 0 0;
		           J 0 0 0;
					  0 0 0 J;
					  0 0 J 0]
	elseif norb==8
		# A B plaquette
		# C D
		Umatrix = [U Up 0 0 0 0 0 0; # we assume two orbitals per site
		           Up U 0 0 0 0 0 0;
		           0 0 U Up 0 0 0 0;
		           0 0 Up U 0 0 0 0;
		           0 0 0 0 U Up 0 0;
		           0 0 0 0 Up U 0 0;
					  0 0 0 0 0 0 U Up;
					  0 0 0 0 0 0 Up U]
		Jmatrix = [0 J 0 0 0 0 0 0;
		           J 0 0 0 0 0 0 0;
		           0 0 0 J 0 0 0 0;
		           0 0 J 0 0 0 0 0;
		           0 0 0 0 0 J 0 0;
		           0 0 0 0 J 0 0 0;
					  0 0 0 0 0 0 0 J;
					  0 0 0 0 0 0 J 0]
	end
	return Umatrix,Jmatrix
end
########################################################################

#######################################################################
# return the hopping contribution for states <i| |j>
function getHopping( istate::Array{Int64,1},
                     jstate::Array{Int64,1},
						  tmatrix::Array{Float64,2})
	# we act c^dagger c on the state |j> and check overlap with <i|
	htmp = 0.0
	for m1=1:norb
		for m2=1:norb
			if ( abs(tmatrix[m1,m2]) > cutoff && m1!=m2 )   # no hopping for same orbitals (this is in eps)
				tval = tmatrix[m1,m2]
				for s=0:1 # spin
					a1 = (m1-1)*2+s  +1
					c1 = (m2-1)*2+s  +1
	
					htmp += tval*getMatrixElem1Particle(c1,a1,istate,jstate)
				end
			end # if t>cutoff
		end # m2
	end # m1
	return htmp
end
#######################################################################


#######################################################################
# return the  density density part of the Coulomb interaction contribution
function getUdensity(  state::Array{Int64,1},
                     Umatrix::Array{Float64,2},
							Jmatrix::Array{Float64,2})
	htmp = 0.0
	for m1=1:norb
		n1up = state[2*m1-1]
		n1dn = state[2*m1-0]
		htmp += Umatrix[m1,m1]*n1up*n1dn

		for m2=m1+1:norb
			if abs(Umatrix[m1,m2]) > cutoff
				n2up = state[2*m2-1]
				n2dn = state[2*m2-0]
				htmp += Umatrix[m1,m2]*n1up*n2dn
				htmp += Umatrix[m1,m2]*n1dn*n2up
				htmp += (Umatrix[m1,m2]-Jmatrix[m1,m2])*n1up*n2up
				htmp += (Umatrix[m1,m2]-Jmatrix[m1,m2])*n1dn*n2dn
			end
		end # m2
	end # m1
	return htmp
end
#######################################################################

#######################################################################
# return the spin-flip and pair-hopping part of the interaction contribution
function getUnondensity( istate::Array{Int64,1},
                         jstate::Array{Int64,1},
								Jmatrix::Array{Float64,2})
	htmp = 0.0
	for m1=1:norb
		for m2=1:norb
			if ( abs(Jmatrix[m1,m2]) > cutoff && m1!=m2 )
				Jval = Jmatrix[m1,m2]

            # spin flip !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
				a4 = (m2-1)*2+0  +1 # +1 since Julia starts indexing at 1
				a3 = (m1-1)*2+1  +1
				c2 = (m2-1)*2+1  +1
				c1 = (m1-1)*2+0  +1

				htmp += Jval * getMatrixElem2Particle(c1,c2,a3,a4,istate,jstate)

            # pair hopping !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
				a4 = (m2-1)*2+0  +1 # +1 since Julia starts indexing at 1
				a3 = (m2-1)*2+1  +1
				c2 = (m1-1)*2+1  +1
				c1 = (m1-1)*2+0  +1

				htmp += Jval * getMatrixElem2Particle(c1,c2,a3,a4,istate,jstate)

			end # if Jmat>cutoff
		end # m2
	end # m1
	return htmp
end
#######################################################################

#######################################################################
# Calculate the matrix element for a one particle operator given the creation and annihilation operator
function getMatrixElem1Particle(c1::Int64,
                                a1::Int64,
										  istate::Array{Int64,1},
										  jstate::Array{Int64,1})
	tmp = 0.0
   # check that there is a particle to annihilate and an empty state to create when going j->i,
	# and that the reverse holds for the <i| state
	if ( jstate[a1]==1 && jstate[c1]==0 &&
        istate[a1]==0 && istate[c1]==1  )

		state = copy(jstate)
		state[a1] = 0                   # First destroy particle
		a1sgn = (-1)^sum(state[1:a1])   # Then we can safely count the #particles before the particle in the state
		c1sgn = (-1)^sum(state[1:c1])   # We can safely count the #particles before creating since state[c1]==0 
		state[c1] = 1                   # Now create particle

		if state==istate
			tmp = a1sgn*c1sgn
		end
	end # if

#ALTERNATE VERSION which is only marginally faster, but harder to read
	  # check that there is a particle to annihilate and an empty state to create when going j->i,
	  # and that the reverse holds for the <i| state
	  # then we can compare the states by counting the difference between them, it has to be exactly
	  # 2, since they differ only in a1 and c1 position
#	if (jstate[a1]==1 && jstate[c1]==0 && istate[a1]==0 && istate[c1]==1 && sum(istate .!= jstate)==2 )
#
#		a1sgn = (-1)^(sum(jstate[1:a1])-1)  # We need to subtract 1 because there is a particle at a1 in |i>
#		c1sgn = (-1)^(sum(istate[1:c1])-1)    # We need to subtract 1 because there is a particle at c1 in <j|
#		tmp = a1sgn*c1sgn
#	end # if

	return tmp
end
#######################################################################

#######################################################################
# Calculate the matrix element for a two particle operator given the creation and annihilation operators
function getMatrixElem2Particle(c1::Int64,
										  c2::Int64,
										  a3::Int64,
										  a4::Int64,
										  istate::Array{Int64,1},
										  jstate::Array{Int64,1} )
	tmp = 0.0

	if (jstate[a4]==1 && jstate[c2]==0  &&      # check that there are two particles to annihilate in |j>
		 jstate[a3]==1 && jstate[c1]==0  &&      # and space for two to create in <i|
		 istate[a4]==0 && istate[c2]==1  &&
		 istate[a3]==0 && istate[c1]==1 )

		state = copy(jstate)
		state[a4] = 0                   # First destroy particle
		a4sgn = (-1)^sum(state[1:a4])   # Then we can safely count the #particles before the particle in the state
		state[a3] = 0                   # Destroy next particle
		a3sgn = (-1)^sum(state[1:a3])   # safely count the #particles
		c2sgn = (-1)^sum(state[1:c2])   # We can safely count the #particles before creating since state[c2]==0
		state[c2] = 1                   # Destroy next particle
		c1sgn = (-1)^sum(state[1:c1])   # We can safely count the #particles before creating since state[c2]==0
		state[c1] = 1                   # Destroy next particle

		if state==istate
			tmp = a4sgn*a3sgn*c2sgn*c1sgn
		end
	end # if
	return tmp
end
#######################################################################

#######################################################################
function getHamiltonian(    eps::Array{Float64,1},
                        tmatrix::Array{Float64,2},
								Umatrix::Array{Float64,2},
								Jmatrix::Array{Float64,2}, 
								states::Array{Array{Int64,1},1})::SparseMatrixCSC{Complex{Float64},Int64}

	# Set up index array for the sparse Hamiltonian Matrix
	HamiltonianElementsI = Int64[]
	HamiltonianElementsJ = Int64[]
	HamiltonianElementsV = ComplexF64[]
	for i=1:length(states)
		Hiitmp = 0.0
		# set the diagonals 
		Hiitmp += -mu*sum(states[i])     # chemical potential
		Hiitmp += sum(eps .* states[i] ) # onsite levels
	
		# get Density-Density interaction terms
		Hiitmp += getUdensity(states[i],Umatrix,Jmatrix)
	
		# Now we can set the matrix element
		push!( HamiltonianElementsI, i )
		push!( HamiltonianElementsJ, i )
		push!( HamiltonianElementsV, Hiitmp )
	
		# now offdiagonals
		for j=i+1:length(states)
			Hijtmp = 0.0
	
			# Hopping terms ###########################################
			Hijtmp += getHopping(states[i], states[j], tmatrix)
	
			# Pair-hopping and spin-flip terms of the Coulomb interaction
			Hijtmp += getUnondensity(states[i], states[j], Jmatrix)
	
			# Now we can set the matrix element
			push!( HamiltonianElementsI, i )
			push!( HamiltonianElementsJ, j )
			push!( HamiltonianElementsV, Hijtmp )
	
			push!( HamiltonianElementsI, j )     # the hermitian conjugate elements
			push!( HamiltonianElementsJ, i )
			push!( HamiltonianElementsV, Hijtmp )
	                     
		end # j ket
	end # i bra
	
	# Construct the sparse matrix
	return sparse( HamiltonianElementsI,HamiltonianElementsJ,HamiltonianElementsV )
end
#######################################################################

#######################################################################
# Diagonalize a given Hamiltonian
function getEvalEvecs(Hamiltonian::SparseMatrixCSC{Complex{Float64},Int64} )
	dim = size(Hamiltonian)[1]

	if  dim<10 || nevalsPerSubspace>0.7*dim    # Full diagonalization if matrix is small 
		HamDense = Matrix(Hamiltonian)
		evals = eigvals(HamDense)
		evecs = eigvecs(HamDense)
		return real(evals), evecs
	else                              # Otherwise use Arpack
		evals,evecs = eigs(Hamiltonian,nev=nevalsPerSubspace,which=:SR)
		return real(evals), evecs
	end
end
#######################################################################

##########################################################################
# Create the N,S submatrices of the Hamiltonian, solve it and return the Eigenvalues and Vectors in a List
#########################################################################
function getEvalveclist(      eps::Array{Float64,1},
                          tmatrix::Array{Float64,2},
								  Umatrix::Array{Float64,2},
								  Jmatrix::Array{Float64,2}, 
								allstates::Array{Array{Array{Array{Int64,1},1},1},1})
	evallist::Array{Array{Float64,1},1}          = [] # this list stores the lowest of the smallest eigenvalues and N, S quantum numbers
	eveclist::Array{Array{Complex{Float64},1},1} = [] # this list stores the lowest of the smallest eigenvectors

	for n=0:Nmax
		for s=1:noSpinConfig(n,Nmax)
			dim = length(allstates[n+1][s])
			print("Constructing Hamiltonian(",dim,"x",dim,"), N=",n,", S=",spinConfig(s,n,Nmax),"... ")

			# now get the Hamiltonian submatrix spanned by all states <i| |j> in the N,S space (sparse matrix)
			Hamiltonian = getHamiltonian(eps,tmatrix,Umatrix,Jmatrix,allstates[n+1][s])
			println("Done!")
	
			print("Diagonalizing Hamiltonian... ")
			evals,evecs = getEvalEvecs(Hamiltonian)
			
			# save the pairs of eigvals and eigvecs, also the N,S quantum numbers
			for i=1:min(nevalsPerSubspace,length(evals))
				push!( evallist, [ evals[i], n, s ] )
				push!( eveclist, evecs[:,i] )
			end
			println("Done!")
	
			# now sort and trim the list of eigenvalues and vectors since we only want to keep nevalsTotalMax
			perm = sortperm(first.(evallist))
			evallist =copy( ( evallist[perm] )[1:min(nevalsTotalMax,length(evallist))] )
			eveclist =copy( ( eveclist[perm] )[1:min(nevalsTotalMax,length(evallist))] )
			
		end # s
	end # n
	return evallist,eveclist
end
#######################################################################

#######################################################################
# Calculate partition function
function getZ(evallist::Array{Array{Float64,1},1})
	evals = first.(evallist)
	E0 = minimum(evals)
	return sum( exp.(-beta.*( evals .-E0)) )  # subtract E0 to avoid overflow
end
#######################################################################
