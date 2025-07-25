


class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
    this.isOperational = true; // Indicates that this error is expected and can be handled
    Error.captureStackTrace(this, this.constructor);
  }
}


export {
    AppError,
};