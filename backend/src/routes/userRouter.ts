import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import { Request, Response } from 'express'
import Twitter from 'twit'
import User from '../models/User'
import { IDatabaseUser, IReqAuth, IUser } from '../interface'
import auth from '../middleware/auth'

const router = express.Router()

router.put('/user/update', auth, async (req: IReqAuth, res) => {
    try {
        const user = await User.findOne({ user: req.user._id });

        user.customBio = req.body.bio;
        user.customLocation = req.body.location;
        user.customName = req.body.name;
        user.tags.lookingForCoffeeChats = req.body.lookingForCoffeeChats;
        user.tags.openToCoffeeChats = req.body.openToCoffeeChats;

        await user.save();

        res.json(user)
        console.log('success!!')

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.post('/user/twitterfollow', auth, async (req: IReqAuth, res) => {
    try {
        console.log(`User is about to follow '${req.query['username']}'`)

        let username = req.query['username'] as string

        const twitter = new Twitter({
            consumer_key: process.env.TWITTER_CONSUMER_KEY,
            consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
            access_token: req.user.twitter.token,
            access_token_secret: req.user.twitter.tokenSecret,
        });

        const doTwitterFollow = await twitter.post('friendships/create', { screen_name: username })

        res.json(doTwitterFollow.resp.statusCode)

    } catch (e) {
        console.log(e)
    }
});

router.get('/user/getuser', auth, async (req, res) => {
    console.log(req.user)
    res.send(req.user)
})

router.get('/user/getall', async (req, res) => {
    await User.find({ gitHubConnected: true, twitterConnected: true }, (err: Error, data: IDatabaseUser[]) => {
        if (err) throw err;
        const filteredUsers: IUser[] = [];
        data.forEach((user: IUser) => {
            const userInformation = {
                twitterConnected: user.twitterConnected,
                gitHubConnected: user.gitHubConnected,
                customBio: user.customBio,
                customLocation: user.customLocation,
                customName: user.customName,
                tags: {
                    lookingForCoffeeChats: user.tags.lookingForCoffeeChats,
                    openToCoffeeChats: user.tags.openToCoffeeChats
                },
                discord: {
                    id: user.discord.id,
                    username: user.discord.username,
                    avatar: user.discord.avatar,
                    discriminator: user.discord.discriminator,
                    banner: user.discord.banner,
                    banner_color: user.discord.banner_color,
                },
                github: {
                    id: user.github.id,
                    json: {
                        login: user.github.json.login,
                        avatar_url: user.github.json.avatar_url,
                        html_url: user.github.json.html_url,
                        followers_url: user.github.json.followers_url,
                        following_url: user.github.json.following_url,
                        name: user.github.json.name,
                        company: user.github.json.company,
                        hireable: user.github.json.hireable,
                        blog: user.github.json.blog,
                        location: user.github.json.location,
                        bio: user.github.json.bio,
                        twitter_username: user.github.json.twitter_username,
                        followers: user.github.json.followers,
                        following: user.github.json.following,
                    }
                },
                twitter: {
                    id: user.twitter.id,
                    username: user.twitter.username
                }
            }
            filteredUsers.push(userInformation);
        })
        res.send([...filteredUsers]);
    }).clone().catch(function (err: Error) { console.log(err) });
})

export default router