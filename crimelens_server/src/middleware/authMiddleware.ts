// filepath: /D:/NextJs-and-React/crimelens/crimelens_server/src/middleware/authMiddleware.ts
import type { Context, Next } from "hono";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const authMiddleware = async (c: Context, next: Next) => {
  const authHeader = c.req.header("Authorization");

  if (!authHeader) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const token = authHeader.split(" ")[1]; // Bearer <token>

  if (!token) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  try {
    const JWT_SECRET = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      email: string;
    };
    c.set("user", decoded);
    await next();
  } catch (error) {
    return c.json({ error: "Invalid token" }, 401);
  }
};
