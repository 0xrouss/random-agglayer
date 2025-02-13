/// <reference types="bun-types" />
import { createPublicClient, http } from "viem";
import { polygonZkEvmCardona } from "viem/chains";

const client = createPublicClient({
    chain: polygonZkEvmCardona,
    transport: http(),
});

const contractAbi = [
    {
        type: "function",
        name: "lastRollupExitRoot",
        stateMutability: "view",
        inputs: [],
        outputs: [{ type: "bytes32" }],
    },
    {
        type: "function",
        name: "globalExitRootMap",
        stateMutability: "view",
        inputs: [{ type: "bytes32" }],
        outputs: [{ type: "uint256" }],
    },
];

const CONTRACT_ADDRESS = "0xa40D5f56745a118D0906a34E69aeC8C0Db1cB8fA";

async function main() {
    try {
        const lastRollupExitRoot = await client.readContract({
            address: CONTRACT_ADDRESS,
            abi: contractAbi,
            functionName: "lastRollupExitRoot",
        });
        console.log("lastRollupExitRoot:", lastRollupExitRoot);

        const exitRootKey =
            "0x984715700976113ae4b0e5ea57b9005493a63069ee77e812af1b1a900580ef92";

        const globalExitRootValue = await client.readContract({
            address: CONTRACT_ADDRESS,
            abi: contractAbi,
            functionName: "globalExitRootMap",
            args: [exitRootKey],
        });
        console.log(`globalExitRootMap[${exitRootKey}] =`, globalExitRootValue);
    } catch (error) {
        console.error("Error al leer variables del contrato:", error);
    }
}

main().catch((err) => {
    console.error("Error en el script:", err);
});
