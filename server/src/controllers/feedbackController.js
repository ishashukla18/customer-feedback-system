import Feedback from "../models/Feedback.js";
import User from "../models/User.js";
const valid = ({ title, message, rating }) => title?.trim() && message?.trim() && Number(rating) >= 1 && Number(rating) <= 5;
export async function getMine(req, res, next) {
  try { res.json(await Feedback.findOne({ user: req.user._id })); } catch (e) { next(e); }
}
export async function saveMine(req, res, next) {
  try {
    if (!valid(req.body)) return res.status(400).json({ message: "Enter a title, message and rating (1-5)" });
    const data = { title: req.body.title, message: req.body.message, rating: Number(req.body.rating) };
    res.json(await Feedback.findOneAndUpdate({ user: req.user._id }, data, { new: true, upsert: true, runValidators: true }));
  } catch (e) { next(e); }
}
export async function getAll(req, res, next) {
  try { res.json(await Feedback.find().populate("user", "name email").sort({ updatedAt: -1 })); } catch (e) { next(e); }
}
export async function createOne(req, res, next) {
  try {
    if (!valid(req.body) || !req.body.email) return res.status(400).json({ message: "User email and valid feedback are required" });
    const user = await User.findOne({ email: req.body.email });
    if (!user || user.role !== "user") return res.status(404).json({ message: "Registered user not found" });
    if (await Feedback.findOne({ user: user._id })) return res.status(409).json({ message: "This user already has feedback" });
    const item = await Feedback.create({ user: user._id, title: req.body.title, message: req.body.message, rating: Number(req.body.rating) });
    res.status(201).json(await item.populate("user", "name email"));
  } catch (e) { next(e); }
}
export async function updateOne(req, res, next) {
  try {
    if (!valid(req.body)) return res.status(400).json({ message: "Enter valid feedback" });
    const item = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate("user", "name email");
    if (!item) return res.status(404).json({ message: "Feedback not found" });
    res.json(item);
  } catch (e) { next(e); }
}
export async function deleteOne(req, res, next) {
  try {
    const item = await Feedback.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Feedback not found" });
    res.json({ message: "Feedback deleted" });
  } catch (e) { next(e); }
}
