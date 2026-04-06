export const formatDate = (date) => {
  return new Date(date).toISOString().split('T')[0]; // YYYY-MM-DD
};

export const formatDateTime = (date) => {
  return new Date(date).toISOString(); // Full ISO string
};

export const isValidDate = (dateString) => {
  return !Number.isNaN(new Date(dateString).valueOf());
};

export const getDateRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return { start, end };
};

export const getCurrentMonthRange = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return { start, end };
};