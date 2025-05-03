import express from 'express'
import { addNewUser, verfiyUserFromEmail } from '../controller/authController.js';

const router = express.Router();


// Register User
router.post("/register", (req, res, next) => addNewUser(req, res, next))

// VERIFY USER FROM EMAIL LINK
router.post("/activate-user", (req, res, next) => verfiyUserFromEmail(req, res, next))


export default router; 