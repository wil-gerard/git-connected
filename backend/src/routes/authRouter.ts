import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import auth from '../middleware/auth'
import { Request, Response } from 'express'
import { IReqAuth } from '../interface'
import passport from 'passport'

const router = express.Router()

// --- Discord ---
router.get('/auth/discord', (req, res, next) => {
    passport.authenticate('discord')(req, res, next)
})

router.get('/auth/discord/callback',
    passport.authenticate('discord', {
        failureRedirect: '/',
        session: true
    }),
    function (req: Request, res: Response) {
        res.redirect(`${process.env.FRONTEND_DEV_URL}/profile`)
    })

// --- Twitter ---
router.get('/auth/twitter',
    passport.authenticate('twitter'))

router.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
        failureRedirect: '/',
        session: true
    }),
    function (req: Request, res: Response) {
        res.redirect(`${process.env.FRONTEND_DEV_URL}/profile`)
    })

// --- GitHub ---
router.get('/auth/github',
    passport.authenticate('github', { scope: ['read:user'] }))

router.get('/auth/github/callback',
    passport.authenticate('github', {
        failureRedirect: '/',
        session: true
    }),
    function (req: Request, res: Response) {
        res.redirect(`${process.env.FRONTEND_DEV_URL}/profile`)
    })

router.get('/auth/logout', auth, (req: IReqAuth, res: Response) => {
    if (req.user) {
        req.logout()
        res.send('done')
    }
})

export default router