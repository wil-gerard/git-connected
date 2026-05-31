const TwitterStrategy = require('passport-twitter').Strategy;

const twitterCredentialsAvailable = Boolean(
  process.env.TWITTER_CONSUMER_KEY && process.env.TWITTER_CONSUMER_SECRET
);

const twitterStrategySettings: any = {
  consumerKey: `${process.env.TWITTER_CONSUMER_KEY}`,
  consumerSecret: `${process.env.TWITTER_CONSUMER_SECRET}`,
  callbackURL: '/api/auth/twitter/callback',
  skipExtendedUserProfile: true,
  passReqToCallback: true,
};

export const twitterStrategy: any = twitterCredentialsAvailable
  ? new TwitterStrategy(twitterStrategySettings, handleConnectTwitterAccount)
  : null;

async function handleConnectTwitterAccount(
  req: any,
  twitterToken: any,
  twitterTokenSecret: any,
  twitterProfile: any,
  callback: Function
) {
  process.nextTick(async () => {
    if (req.user) {
      let user = req.user;

      user.twitterConnected = true;
      user.twitter.id = twitterProfile.id;
      user.twitter.username = twitterProfile.username;
      user.twitterToken = twitterToken;
      user.twitterTokenSecret = twitterTokenSecret;

      try {
        await user.save();
        return callback(null, user);
      } catch (err) {
        return callback(err, null);
      }
    }
  });
}
