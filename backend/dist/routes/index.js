"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var authRouter_1 = __importDefault(require("./authRouter"));
var userRouter_1 = __importDefault(require("./userRouter"));
var routes = [authRouter_1.default, userRouter_1.default];
exports.default = routes;
//# sourceMappingURL=index.js.map