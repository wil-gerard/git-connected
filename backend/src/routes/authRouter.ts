import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import auth from '../middleware/auth';
import { Request, Response } from 'express';
import { IReqAuth } from '../interface';
import passport from 'passport';

const router = express.Router();

// --- Discord ---
router.get('/auth/discord', passport.authenticate('discord'));

router.get(
  '/auth/discord/callback',
  passport.authenticate('discord', {
    failureRedirect: '/',
    session: true,
  }),
  function (req: Request, res: Response) {
    res.redirect(`${process.env.FRONTEND_DEV_URL}/profile`);
  }
);

// --- Twitter ---
router.get('/auth/twitter', auth, passport.authorize('twitter'));

router.get(
  '/auth/twitter/callback',
  auth,
  passport.authorize('twitter', {
    failureRedirect: '/',
    session: true,
  }),
  function (req: Request, res: Response) {
    res.redirect(`${process.env.FRONTEND_DEV_URL}/profile`);
  }
);

// --- GitHub ---
router.get(
  '/auth/github',
  auth,
  passport.authorize('github', { scope: ['read:user'] })
);

router.get(
  '/auth/github/callback',
  auth,
  passport.authorize('github', {
    failureRedirect: '/',
    session: true,
  }),
  function (req: Request, res: Response) {
    res.redirect(`${process.env.FRONTEND_DEV_URL}/profile`);
  }
);

router.delete('/auth/logout', auth, (req: IReqAuth, res: Response) => {
  if (req.user) {
    req.logout();
    res.send('Succesful Logout');
  }
});

export default router;
