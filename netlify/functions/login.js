const jwt = require("jsonwebtoken");
const connectDb = require("../../helpers/conx");

// event = req
// We don't have a res value
exports.handler = async (event, context) => {
  /**
   * user,
   * password
   */
  const body = JSON.parse(event.body);
  const secretKey = "promueveMas2024*";
  const option = {
    expiresIn: "2h",
  };

  try {
    db = await connectDb();
  } catch (e) {
    console.log("This is an error: ", e);
  }

  const colection = db.collection("users");

  const document = await colection
    .find({ user: body.user, password: body.password })
    .toArray();

  const payload = {
    admin: document[0].admin,
    coordinator: document[0].coordinator,
    name: document[0].fullName,
  };

  if (document.length > 0) {
    const token = jwt.sign(payload, secretKey, option);
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // O un dominio específico como "https://tufrontend.com"
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Credentials": true, // Solo si necesitas credenciales como cookies
      },
      body: JSON.stringify({ token }),
    };
  } else {
    return {
      statusCode: 403,
      headers: {
        "Access-Control-Allow-Origin": "*", // O un dominio específico como "https://tufrontend.com"
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Credentials": true, // Solo si necesitas credenciales como cookies
      },
      body: "FORBIDDEN",
    };
  }
};
