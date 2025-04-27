import express from 'express'
import { addNewUser } from '../controller/authController.js';

const router = express.Router();


// Register User
router.post("/register", (req, res, next) => addNewUser(req, res, next))

export default router; 