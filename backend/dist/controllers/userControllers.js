"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.getUser = exports.userFollowAll = exports.removeConnection = exports.userUpdate = void 0;
var User_1 = __importDefault(require("../models/User"));
var twit_1 = __importDefault(require("twit"));
var userUpdate = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userUpdateProps, id, update, options;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userUpdateProps = __rest(req.body, []);
                id = req.user._id;
                update = __assign({}, userUpdateProps);
                options = {
                    new: true,
                    runValidators: true,
                    context: 'query',
                };
                return [4 /*yield*/, User_1.default.findByIdAndUpdate(id, update, options, function (err, doc) {
                        if (!err) {
                            res.status(200).send(doc);
                        }
                    })
                        .clone()
                        .catch(function (err) {
                        err.status = 422;
                        next(err);
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.userUpdate = userUpdate;
var removeConnection = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var platformName, id, userUpdateProps, options;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                platformName = req.body.platformName;
                id = req.user._id;
                userUpdateProps = {};
                userUpdateProps["".concat(platformName, "Connected")] = false;
                userUpdateProps["".concat(platformName, "Token")] = "";
                userUpdateProps["".concat(platformName)] = {};
                if (platformName === "twitter") {
                    userUpdateProps.twitterTokenSecret = "";
                }
                ;
                options = {
                    new: true,
                    runValidators: true,
                    context: 'query',
                };
                return [4 /*yield*/, User_1.default.findByIdAndUpdate(id, userUpdateProps, options, function (err, doc) {
                        if (!err) {
                            res.status(200).send(doc);
                        }
                    }).clone().catch(function (err) {
                        err.status = 422;
                        next(err);
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.removeConnection = removeConnection;
var userFollowAll = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var username, twitter, doTwitterFollow, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                username = req.query['username'];
                twitter = new twit_1.default({
                    consumer_key: process.env.TWITTER_CONSUMER_KEY,
                    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
                    access_token: req.user.twitterToken,
                    access_token_secret: req.user.twitterTokenSecret,
                });
                return [4 /*yield*/, twitter.post('friendships/create', {
                        screen_name: username,
                    })];
            case 1:
                doTwitterFollow = _a.sent();
                res.json(doTwitterFollow.resp.statusCode);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                next(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.userFollowAll = userFollowAll;
var getUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            res.status(200).send(req.user);
        }
        catch (err) {
            next(err);
        }
        return [2 /*return*/];
    });
}); };
exports.getUser = getUser;
var getAllUsers = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var users, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, User_1.default.find({ gitHubConnected: true, twitterConnected: true }, {
                        discordToken: 0,
                        gitHubToken: 0,
                        twitterToken: 0,
                        twitterTokenSecret: 0,
                    }).clone()];
            case 1:
                users = _a.sent();
                res.status(200).send(__spreadArray([], users, true));
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                console.error(err_2);
                next(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllUsers = getAllUsers;
//# sourceMappingURL=userControllers.js.map