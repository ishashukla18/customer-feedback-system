import "dotenv/config";
import bcrypt from "bcryptjs";
import { connectDB } from "../config/db.js";
import User from "../models/User.js";
await connectDB();
const email = process.env.ADMIN_EMAIL || "admin@example.com";
await User.findOneAndUpdate({ email }, {
  name: process.env.ADMIN_NAME || "Admin", email,
  password: await bcrypt.hash(process.env.ADMIN_PASSWORD || "admin123", 10),
  role: "admin"
}, { upsert: true });
console.log(`Admin ready: ${email}`);
process.exit(0);
