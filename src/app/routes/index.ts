import { Router } from "express";
import { BookRoutes } from "../module/book/book.route";
import { MemberRoutes } from "../module/member/member.route";
import { BorrowReturnRoutes } from "../module/borrow&Return/borrowReturn.route";

const router = Router();

const moduleRoutes = [
  { path: "/books", route: BookRoutes },
  { path: "/members", route: MemberRoutes },
  { path: "", route: BorrowReturnRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export const AllRoutes = router;
