const { SkynetClient, genKeyPairFromSeed } = require('@skynetlabs/skynet-nodejs');

const client = new SkynetClient("https://skynetfree.net", { skynetApiKey: "SC31I98C2CCA2F3B8RB8RFFVOHAA6MEH5CPCRUMGUICH0RFO1K1G" });
const { publicKey, privateKey } = genKeyPairFromSeed("this seed should be fairly long for security");

const dataKey = "myApp";
const json = { example: "This is some example JSON data." };

(async () => {
// await client.db.setJSON(privateKey, dataKey, json);
 const { data, dataLink } = await client.db.getJSON(publicKey, dataKey);
//    const skylink = await client.uploadFile("./image.png");
    console.log(`data: ${data} dataLink: ${dataLink}`);
})();

