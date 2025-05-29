import express from 'express'
import { addNewUser, loginUser, logoutUser, verfiyUserFromEmail } from '../controller/authController.js';
import { LoginDataValidation, NewUserDataValidation, VerifyUserFromEmailDataValidation } from '../middleware/validation/authDataValidation.js';
import { renewAccessJwtMiddleware } from '../middleware/userMiddleware.js';

const router = express.Router();


// Register User
// router.post("/register", DataValidation, (req, res, next) => addNewUser(req, res, next))
router.post("/register", NewUserDataValidation, addNewUser)


// VERIFY USER FROM EMAIL LINK
router.post("/activate-user", VerifyUserFromEmailDataValidation, verfiyUserFromEmail)

// LOGIN USER
router.post("/login", LoginDataValidation, loginUser)

// RENEW ACCESSJWT
router.get("/renew-jwt", renewAccessJwtMiddleware)

// RENEW ACCESSJWT
router.get("/logout", logoutUser)


export default router; 