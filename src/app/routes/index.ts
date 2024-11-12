import { Router } from "express";
import { BookRoutes } from "../module/book/book.route";

const router = Router();

const moduleRoutes = [{ path: "/books", route: BookRoutes }];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export const AllRoutes = router;
