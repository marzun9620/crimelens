import { Hono } from "hono";
import { db } from "../db/db.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { type UploadApiOptions, v2 as cloudinary } from "cloudinary";
import crypto from "crypto";
import emailjs from "@emailjs/browser"; 
import { toast } from "sonner";

const JWT_SECRET = crypto.randomBytes(64).toString("hex");
const JWT_REFRESH_SECRET = crypto.randomBytes(64).toString("hex");

console.log("JWT_SECRET:", JWT_SECRET);
console.log("JWT_REFRESH_SECRET:", JWT_REFRESH_SECRET);

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


async function sendEmail(
  email_from: string,
  email_to: string,
  from_name: string,
  message_body: string
) {
  const form = {
    from_email: email_from,
    from_name: from_name,
    to_email: email_to,
    message: message_body,
  };

  try {
    const response = await emailjs.send(
      "service_3fy6krw",   
      "template_beimqbq",   
      form,
      "E3-0vUQPbmVnJDhAa"   
    );
    console.log("Email sent successfully", response);
  } catch (error: any) {
    throw new Error(error.text);
  }
}

const userController = new Hono();

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

userController.post("/register", async (c) => {
  const { name, email, phone, password, profile_image } = await c.req.json();
  const existingUser = await db.users.findOne({ email });
  if (existingUser) {
    return c.json({ error: "User already exists with that email" }, 400);
  }

  const saltRounds = 10;
  const password_hash = await bcrypt.hash(password, saltRounds);

  let imageUrl = "";
  if (profile_image) {
    try {
      const uploadResult = await cloudinary.uploader.upload(profile_image, cloudinaryOption);
      imageUrl = uploadResult.secure_url;
    } catch (error: any) {
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
  await sendEmail("noreply@yourdomain.com", email, "OTP Verification", messageBody);  // Correct function call

  return c.json({ message: "User registered successfully. OTP has been sent to your email." }, 201);
});

userController.post("/login", async (c) => {
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
  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: "7d" });

  return c.json({ accessToken, refreshToken });
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
    return c.json({ error: "OTP has expired. Please request a new one." }, 400);
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
    const payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    const newAccessToken = jwt.sign(
      { id: (payload as any).id, email: (payload as any).email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
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
