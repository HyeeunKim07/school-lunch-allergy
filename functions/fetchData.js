const { MongoClient, ServerApiVersion } = require("mongodb");
const axios = require("axios");
require("dotenv").config();

exports.handler = async function (evnet, context) {
  try {
    const url = `https://open.neis.go.kr/hub/mealServiceDietInfo?ATPT_OFCDC_SC_CODE=P10&SD_SCHUL_CODE=8320104&Type=json&MLSV_YMD=202311&KEY=${process.env.API_KEY}`;

    const response = await axios.get(url);
    const data = await response.data;

    const uri = `mongodb+srv://${process.env.DB_ID}:${process.env.DB_PASSWORD}@cluster0.h2zjch3.mongodb.net/?retryWrites=true&w=majority`;
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await client.connect();

    const database = client.db("menuDatabase");
    const collection = database.collection("menuCollection");

    const result = await collection.updateOne(
      { _id: "id" },
      { $set: data },
      { upsert: true }
    );

    await client.close();

    return {
      statusCode: 200,
    };
  } catch (error) {
    console.error(
      `Something went wrong trying to find the documents: ${error}\n`
    );
    return {
      statusCode: 500,
    };
  }
};
