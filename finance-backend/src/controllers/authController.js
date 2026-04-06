import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { successResponse, errorResponse } from "../utils/response.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return errorResponse(res, "name, email, and password are required", 400);

    const existing = await User.findOne({ email });
    if (existing) return errorResponse(res, "Email already exists", 409);

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed
    });

    successResponse(res, {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      createdAt: user.createdAt
    }, "User registered successfully", 201);
  } catch (err) {
    console.error(err);
    errorResponse(res, "Server error");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return errorResponse(res, "User not found", 404);

    if (user.status !== "active")
      return errorResponse(res, "User inactive", 403);

    const match = await bcrypt.compare(password, user.password);
    if (!match) return errorResponse(res, "Wrong password", 400);

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    successResponse(res, { token }, "Login successful");
  } catch (err) {
    console.error(err);
    errorResponse(res, "Server error");
  }
};