const TwitterStrategy = require("passport-twitter").Strategy


const twitterStrategySettings: any = {
    consumerKey: `${process.env.TWITTER_CONSUMER_KEY}`,
    consumerSecret: `${process.env.TWITTER_CONSUMER_SECRET}`,
    callbackURL: "/auth/twitter/callback",
    skipExtendedUserProfile: true,
    passReqToCallback: true
}

export const twitterStrategy: any = new TwitterStrategy(twitterStrategySettings,handleConnectTwitterAccount)

function handleConnectTwitterAccount(req: any, twitterToken: any, twitterTokenSecret: any, twitterProfile: any, callback: Function){
    process.nextTick(() => {
        if (req.user) {

            let user = req.user

            user.twitterConnected = true
            user.twitter.id = twitterProfile.id
            user.twitter.username = twitterProfile.username
            user.twitter.token = twitterToken
            user.twitter.tokenSecret = twitterTokenSecret

            user.save((err: Error) => {
                if (err)
                    throw err
                return callback(null, user)
            })
        }
    })
}