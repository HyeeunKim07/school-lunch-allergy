const { MongoClient, ServerApiVersion } = require("mongodb");

const connectToDatabase = async () => {
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

  return { client, collection };
};

module.exports = {
  connectToDatabase,
};
