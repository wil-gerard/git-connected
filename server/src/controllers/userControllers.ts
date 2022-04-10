import User from '../models/User';
import { Request, Response, NextFunction } from 'express';
import { IReqAuth, IUserUpdateForm } from '../config/interface';
import Twitter from 'twit';
import { Octokit } from '@octokit/core';

const defaultOptions = {
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
  const options = defaultOptions;

  await User.findByIdAndUpdate(id, update, options, (err, user) => {
    if (!err) {
      res.status(200).send(user);
    }
  })
    .clone()
    .catch((err) => {
      err.status = 422;
      next(err);
    });
};

export const removeConnection = async (
  req: IReqAuth,
  res: Response,
  next: NextFunction
) => {
  const { platformName } = req.body;
  const id = req.user._id;
  const userUpdateProps: any = {};
  userUpdateProps[`${platformName}Connected`] = false;
  userUpdateProps[`${platformName}Token`] = '';
  userUpdateProps[`${platformName}`] = {};
  if (platformName === 'twitter') {
    userUpdateProps.twitterTokenSecret = '';
  }

  const options = defaultOptions;

  await User.findByIdAndUpdate(id, userUpdateProps, options, (err, doc) => {
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

export const userFollowAll = async (
  req: IReqAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const targetId = req.query['targetId'] as string;
    const sourceId = req.user._id;
    const twitterUsername = req.query['twitterUsername'] as string;
    const gitHubUsername = req.query['gitHubUsername'] as string;

    const twitter = new Twitter({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token: req.user.twitterToken,
      access_token_secret: req.user.twitterTokenSecret,
    });

    const octokit = new Octokit({
      auth: req.user.gitHubToken,
    });

    // Responses will be used for error handling
    const twitterFollowResponse = await twitter.post('friendships/create', {
      screen_name: twitterUsername,
    });

    const gitHubFollowResponse = await octokit.request(
      `PUT /user/following/${gitHubUsername}`,
      {
        username: gitHubUsername,
      }
    );

    const options = defaultOptions;
    let allFollowedIds: any = {};
    if (req.user.alreadyFollowingTheseIds) {
      allFollowedIds = {
        ...req.user.alreadyFollowingTheseIds,
      };
    }
    allFollowedIds[targetId] = true;

    const userUpdateProps = {
      alreadyFollowingTheseIds: allFollowedIds,
    };

    await User.findByIdAndUpdate(
      sourceId,
      userUpdateProps,
      options,
      (err, user) => {
        if (!err) {
          res.status(200).send(user);
        }
      }
    )
      .clone()
      .catch((err) => {
        err.status = 400;
        next(err);
      });
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

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
