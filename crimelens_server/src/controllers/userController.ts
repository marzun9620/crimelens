import { Hono, type Context } from "hono";
import { env } from "hono/adapter";
import { db } from "../db/db.ts";
import bcrypt from "bcrypt";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { type UploadApiOptions, v2 as cloudinary } from "cloudinary";
import "dotenv/config";

cloudinary.config({
  cloud_name: "da8v9ysli",
  api_key: "712141289138259",
  api_secret: "Slb6_vuK-aQoBEaQphOGbRwEMQc",
  secure: true,
});

const cloudinaryOption: UploadApiOptions = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};

const userController = new Hono();

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

userController.post("/register", async (c) => {
  const { name, email, phone, password, profile_image } = await c.req.json();
  const existingUser = await db.users.findOne({ email });
  if (existingUser) {
    return c.json({ error: "User already exists with that email" }, 409);
  }

  const saltRounds = 10;
  const password_hash = await bcrypt.hash(password, saltRounds);

  let imageUrl = "";
  if (profile_image) {
    try {
      const uploadResult = await cloudinary.uploader.upload(
        profile_image,
        cloudinaryOption
      );
      imageUrl = uploadResult.secure_url;
    } catch (error: unknown) {
      return c.json({ error: "Failed to upload profile image" }, 500);
    }
  }

  const otp = generateOTP();
  const otp_expires = new Date(Date.now() + 5 * 60 * 1000);

  const newUser = {
    id: Date.now(),
    name,
    email,
    phone,
    verified: false,
    password_hash,
    profile_image: imageUrl,
    created_at: new Date(),
    updated_at: new Date(),
    otp,
    otp_expires,
  };

  await db.users.insertOne(newUser);

  const messageBody = `Your OTP code is: ${otp}`;

  return c.json(
    {
      message: "User registered successfully. OTP has been sent to your email.",
      OTP: messageBody,
    },
    201
  );
});

userController.post("/login", async (c: Context) => {
  const { email, password } = await c.req.json();
  const user = await db.users.findOne({ email });
  if (!user) {
    return c.json({ error: "Invalid credentials" }, 401);
  }

  const passwordMatch = await bcrypt.compare(password, user.password_hash);
  if (!passwordMatch) {
    return c.json({ error: "Invalid credentials" }, 401);
  }

  const payload = { id: user.id, email: user.email };
  const JWT_SECRET = process.env.JWT_SECRET as string;
  const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });

  c.set("user", payload);
  c.status(200);
  return c.json({ accessToken, refreshToken });
});

userController.post("/resend-otp", async (c) => {
  const { email } = await c.req.json();
  const user = await db.users.findOne({ email });

  if (!user) {
    return c.json({ error: "User not found" }, 404);
  }

  if (user.verified) {
    return c.json({ error: "User is already verified" }, 400);
  }

  const otp = generateOTP();
  const otp_expires = new Date(Date.now() + 5 * 60 * 1000);

  await db.users.updateOne(
    { email },
    { $set: { otp, otp_expires, updated_at: new Date() } }
  );

  const messageBody = `Your OTP code is: ${otp}`;

  c.status(200);
  return c.json({
    message: "OTP has been sent to your email.",
    OTP: messageBody,
  });
});

userController.post("/verify-email", async (c) => {
  const { email, otp } = await c.req.json();
  const user = await db.users.findOne({ email });

  if (!user) {
    return c.json({ error: "User not found" }, 404);
  }

  if (!user.otp || !user.otp_expires) {
    return c.json({ error: "No OTP found. Please request a new one." }, 400);
  }
  if (user.otp !== otp) {
    return c.json({ error: "Invalid OTP" }, 400);
  }
  if (new Date() > new Date(user.otp_expires)) {
    return c.json({ error: "OTP has expired. Please request a new one." }, 401);
  }

  const updateResult = await db.users.updateOne(
    { email },
    {
      $set: { verified: true, updated_at: new Date() },
      $unset: { otp: "", otp_expires: "" },
    }
  );

  if (updateResult.matchedCount === 0) {
    return c.json({ error: "User not found" }, 404);
  }

  return c.json({ message: "Email verified successfully" });
});

userController.post("/token/refresh", async (c) => {
  const { refreshToken } = await c.req.json();
  try {
    const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;
    const JWT_SECRET = process.env.JWT_SECRET as string;

    const payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    const newAccessToken = jwt.sign(
      { id: (payload as any).id, email: (payload as any).email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    c.status(200);
    return c.json({ accessToken: newAccessToken });
  } catch (error) {
    return c.json({ error: "Invalid refresh token" }, 401);
  }
});

userController.post("/admin/ban", async (c) => {
  const { email } = await c.req.json();
  const updateResult = await db.users.updateOne(
    { email },
    { $set: { verified: false, updated_at: new Date() } }
  );
  if (updateResult.matchedCount === 0) {
    return c.json({ error: "User not found" }, 404);
  }
  return c.json({ message: "User has been banned" });
});

export default userController;
