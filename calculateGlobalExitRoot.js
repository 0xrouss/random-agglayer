import { encodeAbiParameters, keccak256 } from "viem";

/**
 * Replicar calculateGlobalExitRoot de Solidity.
 *
 * @param {string} mainnetExitRoot - Hash en formato 0x (32 bytes hex)
 * @param {string} rollupExitRoot - Hash en formato 0x (32 bytes hex)
 * @returns {string} - Resultado de keccak256(abi.encodePacked(mainnetExitRoot, rollupExitRoot))
 */
function calculateGlobalExitRoot(mainnetExitRoot, rollupExitRoot) {
    // encodeAbiParameters con {type: 'bytes32'} para cada parámetro
    // emula abi.encodePacked(mainnetExitRoot, rollupExitRoot)
    const encoded = encodeAbiParameters(
        [{ type: "bytes32" }, { type: "bytes32" }],
        [mainnetExitRoot, rollupExitRoot]
    );

    // Calculamos el keccak256 del resultado
    return keccak256(encoded);
}

// Ejemplo de uso
(async () => {
    const mainnetExitRoot =
        "0x38cd2398c0f4a3a94caeb39151c53cf5206adfd8ff7d6e58eae940c9294208f0";
    const rollupExitRoot =
        "0x13afdc48992121443f4edbf1e47529124dd959d7d514f65753d02c7ca9e67e61";

    const globalExitRoot = calculateGlobalExitRoot(
        mainnetExitRoot,
        rollupExitRoot
    );

    console.log("Global Exit Root:", globalExitRoot);
})();
