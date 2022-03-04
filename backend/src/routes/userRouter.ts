import dotenv from "dotenv";
dotenv.config();

import { Response } from "express";
import express from "express";
import Twitter from "twit";
import User from "../models/User";
import { IDatabaseUser, IReqAuth, IUser, IUserUpdateForm } from "../interface";
import auth from "../middleware/auth";
import { nextTick } from "process";

const router = express.Router();

router.put("/user/update", auth, async (req: IReqAuth, res: Response, next) => {
  const { ...userUpdateProps }: IUserUpdateForm = req.body;
  const query = req.user._id;
  const update = { ...userUpdateProps };
  const options = {
    new: true,
    runValidators: true,
    context: "query",
    upsert: true,
  };

  await User.findByIdAndUpdate(query, update, options, (err, doc) => {
    if (!err) {
      res.status(201).send(doc);
    }
  })
    .clone()
    .catch((err) => {
      err.status = 422;
      next(err);
    });
});

router.post("/user/twitterfollow", auth, async (req: IReqAuth, res) => {
  try {
    console.log(`User is about to follow '${req.query["username"]}'`);

    let username = req.query["username"] as string;

    const twitter = new Twitter({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token: req.user.twitterToken,
      access_token_secret: req.user.twitterTokenSecret,
    });

    const doTwitterFollow = await twitter.post("friendships/create", {
      screen_name: username,
    });

    res.json(doTwitterFollow.resp.statusCode);
  } catch (e) {
    console.log(e);
  }
});

router.get("/user/getuser", auth, async (req, res) => {
  res.send(req.user);
});

router.get("/user/getall", async (req, res) => {
  await User.find(
    { gitHubConnected: true, twitterConnected: true },
    (err: Error, data: IDatabaseUser[]) => {
      if (err) throw err;
      const filteredUsers: IUser[] = [];
      data.forEach((user: IUser) => {
        const userInformation = {
          twitterConnected: user.twitterConnected,
          gitHubConnected: user.gitHubConnected,
          customBio: user.customBio,
          customLocation: user.customLocation,
          customName: user.customName,
          lookingForCoffeeChats: user.lookingForCoffeeChats,
          openToCoffeeChats: user.openToCoffeeChats,
          discord: {
            id: user.discord.id,
            username: user.discord.username,
            avatar: user.discord.avatar,
            discriminator: user.discord.discriminator,
            banner: user.discord.banner,
            banner_color: user.discord.banner_color,
          },
          gitHub: {
            id: user.gitHub.id,
            json: {
              login: user.gitHub.json.login,
              avatar_url: user.gitHub.json.avatar_url,
              html_url: user.gitHub.json.html_url,
              followers_url: user.gitHub.json.followers_url,
              following_url: user.gitHub.json.following_url,
              name: user.gitHub.json.name,
              company: user.gitHub.json.company,
              hireable: user.gitHub.json.hireable,
              blog: user.gitHub.json.blog,
              location: user.gitHub.json.location,
              bio: user.gitHub.json.bio,
              twitter_username: user.gitHub.json.twitter_username,
              followers: user.gitHub.json.followers,
              following: user.gitHub.json.following,
            },
          },
          twitter: {
            id: user.twitter.id,
            username: user.twitter.username,
          },
        };
        filteredUsers.push(userInformation);
      });
      res.send([...filteredUsers]);
    }
  )
    .clone()
    .catch(function (err: Error) {
      console.log(err);
    });
});

export default router;
