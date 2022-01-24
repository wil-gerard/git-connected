const GitHubStrategy = require('passport-github2').Strategy

const gitHubStrategySettings: any = {
    clientID: `${process.env.GITHUB_CLIENT_ID}`,
    clientSecret: `${process.env.GITHUB_CLIENT_SECRET}`,
    callbackURL: '/api/auth/github/callback',
    passReqToCallback: true
}
export const gitHubStrategy: any = new GitHubStrategy(gitHubStrategySettings, handleConnectGitHubAccount);

function handleConnectGitHubAccount(req: any, gitHubAccessToken: String, refreshToken: String, gitHubProfile: any, callback: Function){
    
    process.nextTick(() => {
        if (req.user) {
            let user = req.user

            user.gitHubConnected = true
            user.github.id = gitHubProfile.id
            user.github.token = gitHubAccessToken
            user.github.displayName = gitHubProfile.displayName
            user.github.json = gitHubProfile._json

            user.save((err: Error) => {
                if (err)
                    throw err
                return callback(null, user)
            })
        }
    })

}