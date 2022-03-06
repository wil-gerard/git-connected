"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var URI = "".concat(process.env.MONGODB_URI_START).concat(process.env.MONGODB_USERNAME, ":").concat(process.env.MONGODB_PASSWORD).concat(process.env.MONGODB_URI_END);
mongoose_1.default.connect("".concat(URI), function (err) {
    if (err)
        throw err;
    console.log('MongoDB connected');
});
//# sourceMappingURL=database.js.map