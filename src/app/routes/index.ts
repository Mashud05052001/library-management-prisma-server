import { Router } from "express";
import { BookRoutes } from "../module/book/book.route";
import { MemberRoutes } from "../module/member/member.route";

const router = Router();

const moduleRoutes = [
  { path: "/books", route: BookRoutes },
  { path: "/members", route: MemberRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export const AllRoutes = router;
