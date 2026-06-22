import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const result = (user) => ({
  token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" }),
  user: { id: user._id, name: user.name, email: user.email, role: user.role }
});

export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "All fields are required" });
    if (password.length < 6) return res.status(400).json({ message: "Password needs 6 characters" });
    if (await User.findOne({ email })) return res.status(409).json({ message: "Email is already registered" });
    const user = await User.create({ name, email, password: await bcrypt.hash(password, 10) });
    res.status(201).json(result(user));
  } catch (error) { next(error); }
}

export async function login(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password || "", user.password))) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }
    res.json(result(user));
  } catch (error) { next(error); }
}
