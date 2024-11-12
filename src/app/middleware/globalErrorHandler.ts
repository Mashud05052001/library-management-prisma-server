import { Prisma } from "@prisma/client";
import { ErrorRequestHandler } from "express";

const globalErrorhandler: ErrorRequestHandler = async (err, req, res, next) => {
  let statusCode = err?.status || err?.statusCode || 500,
    message = err?.message || "Something went wrong!!";
  if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    err?.name === "PrismaClientKnownRequestError"
  ) {
    if (err?.meta?.cause)
      message = `${err?.meta?.modelName} ${err?.meta?.cause}`;
    else if (err?.meta?.target && Array.isArray(err?.meta?.target)) {
      message = err?.meta?.target.join(" ") + " must be unique";
      message = message[0].toUpperCase() + message.slice(1);
    }
  }

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
  });
};

export default globalErrorhandler;
