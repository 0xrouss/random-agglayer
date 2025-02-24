import { createPublicClient, http } from "viem";
import { readContract } from "viem/actions";
import { mainnet, sepolia } from "viem/chains";
import { polygonRollupManagerABI } from "./abi/polygonRollupManagerABI";
import { polygonZkEVMEtrogABI } from "./abi/polygonZkEVMEtrogABI";

console.log("------------- TESTNET -------------");

await (async () => {
    const baseUrl =
        "https://bridge-api-testnet-dev.polygon.technology/merkle-proof";
    const depositCount = 2;
    const targetMessage = "Network id doesn't exist or not being tracked";

    // Create a public client for Sepolia testnet
    const testnetPublicClient = createPublicClient({
        chain: sepolia,
        transport: http(),
    });

    // Get the rollup count from the chain
    const testnetRollupCount = parseInt(
        await readContract(testnetPublicClient, {
            address: "0x32d33D5137a7cFFb54c5Bf8371172bcEc5f310ff", // Testnet Rollup Manager address
            abi: polygonRollupManagerABI,
            functionName: "rollupCount",
        })
    );

    // Loop through all rollup IDs
    for (let i = 1; i <= testnetRollupCount; i++) {
        const url = `${baseUrl}?networkId=${i}&depositCount=${depositCount}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.message === targetMessage) {
                console.log(`NetworkID ${i}: Not being tracked`);
            } else {
                console.log(`NetworkID ${i}: Returns proofs`);
            }
        } catch (error) {
            console.error(
                `Error fetching data for NetworkID ${i}:`,
                error
            );
        }
    }
})();

console.log("------------- MAINNET -------------");
await (async () => {
    const baseUrl =
        "https://api-gateway.polygon.technology/api/v3/proof/mainnet/merkle-proof";
    const depositCount = 2;
    const targetMessage = "Network id doesn't exist or not being tracked";

    // Create a public client for Ethereum mainnet
    const mainnetPublicClient = createPublicClient({
        chain: mainnet,
        transport: http("https://eth.llamarpc.com"),
    });

    // Get the rollup count from the chain
    const mainnetRollupCount = parseInt(
        await readContract(mainnetPublicClient, {
            address: "0x5132A183E9F3CB7C848b0AAC5Ae0c4f0491B7aB2", // Mainnet Rollup Manager address
            abi: polygonRollupManagerABI,
            functionName: "rollupCount",
        })
    );

    // Loop through all rollup IDs
    for (let i = 1; i <= mainnetRollupCount; i++) {
        const url = `${baseUrl}?networkId=${i}&depositCount=${depositCount}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.message === targetMessage) {
                console.log(`NetworkID ${i}: Not being tracked`);
            } else {
                console.log(`NetworkID ${i}: Returns proofs`);
            }
        } catch (error) {
            console.error(
                `Error fetching data for NetworkID ${i}:`,
                error
            );
        }
    }
})();
