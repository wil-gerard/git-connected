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
  try {
    const { ...userUpdateProps }: UserUpdateForm = req.body;
    const id = req.user._id;
    const user = await User.findByIdAndUpdate(id, userUpdateProps, defaultOptions);
    res.status(200).send(user);
  } catch (err: any) {
    err.status = 422;
    next(err);
  }
};

export const removeConnection = async (
  req: ReqAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const { platformName } = req.body;
    const id = req.user._id;
    const userUpdateProps: any = {};
    userUpdateProps[`${platformName}Connected`] = false;
    userUpdateProps[`${platformName}Token`] = '';
    userUpdateProps[`${platformName}`] = {};
    if (platformName === 'twitter') {
      userUpdateProps.twitterTokenSecret = '';
    }

    const doc = await User.findByIdAndUpdate(id, userUpdateProps, defaultOptions);
    res.status(200).send(doc);
  } catch (err: any) {
    err.status = 422;
    next(err);
  }
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

    let allFollowedIds: any = {};
    if (req.user.alreadyFollowingTheseIds) {
      allFollowedIds = { ...req.user.alreadyFollowingTheseIds };
    }
    allFollowedIds[targetId] = true;

    const user = await User.findByIdAndUpdate(
      sourceId,
      { alreadyFollowingTheseIds: allFollowedIds },
      defaultOptions
    );
    res.status(200).send(user);
  } catch (err: any) {
    err.status = 400;
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
    return await User.find(
      { gitHubConnected: true },
      {
        discordToken: 0,
        gitHubToken: 0,
        twitterToken: 0,
        twitterTokenSecret: 0,
      }
    );
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
