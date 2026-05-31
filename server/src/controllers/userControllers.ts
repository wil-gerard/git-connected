import User from '../models/User';
import { Request, Response, NextFunction } from 'express';
import { ReqAuth, UserUpdateForm } from '../config/interface';
import { Octokit } from '@octokit/core';

const defaultOptions = {
  new: true,
  runValidators: true,
  context: 'query',
};

export const userUpdate = async (
  req: ReqAuth,
  res: Response,
  next: NextFunction
) => {
  const { ...userUpdateProps }: UserUpdateForm = req.body;
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
  req: ReqAuth,
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
  req: ReqAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const targetId = req.query['targetId'] as string;
    const sourceId = req.user._id;
    const gitHubUsername = req.query['gitHubUsername'] as string;

    const octokit = new Octokit({
      auth: req.user.gitHubToken,
    });

    await octokit.request(`PUT /user/following/${gitHubUsername}`, {
      username: gitHubUsername,
    });

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
  req: ReqAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).send(req.user);
  } catch (err) {
    next(err);
  }
};

const getUsersFromDB = async (next: NextFunction) => {
  try {
    const users = await User.find(
      { gitHubConnected: true },
      {
        discordToken: 0,
        gitHubToken: 0,
        twitterToken: 0,
        twitterTokenSecret: 0,
      }
    ).clone();
    return users;
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await getUsersFromDB(next);
    res.status(200).send([...users]);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const getRandomUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await getUsersFromDB(next);
    const randomIndex = Math.floor(Math.random() * users.length);
    const randomUser = users[randomIndex];
    res.status(200).send(randomUser);
  } catch (err) {
    console.error(err);
    next(err);
  }
};
