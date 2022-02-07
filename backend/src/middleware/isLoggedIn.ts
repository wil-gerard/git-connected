import { Response, NextFunction } from 'express'
import { IReqAuth } from '../interface'

const isLoggedIn = async (req: IReqAuth, res: Response, next: NextFunction) => {
    try {
        if (req.isAuthenticated()) {
            return next()
        } else {
            res.redirect('/')
        }

    } catch (err: any) {
        return res.status(500).json({ msg: err.message })
    }
}

export default isLoggedIn