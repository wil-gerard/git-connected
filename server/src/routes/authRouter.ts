import express from 'express';
import auth from '../middleware/auth';
import { Request, Response } from 'express';
import passport from 'passport';
import { logout, sessionStatus } from '../controllers/authControllers';

const router = express.Router();
// --- Discord ---
router.get('/auth/discord', passport.authenticate('discord'));

router.get(
  '/auth/discord/callback',
  passport.authenticate('discord', {
    failureRedirect: process.env.FRONTEND_ORIGIN_URL,
    session: true,
  }),
  function (req: Request, res: Response) {
    const userDetails: any = req.user;
    res.redirect(
      `${process.env.FRONTEND_ORIGIN_URL}/profile?session=yes`
    );
  }
);

// --- Twitter ---
router.get('/auth/twitter', auth, passport.authorize('twitter'));

router.get(
  '/auth/twitter/callback',
  auth,
  passport.authorize('twitter', {
    failureRedirect: process.env.FRONTEND_ORIGIN_URL,
    session: true,
  }),
  function (req: Request, res: Response) {
    res.redirect(`${process.env.FRONTEND_ORIGIN_URL}/profile`);
  }
);

// --- GitHub ---
router.get('/auth/github', auth, passport.authorize('github'));

router.get(
  '/auth/github/callback',
  auth,
  passport.authorize('github', {
    failureRedirect: process.env.FRONTEND_ORIGIN_URL,
    session: true,
  }),
  function (req: Request, res: Response) {
    res.redirect(`${process.env.FRONTEND_ORIGIN_URL}/profile`);
  }
);

router.delete('/auth/logout', auth, logout);

router.get('/auth/session', sessionStatus);

export default router;
