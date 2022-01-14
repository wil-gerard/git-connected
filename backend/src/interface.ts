export interface IDatabaseUser {
    githubInfo: {
        githubId?: string
        displayName?: string
        photos?: any
        json?: any
    }
    discordInfo: {
        discordId?: string
    }
    __v: number
    _id: string
}

export interface IUser {
    id?: string
    githubInfo: {
        json: {
            login?: string
            avatar_url?: string
            html_url?: string
            followers_url?: string
            following_url?: string
            name?: string
            blog?: string
            location?: string
            bio?: string
            twitter_username?: string
            followers?: number
            following?: number
        }
    },
    discordInfo: {
        discordId?: string
    }
}