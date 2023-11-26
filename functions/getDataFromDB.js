const utils = require("./common/dbUtils.js");

exports.handler = async function (evnet, context) {
  try {
    const { client, collection } = await utils.connectToDatabase();

    const result = await collection.findOne({ _id: "id" });

    await client.close();

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error(`Failed to get data ${error}\n`);
    return {
      statusCode: 500,
    };
  }
};
