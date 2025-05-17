import express from 'express'
import { addNewUser, verfiyUserFromEmail } from '../controller/authController.js';
import { NewUserDataValidation, VerifyUserFromEmailDataValidation } from '../middleware/validation/authDataValidation.js';

const router = express.Router();


// Register User
// router.post("/register", DataValidation, (req, res, next) => addNewUser(req, res, next))
router.post("/register", NewUserDataValidation, addNewUser)


// VERIFY USER FROM EMAIL LINK
router.post("/activate-user", VerifyUserFromEmailDataValidation, verfiyUserFromEmail)


export default router; 