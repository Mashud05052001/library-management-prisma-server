import { Router } from "express";
import { BorrowReturnController } from "./borrowReturn.scontroller";

const router = Router();

router.post("/borrow", BorrowReturnController.borrowABook);
router.post("/return", BorrowReturnController.returnBook);
router.get("/borrow/overdue", BorrowReturnController.overDueBook);

export const BorrowReturnRoutes = router;
