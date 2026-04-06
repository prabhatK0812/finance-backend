import mongoose from "mongoose";
import { ROLES, STATUSES } from "../utils/constants.js";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: Object.values(ROLES),
    default: ROLES.VIEWER
  },
  status: {
    type: String,
    enum: Object.values(STATUSES),
    default: STATUSES.ACTIVE
  }
}, { timestamps: true });

export default mongoose.model("User", userSchema);