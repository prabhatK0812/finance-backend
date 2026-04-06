import mongoose from "mongoose";
import { RECORD_TYPES } from "../utils/constants.js";

const recordSchema = new mongoose.Schema({
  amount: Number,
  type: {
    type: String,
    enum: Object.values(RECORD_TYPES)
  },
  category: String,
  date: Date,
  note: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

export default mongoose.model("Record", recordSchema);