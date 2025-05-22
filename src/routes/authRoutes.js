import express from 'express'
import { addNewUser, loginUser, verfiyUserFromEmail, requestPasswordReset, resetPassword } from '../controller/authController.js';
import { LoginDataValidation, NewUserDataValidation, VerifyUserFromEmailDataValidation, RequestPasswordResetDataValidation, ResetPasswordDataValidation } from '../middleware/validation/authDataValidation.js';

const router = express.Router();


// Register User
// router.post("/register", DataValidation, (req, res, next) => addNewUser(req, res, next))
router.post("/register", NewUserDataValidation, addNewUser)


// VERIFY USER FROM EMAIL LINK
router.post("/activate-user", VerifyUserFromEmailDataValidation, verfiyUserFromEmail)

// LOGIN USER
router.post("/login", LoginDataValidation, loginUser)

// REQUEST PASSWORD RESET
router.post("/request-password-reset", RequestPasswordResetDataValidation, requestPasswordReset);

// RESET PASSWORD
router.post("/reset-password", ResetPasswordDataValidation, resetPassword);


export default router; 