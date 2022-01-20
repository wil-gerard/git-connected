import dotenv from "dotenv"
dotenv.config()

import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import session from "express-session"
import passport from "passport"
import User from "./User"
import { IDatabaseUser, IReqAuth, IUser } from "./interface"
import mongoStore from 'connect-mongo'
import Twitter from 'twit'

const GitHubStrategy = require("passport-github2").Strategy
const DiscordStrategy = require("passport-discord").Strategy
const TwitterStrategy = require("passport-twitter").Strategy

const app = express()

mongoose.connect(`${process.env.START_MONGODB}${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}${process.env.END_MONGODB}`, (err) => {
    if (err) throw err
    console.log("connected to MongoDB succesfully")
})

// Middleware

app.use(express.json())
app.use(cors({ origin: `${process.env.FRONTEND_DEV_URL}`, credentials: true }))

app.set("trust proxy", 1)

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: mongoStore.create({
            mongoUrl: `${process.env.START_MONGODB}${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}${process.env.END_MONGODB}`
        })
    })
)

app.use(passport.initialize())
app.use(passport.session())

// Discord Passport Strategy

const discordScopes = ['identify', 'guilds', 'guilds.join', 'guilds.members.read']

passport.use(new DiscordStrategy({
    clientID: `${process.env.DISCORD_CLIENT_ID}`,
    clientSecret: `${process.env.DISCORD_CLIENT_SECRET}`,
    callbackURL: "/auth/discord/callback",
    scope: discordScopes
},
    function (accessToken: any, refreshToken: any, profile: any, cb: any) {

        if (profile.guilds.some((guild: any) => guild.id === '735923219315425401')) {
            User.findOne({ 'discord.id': profile.id }, async (err: Error, doc: IDatabaseUser) => {

                if (err) {
                    return cb(err, null)
                }

                if (!doc) {

                    const newUser = new User()

                    newUser.discord.id = profile.id
                    newUser.discord.token = accessToken
                    newUser.discord.username = profile.username
                    newUser.discord.avatar = profile.avatar
                    newUser.discord.discriminator = profile.discriminator
                    newUser.discord.banner = profile.banner
                    newUser.discord.banner_color = profile.banner_color

                    await newUser.save()
                    cb(null, newUser)
                } else {
                    cb(null, doc)
                }
            })
        } else {
            console.log('not a member of the 100devs discord server')
        }
    }
))


// GitHub Passport Strategy

passport.use(new GitHubStrategy({
    clientID: `${process.env.GITHUB_CLIENT_ID}`,
    clientSecret: `${process.env.GITHUB_CLIENT_SECRET}`,
    callbackURL: "/auth/github/callback",
    passReqToCallback: true
},
    function (req: any, accessToken: any, refreshToken: any, profile: any, cb: any) {

        process.nextTick(() => {
            if (req.user) {
                let user = req.user

                user.github.connected = true
                user.github.id = profile.id
                user.github.token = accessToken
                user.github.displayName = profile.displayName
                user.github.json = profile._json

                user.save((err: Error) => {
                    if (err)
                        throw err
                    return cb(null, user)
                })
            }
        })
    }
))

// Twitter Passport Strategy

passport.use(new TwitterStrategy({
    consumerKey: `${process.env.TWITTER_CLIENT_ID}`,
    consumerSecret: `${process.env.TWITTER_CLIENT_SECRET}`,
    callbackURL: "/auth/twitter/callback",
    skipExtendedUserProfile: true,
    passReqToCallback: true
},
    function (req: any, token: any, tokenSecret: any, profile: any, cb: any) {

        process.nextTick(() => {
            if (req.user) {

                let user = req.user

                user.twitter.connected = true
                user.twitter.id = profile.id
                user.twitter.username = profile.username
                user.twitter.token = token
                user.twitter.tokenSecret = tokenSecret

                user.save((err: Error) => {
                    if (err)
                        throw err
                    return cb(null, user)
                })
            }
        })
    }
))

passport.serializeUser((user: IDatabaseUser, cb) => {
    cb(null, user._id)
})

passport.deserializeUser((id: string, cb) => {
    User.findById({ _id: id }, (err: Error, user: IDatabaseUser) => {
        cb(err, user)
    })
})

app.get('/twitterfollow', async (req: IReqAuth, res) => {
    try {
        console.log(`User '${req.user.twitter.username}' is a about to follow someone`)

        const twitter = new Twitter({
            consumer_key: process.env.TWITTER_CONSUMER_KEY,
            consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
            access_token: req.user.twitter.token,
            access_token_secret: req.user.twitter.tokenSecret,
        });

        await twitter.post('friendships/create', req.query)

    } catch (e) {
        console.log(e)
    }
});

app.get('/auth/discord', (req, res, next) => {
    passport.authenticate('discord')(req, res, next)
})

app.get('/auth/discord/callback',
    passport.authenticate('discord', {
        failureRedirect: '/',
        session: true
    }),
    function (req, res) {
        res.redirect(`${process.env.FRONTEND_DEV_URL}/profile`)
    })

app.get('/auth/github',
    passport.authenticate('github', { scope: ['read:user'] }))

app.get('/auth/github/callback',
    passport.authenticate('github', {
        failureRedirect: '/',
        session: true
    }),
    function (req, res) {
        res.redirect(`${process.env.FRONTEND_DEV_URL}/profile`)
    })

app.get('/auth/twitter',
    passport.authenticate('twitter'))

app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
        failureRedirect: '/',
        session: true
    }),
    function (req, res) {
        res.redirect(`${process.env.FRONTEND_DEV_URL}/profile`)
    })

app.get("/getuser", (req, res) => {
    res.send(req.user)
})

app.get("/getallusers", async (req, res) => {
    await User.find({ github: { connected: true }, discord: { connected: true }}, (err: Error, data: IUser[]) => {
        if (err) throw err;
        const filteredUsers: IUser[] = [];
        data.forEach((user: IUser) => {
            const userInformation = {
                discord: {
                    id: user.discord.id,
                    username: user.discord.username,
                    avatar: user.discord.avatar,
                    discriminator: user.discord.discriminator,
                    banner: user.discord.banner,
                    banner_color: user.discord.banner_color
                },
                github: {
                    id: user.github.id,
                    connected: user.github.connected,
                    json: {
                        login: user.github.json.login,
                        avatar_url: user.github.json.avatar_url,
                        html_url: user.github.json.html_url,
                        followers_url: user.github.json.followers_url,
                        following_url: user.github.json.following_url,
                        name: user.github.json.name,
                        company: user.github.json.company,
                        hireable: user.github.json.hireable,
                        blog: user.github.json.blog,
                        location: user.github.json.location,
                        bio: user.github.json.bio,
                        twitter_username: user.github.json.twitter_username,
                        followers: user.github.json.followers,
                        following: user.github.json.following,
                    }
                },
                twitter: {
                    id: user.twitter.id,
                    connected: user.github.connected,
                    username: user.twitter.username,
                }
            }
            filteredUsers.push(userInformation);
        })
        res.send(filteredUsers);
    }).clone().catch(function (err: Error) { console.log(err) });
})

app.get("/auth/logout", (req, res) => {
    if (req.user) {
        req.logout()
        res.send("done")
    }
})

const PORT = process.env.PORT || process.env.BACKEND_DEV_PORT

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})