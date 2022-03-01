import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'
import session from 'express-session'
import passport from 'passport'
import User from './models/User'
import routes from './routes/index'
import { IDatabaseUser, IReqAuth, IUser } from './interface'
import mongoStore from 'connect-mongo'

import Twitter from 'twit'

import { discordStrategy } from './strategies/discord';
import { gitHubStrategy } from './strategies/github';
import { twitterStrategy } from './strategies/twitter';

const app = express()

mongoose.connect(`${process.env.START_MONGODB}${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}${process.env.END_MONGODB}`, (err) => {
    if (err) throw err
    console.log('connected to MongoDB succesfully')
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: `${process.env.FRONTEND_DEV_URL}`,
    methods: 'GET,PUT,POST,DELETE',
    credentials: true
}));

app.use(morgan('dev'))

app.set('trust proxy', 1)

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

passport.use(discordStrategy)
passport.use(gitHubStrategy)
passport.use(twitterStrategy)

passport.serializeUser((user: IDatabaseUser, cb) => {
    cb(null, user._id)
})

passport.deserializeUser((id: string, cb) => {
    User.findById({_id: id}, (err: Error, user: IDatabaseUser) => {
        cb(err, user)
    })
})

app.use('/api', routes)

app.use((err: any, req: any, res: any, next: any) => {
  if (!err.status) err.status = 500;

  return res
    .status(err.status)
    .json({ error: err.toString() });
});

const PORT = process.env.PORT || process.env.BACKEND_DEV_PORT

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})