import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import { Request, Response } from 'express'
import Twitter from 'twit'
import User from '../User'
import { IDatabaseUser, IReqAuth, IUser } from '../interface'

const router = express.Router()

router.post('/user/twitterfollow', async (req: IReqAuth, res) => {
    try {
        console.log(req.isAuthenticated()) 
        console.log(req.user)
        console.log(`User is about to follow'${req.query['username']}'`)

        let username = req.query['username'] as string

        const twitter = new Twitter({
            consumer_key: process.env.TWITTER_CONSUMER_KEY,
            consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
            access_token: req.user.twitter.token,
            access_token_secret: req.user.twitter.tokenSecret,
        });
    
        twitter.post('friendships/create', { screen_name: username }, function(err, data, response){
            if (err){
                console.log(err)
            } else {
                
            }
        })

    } catch (e) {
        console.log(e)
    }
});

router.get('/user/getuser', (req, res) => {
    res.send(req.user)
})

router.get('/user/getallusers', async (req, res) => {
    await User.find({ gitHubConnected: true, twitterConnected: true }, (err: Error, data: IUser[]) => {
        if (err) throw err;
        const filteredUsers: IUser[] = [];
        data.forEach((user: IUser) => {
            const userInformation = {
                gitHubConnected: user.gitHubConnected,
                twitterConnected: user.twitterConnected,
                discord: {
                    id: user.discord.id,
                    username: user.discord.username,
                    avatar: user.discord.avatar,
                    discriminator: user.discord.discriminator,
                    banner: user.discord.banner,
                    banner_color: user.discord.banner_color
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
                    username: user.twitter.username,
                }
            }
            filteredUsers.push(userInformation);
        })
        res.send(filteredUsers);
    }).clone().catch(function (err: Error) { console.log(err) });
})

export default router