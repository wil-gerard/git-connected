export interface IUser {
    twitterConnected: boolean
    gitHubConnected: boolean
    discord: {
        id: string
        token: string
        username: string
        avatar?: string
        discriminator: string
        banner?: string
        banner_color?: string
    }
    github: {
        id: string
        token: string
        json: {
            login?: string
            avatar_url?: string
            html_url?: string
            followers_url?: string
            following_url?: string
            name: string
            company? : string
            hireable?: string
            blog?: string
            location?: string
            bio?: string
            twitter_username?: string
            followers?: number
            following?: number
        }
    }
    twitter: {
        id: string
        token: string
        tokenSecret: string
        username: string
    }
}