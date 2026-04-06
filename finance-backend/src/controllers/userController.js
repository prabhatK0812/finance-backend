import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { ROLES, STATUSES } from "../utils/constants.js";
import { successResponse, errorResponse } from "../utils/response.js";

const validRoles = Object.values(ROLES);
const validStatus = Object.values(STATUSES);

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("name email role status createdAt updatedAt");
    successResponse(res, users, "Users retrieved successfully");
  } catch (err) {
    console.error(err);
    errorResponse(res, "Server error");
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("name email role status createdAt updatedAt");
    if (!user) return errorResponse(res, "User not found", 404);
    successResponse(res, user, "User retrieved successfully");
  } catch (err) {
    console.error(err);
    errorResponse(res, "Server error");
  }
};

export const updateUser = async (req, res) => {
  try {
    const { role, status, name, password } = req.body;
    const updates = {};

    if (role) {
      if (!validRoles.includes(role)) return errorResponse(res, "Invalid role", 400);
      updates.role = role;
    }

    if (status) {
      if (!validStatus.includes(status)) return errorResponse(res, "Invalid status", 400);
      updates.status = status;
    }

    if (name) updates.name = name;
    if (password) updates.password = await bcrypt.hash(password, 10);

    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select("name email role status createdAt updatedAt");
    if (!user) return errorResponse(res, "User not found", 404);

    successResponse(res, user, "User updated successfully");
  } catch (err) {
    console.error(err);
    errorResponse(res, "Server error");
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return errorResponse(res, "User not found", 404);
    successResponse(res, null, "User deleted successfully");
  } catch (err) {
    console.error(err);
    errorResponse(res, "Server error");
  }
};
