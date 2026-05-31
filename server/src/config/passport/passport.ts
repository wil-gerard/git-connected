import passport from 'passport';
import User from '../../models/User';
import { discordStrategy } from './strategies/discord';
import { gitHubStrategy } from './strategies/github';
import { twitterStrategy } from './strategies/twitter';
import { DatabaseUser } from '../interface';

passport.use(discordStrategy);
passport.use(gitHubStrategy);
if (twitterStrategy) {
  passport.use(twitterStrategy);
}

passport.serializeUser((user: DatabaseUser, cb) => {
  cb(null, user._id);
});

passport.deserializeUser(async (id: string, cb) => {
  try {
    const user = await User.findById({ _id: id });
    cb(null, user);
  } catch (err) {
    cb(err, null);
  }
});
