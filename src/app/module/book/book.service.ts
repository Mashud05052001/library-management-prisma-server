import { Book } from "@prisma/client";
import { configPrisma } from "../../config";
import AppError from "../../utils/AppError";

const createBookIntoDB = async (payload: Book) => {
  const result = await configPrisma.book.create({
    data: payload,
  });
  return result;
};

const getAllBooksFromDB = async () => {
  const result = await configPrisma.book.findMany({});
  return result;
};

const getSingleBookFromDB = async (bookId: string) => {
  const result = await configPrisma.book.findUnique({
    where: { bookId },
  });
  if (result === null) throw new AppError(404, "Book not found!");
  return result;
};

const updateBookIntoDB = async (bookId: string, payload: Partial<Book>) => {
  const result = await configPrisma.book.update({
    where: { bookId },
    data: payload,
  });

  return result;
};

const deleteBookFromDB = async (bookId: string) => {
  const result = await configPrisma.book.delete({ where: { bookId } });
  return result;
};

export const BookService = {
  createBookIntoDB,
  getAllBooksFromDB,
  getSingleBookFromDB,
  updateBookIntoDB,
  deleteBookFromDB,
};
