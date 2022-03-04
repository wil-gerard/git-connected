import { Response, NextFunction } from 'express';
import { IReqAuth } from '../config/interface';
import User from '../models/User';

declare module 'express-session' {
  interface SessionData {
    passport: {
      user: string;
    };
  }
}

const auth = async (req: IReqAuth, res: Response, next: NextFunction) => {
  try {
    if (req.isAuthenticated() && req.user) {
      next();
    } else if (req.isAuthenticated() && !req.user) {
      const user = await User.findById(req.session.passport.user);
      req.user = user;
      next();
    } else if (!req.isAuthenticated()) {
      return res.status(401).send('Invalid Authentication');
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

export default auth;
