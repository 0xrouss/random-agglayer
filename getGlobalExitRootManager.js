import { createPublicClient, http } from "viem";
import { readContract } from "viem/actions";
import { mainnet, polygonZkEvmCardona, sepolia } from "viem/chains";
import { polygonRollupManagerABI } from "./abi/polygonRollupManagerABI";
import { polygonZkEVMEtrogABI } from "./abi/polygonZkEVMEtrogABI";

const publicClient = createPublicClient({
    chain: polygonZkEvmCardona,
    transport: http(),
});

const exitRootManager = await readContract(publicClient, {
    address: "0x528e26b25a34a4a5d0dbda1d57d318153d2ed582",
    abi: polygonRollupManagerABI,
    functionName: "globalExitRootManager",
});

console.log(exitRootManager);
