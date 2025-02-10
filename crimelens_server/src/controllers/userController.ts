import { Hono } from "hono";
import { db } from "../db/db.ts";

const userController = new Hono();

userController.get("/", async (c) => {
  const data = await db.users.find().toArray();

  return c.json(data);
});

export default userController;
