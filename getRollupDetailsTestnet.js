import { createPublicClient, http } from "viem";
import { readContract } from "viem/actions";
import { sepolia } from "viem/chains";
import { polygonRollupManagerABI } from "./abi/polygonRollupManagerABI";
import { polygonZkEVMEtrogABI } from "./abi/polygonZkEVMEtrogABI";

const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(),
});

const rollupCount = parseInt(
    await readContract(publicClient, {
        address: "0x32d33D5137a7cFFb54c5Bf8371172bcEc5f310ff",
        abi: polygonRollupManagerABI,
        functionName: "rollupCount",
    })
);

// Do a for loop to get the rollup details for all the rollup IDs
for (let i = 1; i <= rollupCount; i++) {
    const rollupData = await readContract(publicClient, {
        address: "0x32d33D5137a7cFFb54c5Bf8371172bcEc5f310ff",
        abi: polygonRollupManagerABI,
        functionName: "rollupIDToRollupDataV2",
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
