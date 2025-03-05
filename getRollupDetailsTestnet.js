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

    if (rollupData.lastVerifiedBatch != 0) {
        const sequencedBatchData = await readContract(publicClient, {
            address: "0x32d33D5137a7cFFb54c5Bf8371172bcEc5f310ff",
            abi: polygonRollupManagerABI,
            functionName: "getRollupSequencedBatches",
            args: [i, rollupData.lastVerifiedBatch],
        });

        const lastVerifiedTimestamp = parseInt(sequencedBatchData.sequencedTimestamp) * 1000;
        const currentTime = Date.now();
        const timeDiff = currentTime - lastVerifiedTimestamp;

        // Convert time difference to days, hours, minutes
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

        if (days <= 1) {
            console.log("Indexed ID: ", i);
            console.log("Rollup Contract: ", rollupData.rollupContract);
            console.log("Chain ID: ", parseInt(rollupData.chainID));
            console.log("Network Name: ", networkName);
            console.log("Gas Token Address: ", gasTokenAddress);
            console.log("Gas Token Network: ", gasTokenNetwork);
            console.log("Last Batch Sequenced: ", parseInt(rollupData.lastBatchSequenced));
            console.log("Last Verified Batch: ", parseInt(rollupData.lastVerifiedBatch));
            console.log("Last Verified Batch Timestamp: ", new Date(lastVerifiedTimestamp).toISOString());
            console.log("Time since last verification: ", `${days}d ${hours}h ${minutes}m`);
            console.log();
        }
    }
}
