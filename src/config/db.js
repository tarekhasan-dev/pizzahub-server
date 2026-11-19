import dns from "node:dns";
import { MongoClient } from "mongodb";

// ISP এর DNS এ SRV lookup ব্যর্থ হলে (querySrv ECONNREFUSED) এটা কাজ করে
dns.setServers(["8.8.8.8", "1.1.1.1"]);

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