"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const globalErrorhandler = (err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    let statusCode = (err === null || err === void 0 ? void 0 : err.status) || (err === null || err === void 0 ? void 0 : err.statusCode) || 500, message = (err === null || err === void 0 ? void 0 : err.message) || "Something went wrong!!";
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError &&
        (err === null || err === void 0 ? void 0 : err.name) === "PrismaClientKnownRequestError") {
        if ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.cause)
            message = `${(_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.modelName} ${(_c = err === null || err === void 0 ? void 0 : err.meta) === null || _c === void 0 ? void 0 : _c.cause}`;
        else if (((_d = err === null || err === void 0 ? void 0 : err.meta) === null || _d === void 0 ? void 0 : _d.target) && Array.isArray((_e = err === null || err === void 0 ? void 0 : err.meta) === null || _e === void 0 ? void 0 : _e.target)) {
            message = ((_f = err === null || err === void 0 ? void 0 : err.meta) === null || _f === void 0 ? void 0 : _f.target.join(" ")) + " must be unique";
            message = message[0].toUpperCase() + message.slice(1);
        }
    }
    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message,
    });
});
exports.default = globalErrorhandler;
