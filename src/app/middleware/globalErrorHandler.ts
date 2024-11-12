import { ErrorRequestHandler } from "express";

const globalErrorhandler: ErrorRequestHandler = async (err, req, res, next) => {
  res.status(err?.status || err?.statusCode || 500).json({
    success: false,
    statusCode: err?.status || err?.statusCode || 500,
    message: err.message || "Something went wrong!!",
    err,
  });
};

export default globalErrorhandler;
