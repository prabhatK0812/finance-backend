import Record from "../models/Record.js";

export const getSummaryData = async () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  const total = await Record.aggregate([
    { $group: { _id: "$type", sum: { $sum: "$amount" } } }
  ]);

  const totals = { income: 0, expense: 0 };
  total.forEach((item) => {
    if (item._id === "income") totals.income = item.sum;
    if (item._id === "expense") totals.expense = item.sum;
  });

  const categoryTotals = await Record.aggregate([
    {
      $group: {
        _id: "$category",
        income: { $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] } },
        expense: { $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] } }
      }
    },
    { $project: { category: "$_id", income: 1, expense: 1, _id: 0 } }
  ]);

  const recentActivity = await Record.find()
    .sort({ date: -1 })
    .limit(5)
    .select("amount type category date note createdBy");

  const startDate = new Date(currentYear, currentMonth - 5, 1);
  const monthlyTrend = await Record.aggregate([
    { $match: { date: { $gte: startDate } } },
    {
      $group: {
        _id: {
          year: { $year: "$date" },
          month: { $month: "$date" }
        },
        income: { $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] } },
        expense: { $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] } }
      }
    },
    {
      $project: {
        _id: 0,
        year: "$_id.year",
        month: "$_id.month",
        income: 1,
        expense: 1,
        net: { $subtract: ["$income", "$expense"] }
      }
    },
    { $sort: { year: 1, month: 1 } }
  ]);

  return {
    totalIncome: totals.income,
    totalExpense: totals.expense,
    netBalance: totals.income - totals.expense,
    categoryTotals,
    recentActivity,
    monthlyTrend
  };
};

export const validateRecord = (body) => {
  const errors = [];
  const { amount, type, category, date } = body;

  if (amount == null || typeof amount !== "number" || amount < 0)
    errors.push("amount is required and must be a non-negative number");
  if (!type || !["income", "expense"].includes(type))
    errors.push("type must be 'income' or 'expense'");
  if (!category || typeof category !== "string")
    errors.push("category is required");
  if (!date || Number.isNaN(new Date(date).valueOf()))
    errors.push("valid date is required");

  return errors;
};