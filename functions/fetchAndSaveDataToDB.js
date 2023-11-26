const axios = require("axios");
const moment = require("moment-timezone");
const utils = require("./common/dbUtils.js");
require("dotenv").config();

exports.handler = async function (evnet, context) {
  try {
    const fromDate = moment()
      .tz("Asia/Seoul")
      .subtract(7, "days")
      .format("YYYYMMDD");
    const toDate = moment().tz("Asia/Seoul").add(7, "days").format("YYYYMMDD");
    const url = `https://open.neis.go.kr/hub/mealServiceDietInfo?ATPT_OFCDC_SC_CODE=P10&SD_SCHUL_CODE=8320104&Type=json&MLSV_FROM_YMD=${fromDate}&MLSV_TO_YMD=${toDate}&KEY=${process.env.API_KEY}`;

    const response = await axios.get(url);
    const data = await response.data;

    const { client, collection } = await utils.connectToDatabase();

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
