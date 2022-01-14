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

    User.findOne({ _id: id }, (err: Error, user: IDatabaseUser) => {
        const userInformation: IUser = {
            id: user._id,
            githubInfo: {
                json: {
                    login: user.githubInfo.json.login,
                    avatar_url: user.githubInfo.json.avatar_url,
                    html_url: user.githubInfo.json.html_url,
                    followers_url: user.githubInfo.json.followers_url,
                    following_url: user.githubInfo.json.following_url,
                    name: user.githubInfo.json.name,
                    blog: user.githubInfo.json.blog,
                    location: user.githubInfo.json.location,
                    bio: user.githubInfo.json.bio,
                    twitter_username: user.githubInfo.json.twitter_username,
                    followers: user.githubInfo.json.followers,
                    following: user.githubInfo.json.following,
                }
            },
            discordInfo: {
                discordId: user.discordInfo.discordId
            }
        }
        cb(err, userInformation)
    })
})

// GitHub Passport Strategy

passport.use(new GitHubStrategy({
    clientID: `${process.env.GITHUB_CLIENT_ID}`,
    clientSecret: `${process.env.GITHUB_CLIENT_SECRET}`,
    callbackURL: "/auth/github/callback"
},
    function (accessToken: any, refreshToken: any, profile: any, cb: any) {

        User.findOne({ githubId: profile.id }, async (err: Error, doc: IDatabaseUser) => {

            if (err) {
                return cb(err, null)
            }

            if (!doc) {
                const newUser = new User({
                    githubId: profile.id,
                    displayName: profile.displayName,
                    photos: profile.photos,
                    json: profile._json
                })

                await newUser.save()
                cb(null, newUser)
            } else {
                cb(null, doc)
            }
        })


    }
))

// Discord Passport Strategy

const discordScopes = ['identify', 'guilds', 'guilds.join']

passport.use(new DiscordStrategy({
    clientID: `${process.env.DISCORD_CLIENT_ID}`,
    clientSecret: `${process.env.DISCORD_CLIENT_SECRET}`,
    callbackURL: "/auth/discord/callback",
    scope: discordScopes
},
    function (accessToken: any, refreshToken: any, profile: any, cb: any) {
        console.log(profile)

        User.findOne({ discordId: profile.id }, async (err: Error, doc: IDatabaseUser) => {

            if (err) {
                return cb(err, null)
            }

            if (!doc) {
                const newUser = new User({
                    discordId: profile.id,
                })

                await newUser.save()
                cb(null, newUser)
            } else {
                cb(null, doc)
            }
        })


    }
))

app.get('/auth/discord',
    passport.authenticate('discord'))

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

app.get("/getuser", (req, res) => {
    res.send(req.user)
})

// app.post("/getuser", (req, res) => {
//     res.
// })

app.get("/getallusers", async (req, res) => {
    await User.find({}, (err: Error, data: IDatabaseUser[]) => {
        if (err) throw err;
        const filteredUsers: IUser[] = [];
        data.forEach((user: IDatabaseUser) => {
            const userInformation = {
                id: user._id,
                githubInfo: {
                    json: {
                        login: user.githubInfo.json.login,
                        avatar_url: user.githubInfo.json.avatar_url,
                        html_url: user.githubInfo.json.html_url,
                        followers_url: user.githubInfo.json.followers_url,
                        following_url: user.githubInfo.json.following_url,
                        name: user.githubInfo.json.name,
                        blog: user.githubInfo.json.blog,
                        location: user.githubInfo.json.location,
                        bio: user.githubInfo.json.bio,
                        twitter_username: user.githubInfo.json.twitter_username,
                        followers: user.githubInfo.json.followers,
                        following: user.githubInfo.json.following,
                    }
                },
                discordInfo: {
                    discordId: user.discordInfo.discordId
                }
            }
            filteredUsers.push(userInformation);
        })
        res.send(filteredUsers);
    }).clone().catch(function(err: Error) {console.log(err)});
});

app.get("/auth/logout", (req, res) => {
    if (req.user) {
        req.logout();
        res.send("done");
    }
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})