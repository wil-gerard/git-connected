import User from '../models/User';
import { Request, Response, NextFunction } from 'express';
import { IReqAuth, IUserUpdateForm } from '../config/interface';
import Twitter from 'twit';

const defaultOptions =  {
  new: true,
  runValidators: true,
  context: 'query',
};

export const userUpdate = async (
  req: IReqAuth,
  res: Response,
  next: NextFunction
) => {
  const { ...userUpdateProps }: IUserUpdateForm = req.body;
  const id = req.user._id;
  const update = { ...userUpdateProps };
  const options = defaultOptions

  await User.findByIdAndUpdate(id, update, options, (err, doc) => {
    if (!err) {
      res.status(200).send(doc);
    }
  })
    .clone()
    .catch((err) => {
      err.status = 422;
      next(err);
    });
};

export const removeConnection = async ( req: IReqAuth, res: Response, next: NextFunction) => { 
  const { platformName } = req.body;
  const id = req.user._id;
  const userUpdateProps: any = {};
  userUpdateProps[`${platformName}Connected`] = false;
  userUpdateProps[`${platformName}Token`] = "";
  userUpdateProps[`${platformName}`] = {};
  if (platformName === "twitter") { userUpdateProps.twitterTokenSecret = ""; };

  const options = defaultOptions;

  await User.findByIdAndUpdate(id, userUpdateProps, options, (err, doc) => { 
    if (!err) { 
      res.status(200).send(doc);
    }
  }).clone().catch( err => { 
    err.status = 422;
    next(err);
  })

}

export const userFollowAll = async (
  req: IReqAuth,
  res: Response,
  next: NextFunction
) => {
  try {

    let username = req.query['username'] as string;
    const id: string = req.query['id'];

    const twitter = new Twitter({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token: req.user.twitterToken,
      access_token_secret: req.user.twitterTokenSecret,
    });

    const doTwitterFollow = await twitter.post('friendships/create', {
      screen_name: username,
    });

    const options = defaultOptions;
    

    res.json(doTwitterFollow.resp.statusCode);
  } catch (err) {
    next(err);
  }
};

export const getUser = async (
  req: IReqAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).send(req.user);
  } catch (err) {
    next(err);
  }
};


export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find(
      { gitHubConnected: true, twitterConnected: true },
      {
        discordToken: 0,
        gitHubToken: 0,
        twitterToken: 0,
        twitterTokenSecret: 0,
      }
    ).clone();
    res.status(200).send([...users]);
  } catch (err) {
    console.error(err);
    next(err);
  }
};


