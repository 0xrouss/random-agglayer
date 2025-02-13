console.log("------------- TESTNET -------------");

await (async () => {
    const baseUrl =
        "https://bridge-api-testnet-dev.polygon.technology/merkle-proof";
    const depositCount = 2;
    const targetMessage = "Network id doesn't exist or not being tracked";

    for (let networkId = 0; networkId <= 24; networkId++) {
        const url = `${baseUrl}?networkId=${networkId}&depositCount=${depositCount}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.message === targetMessage) {
                console.log(`NetworkID ${networkId}: Not being tracked`);
            } else {
                console.log(`NetworkID ${networkId}: Returns proofs`);
            }
        } catch (error) {
            console.error(
                `Error fetching data for NetworkID ${networkId}:`,
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

    for (let networkId = 0; networkId <= 15; networkId++) {
        const url = `${baseUrl}?networkId=${networkId}&depositCount=${depositCount}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.message === targetMessage) {
                console.log(`NetworkID ${networkId}: Not being tracked`);
            } else {
                console.log(`NetworkID ${networkId}: Returns proofs`);
            }
        } catch (error) {
            console.error(
                `Error fetching data for NetworkID ${networkId}:`,
                error
            );
        }
    }
})();
