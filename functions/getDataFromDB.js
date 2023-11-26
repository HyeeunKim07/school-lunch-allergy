const { MongoClient, ServerApiVersion } = require("mongodb");
const axios = require("axios");
require("dotenv").config();

exports.handler = async function (evnet, context) {
  try {
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
