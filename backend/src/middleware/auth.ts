import { Response, NextFunction } from 'express'
import { IReqAuth } from '../interface'
import User from '../models/User'

declare module 'express-session' {
    interface SessionData {
        passport: {
            user: string
        }
    }
}

const auth = async (req: IReqAuth, res: Response, next: NextFunction) => {
    try {
        if (req.isAuthenticated() && req.user) {
            console.log('already a req.user')
            next()
        } else if(req.isAuthenticated() && !req.user){
            const user = await User.findById(req.session.passport.user)
            req.user = user
            next()
        } else {
            console.log('user is not authenticated')
        }
    } catch (err: any) {
        return res.status(500).json({ msg: err.message })
    }
}

export default auth