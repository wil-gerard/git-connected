import passport from 'passport';
import User from '../../models/User';
import { discordStrategy } from './strategies/discord';
import { gitHubStrategy } from './strategies/github';
import { twitterStrategy } from './strategies/twitter';
import { IDatabaseUser } from '../interface';

passport.use(discordStrategy);
passport.use(gitHubStrategy);
passport.use(twitterStrategy);

passport.serializeUser((user: IDatabaseUser, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id: string, cb) => {
  User.findById({ _id: id }, (err: Error, user: IDatabaseUser) => {
    cb(err, user);
  });
});