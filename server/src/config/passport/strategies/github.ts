const GitHubStrategy = require('passport-github2').Strategy;
import { Octokit } from '@octokit/core';

const gitHubStrategySettings: any = {
  clientID: `${process.env.GITHUB_CLIENT_ID}`,
  clientSecret: `${process.env.GITHUB_CLIENT_SECRET}`,
  callbackURL: '/api/auth/github/callback',
  passReqToCallback: true,
  scope: ['user:follow', 'user:email', 'read:user'],
};
export const gitHubStrategy: any = new GitHubStrategy(
  gitHubStrategySettings,
  handleConnectGitHubAccount
);

async function handleConnectGitHubAccount(
  req: any,
  gitHubAccessToken: string,
  refreshToken: string,
  gitHubProfile: any,
  callback: Function
) {
  process.nextTick(async () => {
    if (req.user) {
      let user = req.user;

      user.gitHubConnected = true;
      user.gitHub.id = gitHubProfile.id;
      user.gitHubToken = gitHubAccessToken;
      user.gitHub.displayName = gitHubProfile.displayName;
      user.gitHub.json = gitHubProfile._json;

      const blog: string = gitHubProfile._json.blog ?? '';

      try {
        const octokit = new Octokit({ auth: gitHubAccessToken });
        const { data: socialAccounts } = await octokit.request('GET /user/social_accounts');
        user.socialAccounts = socialAccounts.map((a: any) => ({
          provider: a.provider,
          url: a.url,
        }));

        const linkedInAccount = socialAccounts.find(
          (a: any) => a.provider === 'linkedin'
        );
        if (!user.linkedInUrl) {
          if (linkedInAccount) {
            user.linkedInUrl = linkedInAccount.url;
          } else if (blog.includes('linkedin.com')) {
            user.linkedInUrl = blog.startsWith('http') ? blog : `https://${blog}`;
          }
        }

        await user.save();
        return callback(null, user);
      } catch (err) {
        return callback(err, null);
      }
    }
  });
}
