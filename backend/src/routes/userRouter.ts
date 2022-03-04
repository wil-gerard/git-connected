import { Response } from 'express';
import express from 'express';
import Twitter from 'twit';
import User from '../models/User';
import { IReqAuth, IUserUpdateForm } from '../config/interface';
import auth from '../middleware/auth';

const router = express.Router();

router.put('/user/update', auth, async (req: IReqAuth, res: Response, next) => {
  const { ...userUpdateProps }: IUserUpdateForm = req.body;
  const query = req.user._id;
  const update = { ...userUpdateProps };
  const options = {
    new: true,
    runValidators: true,
    context: 'query',
    upsert: true,
  };

  await User.findByIdAndUpdate(query, update, options, (err, doc) => {
    if (!err) {
      res.status(200).send(doc);
    }
  })
    .clone()
    .catch((err) => {
      err.status = 422;
      next(err);
    });
});

router.post('/user/twitterfollow', auth, async (req: IReqAuth, res) => {
  try {
    console.log(`User is about to follow '${req.query['username']}'`);

    let username = req.query['username'] as string;

    const twitter = new Twitter({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token: req.user.twitterToken,
      access_token_secret: req.user.twitterTokenSecret,
    });

    const doTwitterFollow = await twitter.post('friendships/create', {
      screen_name: username,
    });

    res.json(doTwitterFollow.resp.statusCode);
  } catch (e) {
    console.log(e);
  }
});

router.get('/user/getuser', auth, async (req, res) => {
  res.send(req.user);
});

router.get('/user/getall', async (req, res, next) => {
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
});

export default router;
