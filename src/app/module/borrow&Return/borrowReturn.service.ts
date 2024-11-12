import { BorrowRecord } from "@prisma/client";
import { configPrisma } from "../../config";
import AppError from "../../utils/AppError";

/* 
1. Check member existence
2. Check book existence & availability
3. Check if the member already borrowed the same book or not
4. Applying transaction to create borroww record with the decrement of book availability
*/

const borrowABook = async (payload: BorrowRecord) => {
  const isMemberExist = await configPrisma.member.findUnique({
    where: { memberId: payload?.memberId },
  });
  if (!isMemberExist) throw new AppError(404, "Member not found.");

  const isBookExist = await configPrisma.book.findUnique({
    where: { bookId: payload?.bookId },
  });
  if (!isBookExist) throw new AppError(404, "Book not found.");
  else if (isBookExist.availableCopies === 0)
    throw new AppError(400, "No copies of this book are currently available.");

  const isAlreadySameBookTaken = await configPrisma.borrowRecord.findFirst({
    where: { bookId: payload?.bookId, memberId: payload?.memberId },
  });
  if (isAlreadySameBookTaken)
    throw new AppError(
      400,
      "You already have a copy of this book and cannot borrow another."
    );

  const [updateAvailableCount, createBorrow] = await configPrisma.$transaction([
    configPrisma.book.update({
      where: { bookId: payload?.bookId },
      data: { availableCopies: { decrement: 1 } },
    }),
    configPrisma.borrowRecord.create({
      data: {
        ...payload,
        borrowDate: payload?.borrowDate || new Date(),
      },
      select: {
        borrowId: true,
        bookId: true,
        memberId: true,
        borrowDate: true,
      },
    }),
  ]);

  return createBorrow;
};

const returnBook = async (borrowId: string) => {
  return true;
};

export const BorrowReturnService = {
  borrowABook,
  returnBook,
};
