import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import { Request, Response } from 'express'
import Twitter from 'twit'
import User from '../models/User'
import { IDatabaseUser, IReqAuth, IUser } from '../interface'
import isLoggedIn from '../middleware/isLoggedIn'
import { profile } from 'console'

const router = express.Router()

router.put('/user/update', isLoggedIn, async(req: IReqAuth, res) => {
    try {
        const user = await User.findOne({ user: req.user._id });
        
        user.customMessage = req.body.message;
        user.customLocation = req.body.location;
        user.customName = req.body.name;
        user.tags.lookingForCoffeeChats = req.body.lookingForCoffeeChats;
        user.tags.openToCoffeeChats = req.body.openToCoffeeChats;

        await user.save();

        res.json(user)

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

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

router.get('/user/getall', async (req, res) => {
    await User.find({ gitHubConnected: true, twitterConnected: true }, (err: Error, data: IUser[])  => {
        if (err) throw err;
        res.send([...data]);
    }).clone().catch(function (err: Error) { console.log(err) });
})

export default router