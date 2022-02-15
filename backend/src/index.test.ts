const { testSum, testMult, returnProperties } = require('./testFunctions.ts')

describe('testTestSuite', () => {
    it('returns the sum of two numbers', () => {
        const result = testSum(2, 7)
        expect(result).toEqual(9)
    })
    it('returns the product of two numbers', () => {
        const result = testMult(2, 4)
        expect(result).toEqual(8)
        expect(testMult(10, 10)).toEqual(100)
    })
})

describe('userTests', () => {
    it('only returns the requested properties', () => {
        const obj =
        {
            tags: { lookingForCoffeeChats: true, openToCoffeeChats: false },
            discordToken: '462397689447841794',
            gitHubToken: 'dzfbvagfdag',
            twitterToken: '213r98uaefds',
            twitterTokenSecret: '134fasdlkj321',
            discord: {
                id: '462397689447841794',
                username: 'Wil Gerard',
                avatar: '88b13371bd56386a43505c67dd936e3e',
                discriminator: '8370',
                banner_color: '#2886e7'
            },
            gitHub: {
                id: '74286884',
                json: {
                    login: 'wil-gerard',
                    id: 74286884,
                    node_id: 'MDQ6VXNlcjc0Mjg2ODg0',
                    avatar_url: 'https://avatars.githubusercontent.com/u/74286884?v=4',
                    gravatar_id: '',
                    url: 'https://api.github.com/users/wil-gerard',
                    html_url: 'https://github.com/wil-gerard',
                    followers_url: 'https://api.github.com/users/wil-gerard/followers',
                    following_url: 'https://api.github.com/users/wil-gerard/following{/other_user}',
                    gists_url: 'https://api.github.com/users/wil-gerard/gists{/gist_id}',
                    starred_url: 'https://api.github.com/users/wil-gerard/starred{/owner}{/repo}',
                    subscriptions_url: 'https://api.github.com/users/wil-gerard/subscriptions',
                    organizations_url: 'https://api.github.com/users/wil-gerard/orgs',
                    repos_url: 'https://api.github.com/users/wil-gerard/repos',
                    events_url: 'https://api.github.com/users/wil-gerard/events{/privacy}',
                    received_events_url: 'https://api.github.com/users/wil-gerard/received_events',
                    type: 'User',
                    site_admin: false,
                    name: 'Wil Gerard',
                    blog: 'www.wilgerard.com',
                    location: 'Minneapolis, MN',
                    hireable: true,
                    bio: 'Software Engineer | JavaScript Developer | Graphic Designer | Photographer | #100Devs alum',
                    twitter_username: 'wil_gerard',
                    public_repos: 30,
                    public_gists: 0,
                    followers: 37,
                    following: 59,
                    created_at: '2020-11-11T06:06:11Z',
                    updated_at: '2022-01-27T19:13:40Z',
                    private_gists: 0,
                    total_private_repos: 2,
                    owned_private_repos: 2,
                    disk_usage: 89066,
                    collaborators: 0,
                    two_factor_authentication: false,
                    plan: [Object]
                },
            },
            twitter: {
                id: '251922066',
                username: 'wil_gerard'
            },
            gitHubConnected: true,
            twitterConnected: true,
            customBio: 'Hello! I am new to tech Twitter and looking for followers',
            customLocation: 'Des Moines, IA',
            customName: 'Ricky Rubio',
            __v: 0
        }

        const properties = ['tags', 'gitHubConnected', 'twitterConnected', 'customBio', 'customLocation','customName']

        expect(returnProperties(obj, properties)).toEqual({
            tags: { lookingForCoffeeChats: true, openToCoffeeChats: false },
            gitHubConnected: true,
            twitterConnected: true,
            customBio: 'Hello! I am new to tech Twitter and looking for followers',
            customLocation: 'Des Moines, IA',
            customName: 'Ricky Rubio',
        })
    })
    it('does not include requested properties that do not exist on the object', () => {
        const obj =
        {
            tags: { lookingForCoffeeChats: true, openToCoffeeChats: false },
            discordToken: '462397689447841794',
            gitHubToken: 'dzfbvagfdag',
            twitterToken: '213r98uaefds',
            twitterTokenSecret: '134fasdlkj321',
            discord: {
                id: '462397689447841794',
                username: 'Wil Gerard',
                avatar: '88b13371bd56386a43505c67dd936e3e',
                discriminator: '8370',
                banner_color: '#2886e7'
            },
            gitHub: {
                id: '74286884',
                json: {
                    login: 'wil-gerard',
                    id: 74286884,
                    node_id: 'MDQ6VXNlcjc0Mjg2ODg0',
                    avatar_url: 'https://avatars.githubusercontent.com/u/74286884?v=4',
                    gravatar_id: '',
                    url: 'https://api.github.com/users/wil-gerard',
                    html_url: 'https://github.com/wil-gerard',
                    followers_url: 'https://api.github.com/users/wil-gerard/followers',
                    following_url: 'https://api.github.com/users/wil-gerard/following{/other_user}',
                    gists_url: 'https://api.github.com/users/wil-gerard/gists{/gist_id}',
                    starred_url: 'https://api.github.com/users/wil-gerard/starred{/owner}{/repo}',
                    subscriptions_url: 'https://api.github.com/users/wil-gerard/subscriptions',
                    organizations_url: 'https://api.github.com/users/wil-gerard/orgs',
                    repos_url: 'https://api.github.com/users/wil-gerard/repos',
                    events_url: 'https://api.github.com/users/wil-gerard/events{/privacy}',
                    received_events_url: 'https://api.github.com/users/wil-gerard/received_events',
                    type: 'User',
                    site_admin: false,
                    name: 'Wil Gerard',
                    blog: 'www.wilgerard.com',
                    location: 'Minneapolis, MN',
                    hireable: true,
                    bio: 'Software Engineer | JavaScript Developer | Graphic Designer | Photographer | #100Devs alum',
                    twitter_username: 'wil_gerard',
                    public_repos: 30,
                    public_gists: 0,
                    followers: 37,
                    following: 59,
                    created_at: '2020-11-11T06:06:11Z',
                    updated_at: '2022-01-27T19:13:40Z',
                    private_gists: 0,
                    total_private_repos: 2,
                    owned_private_repos: 2,
                    disk_usage: 89066,
                    collaborators: 0,
                    two_factor_authentication: false,
                    plan: [Object]
                },
            },
            twitter: {
                id: '251922066',
                username: 'wil_gerard'
            },
            gitHubConnected: true,
            twitterConnected: true,
            customBio: 'Hello! I am new to tech Twitter and looking for followers',
            customLocation: 'Des Moines, IA',
            customName: 'Ricky Rubio',
            __v: 0
        }

        const properties = ['customLastName', 'customBio', 'customLocation','customName',]

        const result = returnProperties(obj, properties)

        console.log(result)

        expect(result).toEqual({
            customBio: 'Hello! I am new to tech Twitter and looking for followers',
            customLocation: 'Des Moines, IA',
            customName: 'Ricky Rubio',
        })

        expect(result).not.toHaveProperty('customLastName')
    })
})