import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import session from "express-session"
import passport from "passport"
import User from "./User"
import { IMongoDBUser } from "./types"


// const TwitterStrategy = require("passport-twitter").Strategy
const GitHubStrategy = require("passport-github2").Strategy

dotenv.config()

const app = express()

mongoose.connect(`${process.env.START_MONGODB}${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}${process.env.END_MONGODB}`, {

}, () => {
    console.log("connected to mongoose succesfully")
})

// Middleware

app.use(express.json())
app.use(cors({ origin: "http://localhost:3000", credentials: true }))

app.set("trust proxy", 1)

app.use(
    session({
        secret: "secretcode",
        resave: true,
        saveUninitialized: true,
    })
)

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user: IMongoDBUser, done: any) => {
    return done(null, user._id)
})

passport.deserializeUser((id: string, done: any) => {

    User.findById(id, (err: Error, doc: IMongoDBUser) => {

        return done(null, doc)
    })
})

// GitHub Passport Strategy

passport.use(new GitHubStrategy({
    clientID: `${process.env.GITHUB_CLIENT_ID}`,
    clientSecret: `${process.env.GITHUB_CLIENT_SECRET}`,
    callbackURL: "/auth/github/callback"
},
    function (_: any, __: any, profile: any, cb: any) {

        User.findOne({ githubId: profile.id }, async (err: Error, doc: IMongoDBUser) => {
            console.log(profile)

            if (err) {
                return cb(err, null)
            }

            if (!doc) {
                const newUser = new User({
                    githubId: profile.id,
                    username: profile.displayName,
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

app.get('/auth/github',
    passport.authenticate('github', { scope: [ 'user' ] }))

app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    function (req, res) {
        res.redirect('http://localhost:3000/home')
    })

app.get("/getuser", (req, res) => {
    res.send(req.user)
})

app.get("/auth/logout", (req, res) => {
    if (req.user) {
        req.logout();
        res.send("done");
    }
})

app.listen(4000, () => {
    console.log("server started")
})