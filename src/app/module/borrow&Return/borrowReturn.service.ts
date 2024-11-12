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
    where: {
      bookId: payload?.bookId,
      memberId: payload?.memberId,
      returnDate: null,
    },
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

/*
1. Check borrowRecord existance
2. Applying transaction to update borroww record return data with the increment of book availability
*/
const returnBook = async (borrowId: string) => {
  const borrowRecordExist = await configPrisma.borrowRecord.findFirst({
    where: { borrowId },
  });
  if (!borrowRecordExist) {
    throw new AppError(404, "Invalid Borrow ID!");
  } else if (borrowRecordExist.returnDate !== null) {
    throw new AppError(400, "Book already returned");
  }

  await configPrisma.$transaction([
    configPrisma.book.update({
      where: { bookId: borrowRecordExist.bookId },
      data: { availableCopies: { increment: 1 } },
    }),
    configPrisma.borrowRecord.update({
      where: { borrowId },
      data: { returnDate: new Date() },
    }),
  ]);

  return true;
};

const overDueBook = async () => {
  const now = new Date(),
    fourteenDaysAgo = new Date(now.setDate(now.getDate() - 14));

  const result = await configPrisma.borrowRecord.findMany({
    where: {
      returnDate: null,
      borrowDate: {
        lt: fourteenDaysAgo,
      },
    },
    select: {
      borrowId: true,
      borrowDate: true,
      Book: {
        select: { title: true },
      },
      Member: {
        select: { name: true },
      },
    },
  });

  if (result.length > 0) {
    const modifiedData = result.map((item) => ({
      borrowId: item.borrowId,
      bookTitle: item.Book.title,
      borrowerName: item.Member.name,
      overdueDays: new Date(
        new Date().getTime() -
          new Date(item.borrowDate).setDate(item.borrowDate.getDate() + 14)
      ).getDate(),
    }));

    return { message: "Overdue borrow list fetched", data: modifiedData };
  }

  return { message: "No overdue books", data: [] };
};

export const BorrowReturnService = {
  borrowABook,
  returnBook,
  overDueBook,
};
