import express from 'express';
import { registerUser, loginUser } from '../controllers/userController';
import { addGame } from '../controllers/gameController';
import { authAddGame } from '../middleware/authMiddleware';


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/addGame', authAddGame , addGame)


export default router;