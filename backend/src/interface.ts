export interface IDatabaseUser {
    _id: string
    __v: number
    discord: {
        id: string
        token: string
        username?: string
        avatar?: string
        discriminator?: string
        accent_color?: number
    }
    github?: {
        id: string
        token: string
        displayName?: string
        photos?: any
        json?: any
    }
}

export interface IUser {
    discord: {
        id: string
        token: string
        username?: string
        avatar?: string
        discriminator?: string
        accent_color?: number
    }
    github?: {
        id: string
        token: string
        displayName?: string
        photos?: string
        json?: {
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
    }
}