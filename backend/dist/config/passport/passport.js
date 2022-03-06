"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var passport_1 = __importDefault(require("passport"));
var User_1 = __importDefault(require("../../models/User"));
var discord_1 = require("./strategies/discord");
var github_1 = require("./strategies/github");
var twitter_1 = require("./strategies/twitter");
passport_1.default.use(discord_1.discordStrategy);
passport_1.default.use(github_1.gitHubStrategy);
passport_1.default.use(twitter_1.twitterStrategy);
passport_1.default.serializeUser(function (user, cb) {
    cb(null, user._id);
});
passport_1.default.deserializeUser(function (id, cb) {
    User_1.default.findById({ _id: id }, function (err, user) {
        cb(err, user);
    });
});
//# sourceMappingURL=passport.js.map