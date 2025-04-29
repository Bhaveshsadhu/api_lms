import { createNewSession } from "../models/sesson/sessionModel.js";
import { RegisterNewUser } from "../models/user/UserModel.js";
import { userActivationUrlEmail } from "../services/email/emailService.js";
import { hashPassword } from "../utils/bcrypt.js";
import { v4 as uuidv4 } from 'uuid';


// Create New User
export const addNewUser = async (req, res, next) => {
    try {
        // to do signup process
        // receive the user data
        // encrypt the password
        const { password } = req.body;
        req.body.password = hashPassword(password);
        console.log(req.body)
        // insert useer into DB
        const result = await RegisterNewUser(req.body);
        if (result?._id) {
            //create an unique user activation link and send to their email

            const session = await createNewSession({
                token: uuidv4(),
                association: result.email
            })

            if (session?._id) {
                const url = `${process.env.ROOT_URL}/activate-user?sessionId=${session._id}&t=${session.token}`

                // send this url to their email
                // console.log(url)

                const emailID = await userActivationUrlEmail({
                    email: result.email,
                    url,
                    name: result.fname,
                })
                if (emailID) {
                    res.json({
                        status: "success",
                        message: "We have send Verification link to your email please check your email"
                    })
                    return;
                }
            }

        }
        res.json({
            status: "error",
            message: "Error During User Registration"
        })
    } catch (error) {
        // if (error.message.includes("E11000 duplicate key error")) {
        //     error.message = "User Email is Already Exists. Use another email or reset the password"
        //     error.statusCode = 200
        // }
        next(error);
    }
}