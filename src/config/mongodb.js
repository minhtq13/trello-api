// import { MongoClient } from "mongodb";
import pkg from "mongodb";
const { MongoClient } = pkg;

import { env } from "./environment.js";

let dbInstance = null;

// minhtq3

export const connectDB = async () => {
  const client = new MongoClient(env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  // Connect the client to the server
  await client.connect();

  // Assign clientDB to our dbInstance
  dbInstance = client.db(env.DATABASE_NAME);
};

// Get databse instance

export const getDB = () => {
  if (!dbInstance) throw new Error("Must connect to Database first!");
  return dbInstance;
};

// const listDatabases = async (client) => {
//   const databasesList = await client.db().admin().listDatabases();
//   console.log(databasesList);
//   console.log("Your databases: ");
//   databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
// };
