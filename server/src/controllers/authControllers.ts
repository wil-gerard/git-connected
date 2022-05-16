import { Response, NextFunction } from 'express';
import { ReqAuth } from '../config/interface';

export const logout = async (
  req: ReqAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user) {
      req.logout();
      res.send({ message: 'Logout succesful' });
    } else {
      res.send({ message: 'No user to log out' });
    }
  } catch (err) {
    next(err);
  }
};
