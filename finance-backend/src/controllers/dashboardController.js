import { getSummaryData } from "../services/recordService.js";
import { successResponse, errorResponse } from "../utils/response.js";

export const getSummary = async (req, res) => {
  try {
    const summary = await getSummaryData();
    successResponse(res, summary, "Summary retrieved successfully");
  } catch (err) {
    console.error(err);
    errorResponse(res, "Server error");
  }
};
