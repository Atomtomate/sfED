var documenterSearchIndex = {"docs":
[{"location":"","page":"Home","title":"Home","text":"CurrentModule = sfED","category":"page"},{"location":"#sfED","page":"Home","title":"sfED","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"TODO: general information","category":"page"},{"location":"#Index","page":"Home","title":"Index","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"","category":"page"},{"location":"","page":"Home","title":"Home","text":"Modules = [sfED]","category":"page"},{"location":"#sfED.getCdagmatrix-Tuple{Int64,Array{Array{Int8,1},1},Array{Array{Int8,1},1}}","page":"Home","title":"sfED.getCdagmatrix","text":"getCdagmatrix(crea,subspace1,subspace2)\n\nGenerate the matrix for the creation operator acting on the subspace with N-1,S-1 quantum numbers we act subspace1 * cdag * subspace2 subspace 2 has all basis states with N-1,S-1 because we have previously annihilated one up electron subspace 1 has all basis states with N,S now just determine the transformation when acting the creation operator crea on it crea is the orbital/spin index\n\n\n\n\n\n","category":"method"},{"location":"#sfED.getCmatrix-Tuple{Int64,Array{Array{Int8,1},1},Array{Array{Int8,1},1}}","page":"Home","title":"sfED.getCmatrix","text":"getCmatrix(anni::Int64,subspace2, subspace1)\n\nGenerate the matrix for the annihilation operator acting on the subspace with N,S quantum number we act subspace2 * c * subspace1 subspace 1 has all basis states with N,S subspace 2 has all basis states with N-1,S-1 because we always annihilate one up electron now just determine the transformation when acting the annihilation operator anni on it anni is the orbital/spin index\n\n\n\n\n\n","category":"method"},{"location":"#sfED.getCsign-Tuple{Int64,Array{Int8,1}}","page":"Home","title":"sfED.getCsign","text":"getCsign(i,state)\n\nreturn the sign when creating/annihilating an electron at position i in state.\n\n\n\n\n\n","category":"method"},{"location":"#sfED.getEps-Tuple{sfED.NumericalParameters,sfED.ModelParameters}","page":"Home","title":"sfED.getEps","text":"getEps(pNumerics,pModel)\n\nReturn the local orbital levels, define them by hand here. Values are perturbed by smallValue TODO: this should be overloaded to accept text file or command line inputs.\n\n\n\n\n\n","category":"method"},{"location":"#sfED.getEvalEvecs-Tuple{SparseArrays.SparseMatrixCSC{Complex{Float32},Int64},UInt64}","page":"Home","title":"sfED.getEvalEvecs","text":"getEvalEvecs(Hamiltonian)\n\nDiagonalize a given Hamiltonian. Eigenvalues will be cast to real, since the Hamiltonian is hermitian.\n\n\n\n\n\n","category":"method"},{"location":"#sfED.getEvalveclist-Tuple{Array{Float64,1},Array{Float64,2},Array{Float64,2},Array{Float64,2},Float64,Array{Array{Array{Array{Int8,1},1},1},1},sfED.NumericalParameters}","page":"Home","title":"sfED.getEvalveclist","text":"getEvalveclist(eps,tmatrix,Umatrix,Jmatrix,allstates)\n\nCreate the N,S submatrices of the Hamiltonian, solve it and return the Eigenvalues and Vectors in a List\n\n\n\n\n\n","category":"method"},{"location":"#sfED.getFuckingLarge2partTerm-Tuple{Array{Float32,1},Float32,Float32,Any,Any,Any,Any,Any}","page":"Home","title":"sfED.getFuckingLarge2partTerm","text":"getFuckingLarge2partTerm(w1,w2,w3,Em,En,Eo,Ep,beta)\n\nEvaluate the Lehmann term for the 2part Green's function\n\n\n\n\n\n","category":"method"},{"location":"#sfED.getG0-Tuple{Array{Float64,1},Array{Float64,2},sfED.SimulationParameters,Array{Complex{Float32},1}}","page":"Home","title":"sfED.getG0","text":"getG0(eps, tmatrix, w)\n\nConstruct the noninteracting Green's function from onsite energy eps, hoppings between sites i and j, tmatrix and Matsubara grid w.\n\n\n\n\n\n","category":"method"},{"location":"#sfED.getGF-Tuple{Array{Array{Float32,1},1},Array{Array{Complex{Float32},1},1},Array{Array{Array{Array{Int8,1},1},1},1},sfED.ModelParameters,sfED.SimulationParameters,sfED.FrequencyMeshes,sfED.NumericalParameters}","page":"Home","title":"sfED.getGF","text":"getGF(evallist, eveclist, allstates, pModel, pSimulation, pFreq, pNumerics)\n\nEvaluation of the Lehmann representation for the interacting finite-temperature Green's function We sum over all Eigenstates evallist with electron number N and all other eigenstates n2 with electron number N-1 Since we have spin degeneracy, we only calculate the up GF, so we annihilate one up spin, so we also only sum over all S-1 states for given S(n1)\n\n\n\n\n\n","category":"method"},{"location":"#sfED.getGF2part-Tuple{Array{Array{Float32,1},1},Array{Array{Complex{Float32},1},1},Array{Array{Array{Array{Int8,1},1},1},1},sfED.ModelParameters,sfED.SimulationParameters,sfED.FrequencyMeshes,sfED.NumericalParameters}","page":"Home","title":"sfED.getGF2part","text":"getGF2part(evallist, eveclist, allstates, pModel, pSimulation, pFreq, pNumerics)\n\nEvaluation of the Lehmann representation for the interacting finite-temperature 2-particle Green's function We sum over all Eigenstates evallist with electron number N and all other eigenstates connected by c and c^dagger We choose the definition G^(2)up,dn = <T c^dagup(t1) cup(t2) c^dagdn(t3) c_dn(0) >\n\n\n\n\n\n","category":"method"},{"location":"#sfED.getHamiltonian-Tuple{Array{Float64,1},Array{Float64,2},Array{Float64,2},Array{Float64,2},Float64,Array{Array{Int8,1},1},sfED.NumericalParameters}","page":"Home","title":"sfED.getHamiltonian","text":"getHamiltonian(eps,tmatrix,Umatrix,Jmatrix,states)\n\nConstructs hamiltonian from onsite energies eps, hoppings tmatrix, coulomb interactions Umatrix and Jmatrix over precomputed states.\n\n\n\n\n\n","category":"method"},{"location":"#sfED.getHopping-Tuple{Array{Int8,1},Array{Int8,1},Array{Float64,2},sfED.NumericalParameters}","page":"Home","title":"sfED.getHopping","text":"getHopping(istate, jstate, tmatrix)\n\nreturn the hopping contribution for states <i| |j>\n\n\n\n\n\n","category":"method"},{"location":"#sfED.getMatrixElem1Particle-Tuple{Int64,Int64,Array{Int8,1},Array{Int8,1}}","page":"Home","title":"sfED.getMatrixElem1Particle","text":"getMatrixElem1Particle(c1, a1, istate, jstate)\n\nCalculate the matrix element for a one particle operator given the creation and annihilation operator with indices c1 and a1 repsectively.\n\n\n\n\n\n","category":"method"},{"location":"#sfED.getMatrixElem2Particle-Tuple{Int64,Int64,Int64,Int64,Array{Int8,1},Array{Int8,1}}","page":"Home","title":"sfED.getMatrixElem2Particle","text":"getMatrixElem2Particle(c1,c2,a3,a4,istate,jstate)\n\nCalculate the matrix element for a two particle operator given the creation and annihilation operators with indices c1, c2 and a3,a4.\n\n\n\n\n\n","category":"method"},{"location":"#sfED.getNmaxFromAllstates-Tuple{Array{Array{Array{Array{Int8,1},1},1},1}}","page":"Home","title":"sfED.getNmaxFromAllstates","text":"getNmaxFromAllstates(allstates)\n\nreturn the maximum number of electrons possible determined from the allstates array\n\n\n\n\n\n","category":"method"},{"location":"#sfED.getPossibleTransitions-Tuple{Array{Array{Float32,1},1},Array{Array{Complex{Float32},1},1},Array{Array{Array{Array{Int8,1},1},1},1},sfED.NumericalParameters}","page":"Home","title":"sfED.getPossibleTransitions","text":"getPossibleTransitions(evallist,eveclist,allstates,pNumerics)\n\nCalculate the overlap elements between all Eigenstates acting on c/c^dagger\n\n\n\n\n\n","category":"method"},{"location":"#sfED.getSigma-Tuple{Array{Complex{Float32},3},Array{Complex{Float32},3}}","page":"Home","title":"sfED.getSigma","text":"getSigma(G0, G)\n\nCalculate the Selfenergy from G0 and G\n\n\n\n\n\n","category":"method"},{"location":"#sfED.getSpin-Tuple{Array{Int8,1}}","page":"Home","title":"sfED.getSpin","text":"getSpin(states)\n\ntotal spin S of state.\n\n\n\n\n\n","category":"method"},{"location":"#sfED.getTmatrix-Tuple{sfED.ModelParameters,sfED.SimulationParameters}","page":"Home","title":"sfED.getTmatrix","text":"getTmatrix(pModel)\n\nReturn the hoppingmatrix, defined by hand here TODO: this should be overloaded to accept text file or command line inputs.\n\n\n\n\n\n","category":"method"},{"location":"#sfED.getUJmatrix-Tuple{sfED.ModelParameters,sfED.SimulationParameters}","page":"Home","title":"sfED.getUJmatrix","text":"getUJmatrix(pModel)\n\nReturn the Coulomb interaction matrices, defined by hand here TODO: this should be overloaded to accept text file or command line inputs.\n\n\n\n\n\n","category":"method"},{"location":"#sfED.getUdensity-Tuple{Array{Int8,1},Array{Float64,2},Array{Float64,2},sfED.NumericalParameters}","page":"Home","title":"sfED.getUdensity","text":"getUdensity(state, Umatrx, Jmatrix)\n\nreturn the  density density part of the Coulomb interaction contribution\n\n\n\n\n\n","category":"method"},{"location":"#sfED.getUnondensity-Tuple{Array{Int8,1},Array{Int8,1},Array{Float64,2},sfED.NumericalParameters}","page":"Home","title":"sfED.getUnondensity","text":"getUnondensity(istate, jstate, Jmatrix)\n\nreturn the spin-flip and pair-hopping part of the interaction contribution\n\n\n\n\n\n","category":"method"},{"location":"#sfED.getZ-Tuple{Array{Array{Float32,1},1},Float64}","page":"Home","title":"sfED.getZ","text":"getZ(evallist)\n\nCalculate partition function from the eigenvalues in evallist.\n\n\n\n\n\n","category":"method"},{"location":"#sfED.indexSpinConfig-Tuple{Int64,Int64,UInt32}","page":"Home","title":"sfED.indexSpinConfig","text":"indexSpinConfig(S,n,Nmax)\n\nIndex i corresponding to a spin config S for given n,nMax\n\n\n\n\n\n","category":"method"},{"location":"#sfED.noSpinConfig-Tuple{Int64,UInt32}","page":"Home","title":"sfED.noSpinConfig","text":"noSpinConfig(n, Nmax)\n\nNumber of configurations with different total spin S possible for given n and Nmax.\n\n\n\n\n\n","category":"method"},{"location":"#sfED.printEvalInfo-Tuple{Array{Array{Float32,1},1},Array{Array{Complex{Float32},1},1},Array{Array{Array{Array{Int8,1},1},1},1}}","page":"Home","title":"sfED.printEvalInfo","text":"printEvalInfo(evallist, eveclist, allstates)\n\nPrint the Eigenvalues and some info\n\n\n\n\n\n","category":"method"},{"location":"#sfED.printGFnorm-Tuple{Array{Float64,1},Float32}","page":"Home","title":"sfED.printGFnorm","text":"printGFnorm(gfdiagnorm)\n\nPrint the calculated normalization of the diagonal Green's function elements\n\n\n\n\n\n","category":"method"},{"location":"#sfED.printStateInfo-Tuple{Array{Array{Array{Array{Int8,1},1},1},1}}","page":"Home","title":"sfED.printStateInfo","text":"printStateInfo(allstates)\n\nPrint all states and N S quantum numbers\n\n\n\n\n\n","category":"method"},{"location":"#sfED.spinConfig-Tuple{UInt64,Int64,UInt32}","page":"Home","title":"sfED.spinConfig","text":"spinConfig(i,n,Nmax)\n\ni-th possible total spin value S for given n, nMax. i starts at 1 (eg S=-2,0,2)  Our electrons have spin +- 1 !!!!!!!!!!!!!!!!!!!\n\n\n\n\n\n","category":"method"},{"location":"#sfED.writeEvalContributions-Tuple{String,Array{Array{Float64,1},1}}","page":"Home","title":"sfED.writeEvalContributions","text":"writeEvalContributions(file, evalContributions)\n\nwrite the weight contribtions of each Eigenstate sorted by Eigenenergy\n\n\n\n\n\n","category":"method"},{"location":"#sfED.writeEvalContributionsSectors-Tuple{String,Array{Array{Float64,1},1}}","page":"Home","title":"sfED.writeEvalContributionsSectors","text":"writeEvalContributionsSectors(filename, evalContributions)\n\nwrite the weight contribtions of each Eigenstate sorted by N,S quantum numbers\n\n\n\n\n\n","category":"method"},{"location":"#sfED.writeGF-Tuple{String,Array{Complex{Float32},3},Any}","page":"Home","title":"sfED.writeGF","text":"writeGF(filename, G, w)\n\nWrites a Green's function G(norb,norb,nw) in human readable (fixed column width format) form into a file. mgrid is the associated Matsuabra grid (as indices or evaluated).\n\n\n\n\n\n","category":"method"},{"location":"#sfED.writeGF2part-Tuple{String,Array{Complex{Float32},3},Any}","page":"Home","title":"sfED.writeGF2part","text":"writeGF2part(filename, G, w)\n\nWrites a Green's function G(nw,nw,nw) in human readable (fixed column width format) form into a file. mgrid is the associated Matsuabra grid (as indices or evaluated).\n\n\n\n\n\n","category":"method"},{"location":"#sfED.writeMatrixGnuplot-Tuple{String,Any}","page":"Home","title":"sfED.writeMatrixGnuplot","text":"writeMatrixGnuplot(filename, matrix)\n\nWrites a Matrix matrix(norb1,norb2) in human readable (fixed column width format) form into a file. Only writes the real part and writes a linebreak after each row so that Gnuplot sp w pm3d works .\n\n\n\n\n\n","category":"method"},{"location":"#sfED.writePossibleTransitions-Tuple{String,Array{Float32,2}}","page":"Home","title":"sfED.writePossibleTransitions","text":"writePossibleTransitions(filename,overlaps)\n\nWrite out the overlap elements between all Eigenstates acting on c/c^dagger\n\n\n\n\n\n","category":"method"}]
}
