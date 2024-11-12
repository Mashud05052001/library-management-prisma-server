import { Request, Response, NextFunction } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BorrowReturnService } from "./borrowReturn.service";

const borrowABook = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await BorrowReturnService.borrowABook(req?.body);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Book borrowed successfully",
      data: result,
    });
  }
);

const returnBook = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await BorrowReturnService.returnBook(req?.body?.borrowId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Book returned successfully",
      data: result,
    });
  }
);

export const BorrowReturnController = {
  borrowABook,
  returnBook,
};
