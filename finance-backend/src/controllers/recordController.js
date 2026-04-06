import Record from "../models/Record.js";
import mongoose from "mongoose";
import { validateRecord } from "../services/recordService.js";
import { RECORD_TYPES } from "../utils/constants.js";
import { successResponse, errorResponse, paginatedResponse } from "../utils/response.js";

export const createRecord = async (req, res) => {
  try {
    const errors = validateRecord(req.body);
    if (errors.length) return errorResponse(res, "Invalid input", 400, errors);

    const record = await Record.create({
      amount: req.body.amount,
      type: req.body.type,
      category: req.body.category,
      date: new Date(req.body.date),
      note: req.body.note || "",
      createdBy: req.user.id
    });

    successResponse(res, record, "Record created successfully", 201);
  } catch (err) {
    console.error(err);
    errorResponse(res, "Server error");
  }
};

export const getRecords = async (req, res) => {
  try {
    const { type, category, dateFrom, dateTo, page = 1, limit = 100 } = req.query;
    const query = {};

    if (type && Object.values(RECORD_TYPES).includes(type)) query.type = type;
    if (category) query.category = category;

    if (dateFrom || dateTo) {
      query.date = {};
      if (dateFrom && !Number.isNaN(new Date(dateFrom).valueOf())) query.date.$gte = new Date(dateFrom);
      if (dateTo && !Number.isNaN(new Date(dateTo).valueOf())) query.date.$lte = new Date(dateTo);
    }

    const skip = (Number(page) - 1) * Number(limit);
    const records = await Record.find(query)
      .sort({ date: -1, createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Record.countDocuments(query);
    paginatedResponse(res, records, total, page, limit, "Records retrieved successfully");
  } catch (err) {
    console.error(err);
    errorResponse(res, "Server error");
  }
};

export const getRecordById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return errorResponse(res, "Invalid record id", 400);

    const record = await Record.findById(req.params.id);
    if (!record) return errorResponse(res, "Record not found", 404);
    successResponse(res, record, "Record retrieved successfully");
  } catch (err) {
    console.error(err);
    errorResponse(res, "Server error");
  }
};

export const updateRecord = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return errorResponse(res, "Invalid record id", 400);

    const updates = {};
    const { amount, type, category, date, note } = req.body;
    if (amount != null) updates.amount = amount;
    if (type) updates.type = type;
    if (category) updates.category = category;
    if (date) {
      if (Number.isNaN(new Date(date).valueOf())) return errorResponse(res, "Invalid date", 400);
      updates.date = new Date(date);
    }
    if (note != null) updates.note = note;

    const record = await Record.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!record) return errorResponse(res, "Record not found", 404);

    successResponse(res, record, "Record updated successfully");
  } catch (err) {
    console.error(err);
    errorResponse(res, "Server error");
  }
};

export const deleteRecord = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return errorResponse(res, "Invalid record id", 400);

    const record = await Record.findByIdAndDelete(req.params.id);
    if (!record) return errorResponse(res, "Record not found", 404);
    successResponse(res, null, "Record deleted successfully");
  } catch (err) {
    console.error(err);
    errorResponse(res, "Server error");
  }
};
