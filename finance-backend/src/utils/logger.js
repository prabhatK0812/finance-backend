const logLevels = {
  INFO: "INFO",
  WARN: "WARN",
  ERROR: "ERROR",
  DEBUG: "DEBUG"
};

export const logger = {
  info: (message, data = null) => {
    console.log(`[${new Date().toISOString()}] ${logLevels.INFO}: ${message}`, data || "");
  },
  warn: (message, data = null) => {
    console.warn(`[${new Date().toISOString()}] ${logLevels.WARN}: ${message}`, data || "");
  },
  error: (message, error = null) => {
    console.error(`[${new Date().toISOString()}] ${logLevels.ERROR}: ${message}`, error || "");
  },
  debug: (message, data = null) => {
    if (process.env.NODE_ENV === "development") {
      console.debug(`[${new Date().toISOString()}] ${logLevels.DEBUG}: ${message}`, data || "");
    }
  }
};