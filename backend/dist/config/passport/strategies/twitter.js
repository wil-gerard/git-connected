"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.twitterStrategy = void 0;
var TwitterStrategy = require('passport-twitter').Strategy;
var twitterStrategySettings = {
    consumerKey: "".concat(process.env.TWITTER_CONSUMER_KEY),
    consumerSecret: "".concat(process.env.TWITTER_CONSUMER_SECRET),
    callbackURL: '/api/auth/twitter/callback',
    skipExtendedUserProfile: true,
    passReqToCallback: true,
};
exports.twitterStrategy = new TwitterStrategy(twitterStrategySettings, handleConnectTwitterAccount);
function handleConnectTwitterAccount(req, twitterToken, twitterTokenSecret, twitterProfile, callback) {
    process.nextTick(function () {
        if (req.user) {
            var user_1 = req.user;
            user_1.twitterConnected = true;
            user_1.twitter.id = twitterProfile.id;
            user_1.twitter.username = twitterProfile.username;
            user_1.twitterToken = twitterToken;
            user_1.twitterTokenSecret = twitterTokenSecret;
            user_1.save(function (err) {
                if (err)
                    throw err;
                return callback(null, user_1);
            });
        }
    });
}
//# sourceMappingURL=twitter.js.map