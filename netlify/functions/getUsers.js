const jwt = require("jsonwebtoken");
const connectDb = require("../../helpers/conx");
const ObjectId = require("mongodb").ObjectId;

exports.handler = async (event, context) => {
  const httpMethod = event.httpMethod;

  const params = event.queryStringParameters;

  if (httpMethod !== "GET") {
    return {
      statusCode: 405,
      body: "METHOD NOT ALLOWED",
    };
  }

  try {
    db = await connectDb();
  } catch (e) {
    console.log("This is an error: ", e);
  }

  const colection = db.collection("users");

  const argument = {
    status: "true",
  };

  if (params.id) {
    argument._id = new ObjectId(params.id);
  }

  console.log("--->", argument);
  const document = await colection.find(argument).toArray();

  return {
    statusCode: 200,
    body: JSON.stringify(document),
  };
};
