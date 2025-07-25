import { createNewSession, deleteManySession, findSessionByToken } from "../models/sesson/sessionModel.js";
import { findUserByEmail, RegisterNewUser, updateUser } from "../models/user/UserModel.js";
import { userActivationUrlEmail, userActivatedEmail } from "../services/email/emailService.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import { v4 as uuidv4 } from 'uuid';
import { isStrongPassword } from "../utils/regex.js";
import { getJwts, verifyAccessJWT } from "../utils/jwt.js";
// import { userActivationUrlEmailTemplate } from "../services/email/emailTemplate.js";


// Create New User
export const addNewUser = async (req, res, next) => {
    try {
        // to do signup process
        // receive the user data
        // encrypt the password
        const { password } = req.body;
        // console.log(isStrongPassword(password))
        // added another layer of security of password
        // if (!strongPasswordRegex.test(password)) {
        if (!isStrongPassword(password)) {
            return res.status(400).json({
                status: 'error',
                message:
                    'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.',
            });
        }
        req.body.password = hashPassword(password);
        // console.log(req.body)
        // insert useer into DB
        const result = await RegisterNewUser(req.body);
        if (result?._id) {
            //create an unique user activation link and send to their email

            const session = await createNewSession({
                token: uuidv4(),
                association: result.email
            })
            // console.log("Sesion ID:", session)

            if (session?._id) {
                const url = `${process.env.ROOT_URL}/activate-user?sessionId=${session._id}&t=${session.token}`

                // send this url to their email
                // console.log(url)

                const emailID = await userActivationUrlEmail({
                    email: result.email,
                    url,
                    name: result.fname,
                })
                // console.log("email id:", emailID)

                if (emailID) {

                    res.json({
                        status: "success",
                        message: "We have send Verification link to your email please check your email",
                        url
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

export const verfiyUserFromEmail = async (req, res, next) => {
    try {


        const { token, sessionId } = req.body;
        // console.log(req.body)


        if (token && sessionId) {
            const session = await findSessionByToken(token);


            // if session is not valid
            if (!session) {
                res.json({
                    status: "error",
                    message: "Token expired.. Please do Registration Again"
                })
                return;
            }
            else {
                // if session is valid
                if (session?._id && session._id?.toString() === sessionId) {
                    // find user by email id
                    const user = await findUserByEmail(session.association);

                    // if already User is Active
                    if (user.status === "active") {

                        res.json({
                            status: "success",
                            message: "User Already activated.."
                        })
                        return;
                    }
                    // change status to ACTIVE
                    user.status = "active";
                    // UPDATE STATUS TO ACTIVE
                    const result = await RegisterNewUser(user);
                    if (result?._id) {
                        // send ACTIVATED email to user
                        const emailID = await userActivatedEmail({
                            email: result.email,
                            name: result.fname,
                        })
                        if (emailID) {
                            res.json({
                                status: "success",
                                message: "Your Account has been Activated!!!",

                            })
                            return;
                        }
                    }
                }

            }

        }

    } catch (error) {
        next(error)
    }

};

export const loginUser = async (req, res, next) => {
    try {
        // get email from request
        const { email, password } = req.body;

        // get user by email
        const user = await findUserByEmail(email);
        // console.log(user)

        // console.log(user)

        // if user retrived successfully
        if (user?._id && user.status === 'active') {
            // check password is correct or not

            if (await comparePassword(password, user.password)) {
                // if password is correct than return accessJWT AND refreshJWTS
                const jwts = await getJwts(email)
                // console.log(jwts)
                res.json({
                    status: "success",
                    message: "Login Success!!!",
                    jwts
                })
                return
            }


        }
        res.json({
            status: "error",
            message: "UnAuthorized",

        })
    } catch (error) {
        next(error)
    }
}

export const logoutUser = async (req, res, next) => {
    try {
        const { authorization } = req.headers
        const token = authorization.split(" ")[1]
        const { email } = verifyAccessJWT(token)
        if (email) {
            const user = await findUserByEmail(email)
            if (user?._id) {
                // empty refreshJWT in user table
                const changeRefreshJWT = await updateUser({ email: email }, { refreshJWT: "" })
                // remove all session from session table
                const deleteMany = await deleteManySession({ association: email })
                res.json({
                    status: "success",
                    message: "user Logout Successfully.."
                })
            }
        }
    } catch (error) {
        next(error)
    }

}