import { MongoClient } from "mongodb";

let client;
let db;

export async function connectDB() {
  if (db) return db;
  client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  db = client.db("pizzahub");
  return db;
}

// Better Auth এর users collection এর নাম সাধারণত "user"
export async function getCollections() {
  const database = await connectDB();
  return {
    users: database.collection("user"),
    menuItems: database.collection("menuItems"),
    orders: database.collection("orders"),
    transactions: database.collection("transactions"),
  };
}