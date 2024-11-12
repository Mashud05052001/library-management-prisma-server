import { Prisma } from "@prisma/client";
import { ErrorRequestHandler } from "express";

const globalErrorhandler: ErrorRequestHandler = async (err, req, res, next) => {
  let statusCode = err?.status || err?.statusCode || 500,
    message = err?.message || "Something went wrong!!";
  if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    err?.name === "PrismaClientKnownRequestError"
  ) {
    message = `${err?.meta?.modelName} ${err?.meta?.cause}`;
  }

  res.status(err?.status || err?.statusCode || 500).json({
    success: false,
    statusCode,
    message,
    // TODO : Remove it later
    err,
  });
};

export default globalErrorhandler;
