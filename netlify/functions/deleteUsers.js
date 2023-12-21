const connectDb = require("../../helpers/conx");
const verifyJwt = require("../../helpers/authMiddleware");
const ObjectId = require("mongodb").ObjectId;

exports.handler = async (event, context) => {
  const httpMethod = event.httpMethod;

  const id = event.queryStringParameters;

  const token = event.headers.authorization;
  if (!token) {
    return {
      statusCode: 403,
      body: "TOKEN_NOT_PROVIDED",
    };
  }

  if (httpMethod !== "DELETE") {
    return {
      statusCode: 405,
      body: "METHOD NOT ALLOWED",
    };
  }

  const decodedToken = await verifyJwt(token);

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

  const collection = db.collection("users");
  const result = await collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { status: "false" } },
    { returnDocument: "after" }
  );

  console.log("RESULTADO: ", result);

  return {
    statusCode: 200,
  };
};
