"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gitHubStrategy = void 0;
var GitHubStrategy = require('passport-github2').Strategy;
var gitHubStrategySettings = {
    clientID: "".concat(process.env.GITHUB_CLIENT_ID),
    clientSecret: "".concat(process.env.GITHUB_CLIENT_SECRET),
    callbackURL: '/api/auth/github/callback',
    passReqToCallback: true,
    scope: [
        'user:follow',
        'user:email',
        'read:user'
    ]
};
exports.gitHubStrategy = new GitHubStrategy(gitHubStrategySettings, handleConnectGitHubAccount);
function handleConnectGitHubAccount(req, gitHubAccessToken, refreshToken, gitHubProfile, callback) {
    process.nextTick(function () {
        if (req.user) {
            var user_1 = req.user;
            user_1.gitHubConnected = true;
            user_1.gitHub.id = gitHubProfile.id;
            user_1.gitHubToken = gitHubAccessToken;
            user_1.gitHub.displayName = gitHubProfile.displayName;
            user_1.gitHub.json = gitHubProfile._json;
            user_1.save(function (err) {
                if (err)
                    throw err;
                return callback(null, user_1);
            });
        }
    });
}
//# sourceMappingURL=github.js.map