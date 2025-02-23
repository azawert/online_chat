import { Router } from 'express';
import User from '../models/User.js';
import { controller as UserController } from '../controllers/UserController.js';

const router = Router()


router.post('/', UserController.sendCode)

router.post('/verification', UserController.verificationCodeCheck)

router.patch('/update-name', UserController.updateUserName)

router.get('/messages', UserController.getMessages)

export default router