import dotenv from "dotenv"
dotenv.config()

import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import session from "express-session"
import passport from "passport"
import User from "./User"
import { IDatabaseUser, IUser } from "./interface"
import mongoStore from 'connect-mongo'

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

passport.serializeUser((user: IDatabaseUser, cb) => {
    cb(null, user._id)
})

passport.deserializeUser((id: string, cb) => {
    User.findById({ _id: id }, (err: Error, user: IDatabaseUser) => {
        cb(err, user)
    })
})

// Discord Passport Strategy

const discordScopes = ['identify', 'guilds', 'guilds.join', 'guilds.members.read']

passport.use(new DiscordStrategy({
    clientID: `${process.env.DISCORD_CLIENT_ID}`,
    clientSecret: `${process.env.DISCORD_CLIENT_SECRET}`,
    callbackURL: "/auth/discord/callback",
    scope: discordScopes
},
    function (accessToken: any, refreshToken: any, profile: any, cb: any) {
        console.log(profile)

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

        console.log(profile)

        process.nextTick(() => {
            if (req.user) {
                let user = req.user
                console.log(`github oauth working -- this is req.user obj ${user}`)

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

        // if (req.user) {

        //     let user = req.user
        //     console.log(`github oauth working -- this is req.user obj ${user}`)

        //     User.findOne({ 'discord.id': user.discord.id }, async (err: Error, doc: IDatabaseUser) => {
        //         console.log(`user found on mongodb`)


        //         user.github.id = profile.id
        //         user.github.token = accessToken
        //         user.github.displayName = profile.displayName
        //         user.github.photos = profile.photos
        //         user.github.json = profile.json

        //         await user.save()
        //         cb(null, user)

        //     })
        // }
    }
))

// Twitter Passport Strategy

passport.use(new TwitterStrategy({
    consumerKey: `${process.env.TWITTER_CLIENT_ID}`,
    consumerSecret: `${process.env.TWITTER_CLIENT_SECRET}`,
    callbackURL: "/auth/twitter/callback"
},
    function (accessToken: any, refreshToken: any, profile: any, cb: any) {
        console.log(profile)

        // User.findOneAndUpdate({ discordId: profile.id }, async (err: Error, doc: IDatabaseUser) => {

        //     if (err) {
        //         return cb(err, null)
        //     }

        //     if (!err) {
        //         const newUser = new User({
        //             githubInfo: {
        //                 githubId: profile.id,
        //                 displayName: profile.displayName,
        //                 photos: profile.photos,
        //                 json: profile._json
        //             }
        //         })

        //         await newUser.save()
        //         cb(null, newUser)
        //     } else {
        //         cb(null, doc)
        //     }
        // })


    }
))


app.get('/auth/discord', (req, res, next) => {
    console.log(req.query)
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
    await User.find({}, (err: Error, data: IDatabaseUser[]) => {
        if (err) throw err;
        const filteredUsers: IUser[] = [];
        data.forEach((user: IDatabaseUser) => {
            const userInformation = {
                githubInfo: {
                    json: {
                        login: user.github.json.login,
                        avatar_url: user.github.json.avatar_url,
                        html_url: user.github.json.html_url,
                        followers_url: user.github.json.followers_url,
                        following_url: user.github.json.following_url,
                        name: user.github.json.name,
                        blog: user.github.json.blog,
                        location: user.github.json.location,
                        bio: user.github.json.bio,
                        twitter_username: user.github.json.twitter_username,
                        followers: user.github.json.followers,
                        following: user.github.json.following,
                    }
                },
                discord: {
                    id: user.discord.id,
                    token: user.discord.id,
                    username: user.discord.username,
                    avatar: user.discord.avatar,
                    discriminator: user.discord.discriminator,
                    banner: user.discord.banner,
                    banner_color: user.discord.banner_color
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

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})