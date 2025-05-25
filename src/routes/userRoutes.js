import express from 'express'
import { userProfile } from '../controller/userController.js';
import { userMiddleware } from '../middleware/userMiddleware.js';
const router = express.Router();

router.get("/profile", userMiddleware, userProfile)

export default router; 