import { createPublicClient, http } from "viem";
import { readContract } from "viem/actions";
import { mainnet, sepolia } from "viem/chains";
import { polygonRollupManagerABI } from "./abi/polygonRollupManagerABI";
import { polygonZkEVMEtrogABI } from "./abi/polygonZkEVMEtrogABI";

const publicClient = createPublicClient({
    chain: mainnet,
    transport: http("https://eth.llamarpc.com"),
});

const rollupCount = parseInt(
    await readContract(publicClient, {
        address: "0x5132A183E9F3CB7C848b0AAC5Ae0c4f0491B7aB2",
        abi: polygonRollupManagerABI,
        functionName: "rollupCount",
    })
);

// Do a for loop to get the rollup details for all the rollup IDs
for (let i = 1; i <= rollupCount; i++) {
    const rollupData = await readContract(publicClient, {
        address: "0x5132A183E9F3CB7C848b0AAC5Ae0c4f0491B7aB2",
        abi: polygonRollupManagerABI,
        functionName: "rollupIDToRollupData",
        args: [i],
    });
    console.log();

    console.log("Indexed ID: ", i);
    const networkName = await readContract(publicClient, {
        address: rollupData.rollupContract,
        abi: polygonZkEVMEtrogABI,
        functionName: "networkName",
    });

    const gasTokenAddress = await readContract(publicClient, {
        address: rollupData.rollupContract,
        abi: polygonZkEVMEtrogABI,
        functionName: "gasTokenAddress",
    });

    const gasTokenNetwork = await readContract(publicClient, {
        address: rollupData.rollupContract,
        abi: polygonZkEVMEtrogABI,
        functionName: "gasTokenNetwork",
    });

    console.log("Rollup Contract: ", rollupData.rollupContract);
    console.log("Chain ID: ", parseInt(rollupData.chainID));
    console.log("Network Name: ", networkName);
    console.log("Gas Token Address: ", gasTokenAddress);
    console.log("Gas Token Network: ", gasTokenNetwork);
}
