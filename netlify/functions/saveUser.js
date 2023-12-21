const connectDb = require("../../helpers/conx");
const verifyJwt = require("../../helpers/authMiddleware");

exports.handler = async (event, context) => {
  const httpMethod = event.httpMethod;

  const token = event.headers.authorization;
  console.log("TOKEN", token);
  if (!token) {
    return {
      statusCode: 403,
      body: "TOKEN_NOT_PROVIDED",
    };
  }

  if (httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "METHOD NOT ALLOWED",
    };
  }

  const decodedToken = await verifyJwt(token);

  console.log("------>", decodedToken);
  if (!decodedToken.valid) {
    return {
      statusCode: 403,
      body: "INVALID_TOKEN",
    };
  }

  if (!decodedToken.decoded.admin) {
    return {
      statusCode: 403,
      body: "FORBIDDEN",
    };
  }

  try {
    db = await connectDb();
  } catch (e) {
    console.log("This is an error: ", e);
  }

  const body = JSON.parse(event.body);
  const collection = db.collection("users");
  const result = await collection.insertOne(body);

  if (!result.insertedId) {
    return {
      statusCode: 500,
      body: "Something went wrong!",
    };
  }

  return {
    statusCode: 201,
  };
};
