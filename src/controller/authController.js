import { createNewSession, findSessionByToken, deleteSession } from "../models/sesson/sessionModel.js";
import { findUserByEmail, RegisterNewUser, updateUser } from "../models/user/UserModel.js";
import { userActivationUrlEmail, userActivatedEmail, sendPasswordResetEmail } from "../services/email/emailService.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import { v4 as uuidv4 } from 'uuid';
import { isStrongPassword } from "../utils/regex.js";
import { getJwts } from "../utils/jwt.js";
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

        // if user retrived successfully
        if (user?._id) {
            // check password is correct or not
            if (comparePassword(password, user.password)) {
                // if password is correct than return accessJWT AND refreshJWTS
                const jwts = await getJwts(email)
                // console.log(jwts)
                res.json({
                    status: "success",
                    message: "Login Success!!!",
                    jwts
                })
            }

        }
    } catch (error) {
        next(error)
    }
}

export const requestPasswordReset = async (req, res, next) => {
    try {
        const { email } = req.body;

        const user = await findUserByEmail(email);

        if (!user) {
            // Generic message for security
            return res.json({
                status: "success", // Still success to prevent email enumeration
                message: "If an account with this email exists, a password reset link has been sent.",
            });
        }

        // User found, proceed to create session and send email
        const token = uuidv4();
        const sessionData = {
            token,
            association: user.email,
            type: 'passwordReset',
            durationInSeconds: 3600, // 1 hour
        };

        const session = await createNewSession(sessionData);

        if (session?._id) {
            const url = `${process.env.ROOT_URL}/reset-password?token=${token}&sessionId=${session._id}`;

            const emailSent = await sendPasswordResetEmail({
                email: user.email,
                url,
                name: user.fname,
            });

            if (emailSent) {
                return res.json({
                    status: "success",
                    message: "Password reset link sent to your email. Please check your inbox.",
                });
            } else {
                return res.json({
                    status: "error",
                    message: "Failed to send password reset email. Please try again.",
                });
            }
        } else {
            return res.json({
                status: "error",
                message: "Failed to create a password reset session. Please try again.",
            });
        }
    } catch (error) {
        next(error);
    }
};

export const resetPassword = async (req, res, next) => {
    try {
        const { token, sessionId, password } = req.body;

        // Validate password strength
        if (!isStrongPassword(password)) {
            return res.status(400).json({
                status: 'error',
                message: 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.',
            });
        }

        const session = await findSessionByToken(token);

        // Crucial Validation
        if (!session || session._id.toString() !== sessionId || session.type !== 'passwordReset') {
            return res.json({
                status: "error",
                message: "Invalid or expired reset token. Please try again.",
            });
        }

        // Token is valid, proceed to find user and update password
        const user = await findUserByEmail(session.association);

        if (!user) {
            // This should be rare if the session is valid, but good for robustness
            return res.status(500).json({
                status: "error",
                message: "User associated with this token not found. Please contact support.",
            });
        }

        const hashedPassword = hashPassword(password);

        const updatedUser = await updateUser({ email: session.association }, { password: hashedPassword });

        if (updatedUser?._id) {
            // Password update successful, delete the session
            await deleteSession({ token });

            return res.json({
                status: "success",
                message: "Password has been reset successfully. You can now login with your new password.",
            });
        } else {
            return res.status(500).json({
                status: "error",
                message: "Failed to update password. Please try again.",
            });
        }
    } catch (error) {
        next(error);
    }
};