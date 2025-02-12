import { MongoClient } from "mongodb";
import type { InsertOneResult, WithId, Db } from "mongodb";
import type { User } from "../../../models/User.ts";

const ATLAS =
  "mongodb+srv://crimelens:zjqmLjCsgU6y5uCO@cluster0.jhv99.mongodb.net/?retryWrites=true&w=majority";
const DATABASE = "crimelens";

const response = await MongoClient.connect(ATLAS).catch((err) => {
  console.error(err);
});

const db_instance: Db = response?.db(DATABASE) as Db;
const db = {
  users: db_instance.collection<User>("users"),
  posts: db_instance.collection("posts"),
};

export { db };
