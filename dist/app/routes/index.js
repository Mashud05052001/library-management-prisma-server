"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllRoutes = void 0;
const express_1 = require("express");
const book_route_1 = require("../module/book/book.route");
const member_route_1 = require("../module/member/member.route");
const borrowReturn_route_1 = require("../module/borrow&Return/borrowReturn.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    { path: "/books", route: book_route_1.BookRoutes },
    { path: "/members", route: member_route_1.MemberRoutes },
    { path: "", route: borrowReturn_route_1.BorrowReturnRoutes },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.AllRoutes = router;
