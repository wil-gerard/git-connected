export interface IDatabaseUser {
    githubId: string
    displayName: string
    __v: number
    _id: string
    photos?: any
    json: any
}

export interface IUser {
    id?: string
    json: {
        login: string
        avatar_url?: string
        html_url?: string
        followers_url?: string
        following_url?: string
        name: string
        blog?: string
        location?: string
        bio?: string
        twitter_username?: string,
        followers?: number
        following?: number
    };
}