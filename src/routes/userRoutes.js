import express from 'express'
import { forgetPassword, resetPassword, setNewPassword, userProfile } from '../controller/userController.js';
import { userMiddleware } from '../middleware/userMiddleware.js';
import { ForgetPasswordValidation } from '../middleware/validation/authDataValidation.js';
const router = express.Router();

router.get("/profile", userMiddleware, userProfile)

router.post("/forget-password", ForgetPasswordValidation, forgetPassword)

router.post("/reset-password", resetPassword)

router.post("/setNewPassword", userMiddleware, setNewPassword)

export default router; 