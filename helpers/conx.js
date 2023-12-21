// Connecting to mongo db
const MongoClient = require("mongodb").MongoClient;
const url =
  "mongodb+srv://maspromueve:m0a2btxinjhJ6Q0p@promueveapp.ujlrf0l.mongodb.net/?retryWrites=true&w=majority";

//Connexion to mongo database
const connectDb = async () => {
  client = new MongoClient(url);
  await client.connect();
  return client.db("promuevemas");
};

module.exports = connectDb;
