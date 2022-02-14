const { testSum, testMult, testNoUserTokens } = require('./testFunctions.ts')

describe('testSuite', () => {
    test('testAddingTwoNum', () => {
        const result = testSum(2, 7)
        expect(result).toEqual(9)
    })
    test('testMult', () => {
        const result = testMult(2, 4)
        expect(result).toEqual(8)
        expect(testMult(10, 10)).toEqual(100)
    })
    test('should return no user tokens', () => {
        const input =
        {
            tags: { lookingForCoffeeChats: true, openToCoffeeChats: false },
            discord: {
                id: '462397689447841794',
                token: 'sdfgsergadefgdah',
                username: 'Wil Gerard',
                avatar: '88b13371bd56386a43505c67dd936e3e',
                discriminator: '8370',
                banner_color: '#2886e7'
            },
            github: {
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
                token: 'dzfbvagfdag'
            },
            twitter: {
                id: '251922066',
                token: 'gfhbnfghsfgh',
                tokenSecret: 'xcvFCasdf',
                username: 'wil_gerard'
            },
            gitHubConnected: true,
            twitterConnected: true,
            customBio: '',
            customLocation: '',
            customName: '',
            __v: 0
        }

        const output = {
            tags: { lookingForCoffeeChats: true, openToCoffeeChats: false },
            discord: {
                id: '462397689447841794',
                username: 'Wil Gerard',
                avatar: '88b13371bd56386a43505c67dd936e3e',
                discriminator: '8370',
                banner_color: '#2886e7'
            },
            github: {
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
            customBio: '',
            customLocation: '',
            customName: '',
            __v: 0
        }
        expect(testNoUserTokens(input)).toEqual(output)
    })
})