import express from 'express';
import auth from '../middleware/auth';
import { Request, Response } from 'express';
import passport from 'passport';
import { logout } from '../controllers/authControllers';

const router = express.Router();
const twitterEnabled = Boolean(
  process.env.TWITTER_CONSUMER_KEY && process.env.TWITTER_CONSUMER_SECRET
);

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
      `${process.env.FRONTEND_ORIGIN_URL}/profile?id=${userDetails._id}`
    );
  }
);

// --- Twitter ---
router.get('/auth/twitter', auth, (req: Request, res: Response, next) => {
  if (!twitterEnabled) {
    return res.status(410).json({ error: 'Twitter/X integration is deferred' });
  }

  return passport.authorize('twitter')(req, res, next);
});

router.get(
  '/auth/twitter/callback',
  auth,
  (req: Request, res: Response, next) => {
    if (!twitterEnabled) {
      return res
        .status(410)
        .json({ error: 'Twitter/X integration is deferred' });
    }

    return passport.authorize('twitter', {
      failureRedirect: process.env.FRONTEND_ORIGIN_URL,
      session: true,
    })(req, res, next);
  },
  function (req: Request, res: Response) {
    res.redirect(`${process.env.FRONTEND_ORIGIN_URL}/profile`);
  }
);

// --- GitHub ---
router.get('/auth/github', auth, passport.authorize('github'));

router.get(
  '/auth/github/callback',
  passport.authorize('github', {
    failureRedirect: process.env.FRONTEND_ORIGIN_URL,
    session: true,
  }),
  function (req: Request, res: Response) {
    res.redirect(`${process.env.FRONTEND_ORIGIN_URL}/profile`);
  }
);

router.delete('/auth/logout', auth, logout);

export default router;
