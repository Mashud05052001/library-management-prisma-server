import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookService } from "./book.service";

const createBook = catchAsync(async (req, res, next) => {
  const result = await BookService.createBookIntoDB(req?.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Book created successfully",
    data: result,
  });
});

const getAllBooks = catchAsync(async (req, res, next) => {
  const result = await BookService.getAllBooksFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Books retrieved successfully",
    data: result,
  });
});

const getSingleBook = catchAsync(async (req, res, next) => {
  const result = await BookService.getSingleBookFromDB(req.params?.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Book retrieved successfully",
    data: result,
  });
});

const updateBook = catchAsync(async (req, res, next) => {
  const result = await BookService.updateBookIntoDB(req.params?.id, req?.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Book updated successfully",
    data: result,
  });
});

const deleteBook = catchAsync(async (req, res, next) => {
  await BookService.deleteBookFromDB(req.params?.id);
  res.status(200).send({
    success: true,
    status: 200,
    message: "Book successfully deleted",
  });
});

export const BookController = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
