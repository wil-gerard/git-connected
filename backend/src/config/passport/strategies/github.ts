const GitHubStrategy = require('passport-github2').Strategy;

const gitHubStrategySettings: any = {
  clientID: `${process.env.GITHUB_CLIENT_ID}`,
  clientSecret: `${process.env.GITHUB_CLIENT_SECRET}`,
  callbackURL: '/api/auth/github/callback',
  scope: gitHubScopes,
  passReqToCallback: true,
  scope: [
    'user:follow',
    'user:email',
    'read:user'
  ]
};
export const gitHubStrategy: any = new GitHubStrategy(
  gitHubStrategySettings,
  handleConnectGitHubAccount
);

function handleConnectGitHubAccount(
  req: any,
  gitHubAccessToken: String,
  refreshToken: String,
  gitHubProfile: any,
  callback: Function
) {
  process.nextTick(() => {
    if (req.user) {
      let user = req.user;

      user.gitHubConnected = true;
      user.gitHub.id = gitHubProfile.id;
      user.gitHubToken = gitHubAccessToken;
      user.gitHub.displayName = gitHubProfile.displayName;
      user.gitHub.json = gitHubProfile._json;

      user.save((err: Error) => {
        if (err) throw err;
        return callback(null, user);
      });
    }
  });
}
