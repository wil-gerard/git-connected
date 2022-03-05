import express from 'express';
import auth from '../middleware/auth';
import { userUpdate, userFollowAll, getUser, getAllUsers } from '../controllers/userControllers'

const router = express.Router();

router.put('/user/update', auth, userUpdate);

router.post('/user/followall', auth, userFollowAll);

router.get('/user/getuser', auth, getUser);

router.get('/user/getallusers', getAllUsers)

export default router;
