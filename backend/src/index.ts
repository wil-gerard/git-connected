import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import session from "express-session"
import passport from "passport"
const TwitterStrategy = require("passport-twitter").Strategy

dotenv.config()

const app = express()

mongoose.connect(`${process.env.START_MONGODB}${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}${process.env.END_MONGODB}`, {

}, () => {
    console.log("connected to mongoose succesfully")
})

// Middleware

app.use(express.json())
app.use(cors({ origin: "https://localhost:3000/login", credentials: true }))

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

passport.serializeUser((user, done) => {
    return done(null, user)
})

passport.deserializeUser((user, done) => {
    return done(null, user)
})

app.get("/", (req, res) => {
    res.send("hello world!")
})

app.listen(4000, () => {
    console.log("server started")
})

passport.use(new TwitterStrategy({
    consumerKey: `${process.env.TWITTER_API_KEY}`,
    consumerSecret: `${process.env.TWITTER_API_KEY_SECRET}`,
    callbackURL: "http://localhost:4000/auth/twitter/callback"
},
    function (accessToken: any, refreshToken: any, profile: any, cb: any) {
        console.log(profile)
        cb(null, profile)
    }));


app.get('/auth/twitter',
    passport.authenticate('twitter'));

app.get('/auth/twitter/callback',
    passport.authenticate('twitter', { failureRedirect: 'http://localhost:3000/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('http://localhost:3000/home');
    });
