import { getSession } from "../models/sesson/sessionModel.js"
import { findUserByEmail, updateUser } from "../models/user/UserModel.js"
import { forgetPasswordEmail } from "../services/email/emailService.js"
import { hashPassword } from "../utils/bcrypt.js"
import { createAccessJWT, verifyAccessJWT } from "../utils/jwt.js"

export const userProfile = async (req, res, next) => {
    try {

        const user = req.userInfo
        user.password = undefined
        user.__v = undefined
        user.refreshJWT = undefined
        // console.log(user)

        res.json({
            status: "success",
            message: "User Profile",
            user
        })



    } catch (error) {
        next()
    }

}
export const forgetPassword = async (req, res, next) => {
    try {

        const { email } = req.body;
        // find user using email
        const user = await findUserByEmail(email)

        // set user to Inactive for security reason
        const result = await updateUser({ email: user.email }, { status: "InActive" })
        if (result?._id) {
            // if email is valid and user is found
            if (user?._id) {
                // generate token and add into session table and set expiry for 15 Minutes
                const token = await createAccessJWT(email)
                if (token) {

                    // send Link into email
                    const link = `${process.env.ROOT_URL}/reset-password?token=${token}`

                    const emailId = await forgetPasswordEmail({
                        email,
                        name: user.fname,
                        link
                    })
                    if (emailId) {
                        res.json({
                            status: "success",
                            message: "Your password Reset Link has been sent to Your email, Please check and Reset Password using Link Provided",
                            link
                        })
                        return
                    }

                }
            }
        }

        res.json({
            status: "error",
            message: "UnAuthorized"
        })

    } catch (error) {
        next()
    }
}

export const resetPassword = async (req, res, next) => {
    try {

        const { token } = req.body
        const decoded = verifyAccessJWT(token)
        if (decoded.email) {
            // check its exits in session table
            const ifFound = await getSession({ token })
            // console.log(ifFound)
            if (ifFound?._id) {
                // get user by email
                const user = await findUserByEmail(decoded.email)
                // udpate status to active and set password to empty for security reason
                const result = await updateUser({ email: user.email }, { password: "", status: "active" })
                // console.log(result)
                if (user?._id && user?.status === "active") {
                    // return the user

                    user.password = undefined
                    user.__v = undefined
                    user.refreshJWT = undefined
                    res.json({
                        status: "success",
                        message: "Link Verified, Now you can Reset the password",
                        user
                    })
                }
            }
            else {
                res.json({
                    status: "error",
                    // message: "jwt expired"
                    message: "Your Token is expired now, please Reset again using the same email"
                })
            }
        }
        else {
            decoded === "jwt expired" ? res.json({
                status: "error",
                message: "Your Token is expired now, please Reset again using the same email",
            }) :
                res.json({
                    status: "error",
                    message: "Unauthorized"
                })
        }

    } catch (error) {
        // console.log(error.message)
        next()
    }

}
export const setNewPassword = async (req, res, next) => {
    try {

        const user = req.userInfo
        // console.log("old Password", user.password)

        // New password from req.body
        const { password } = req.body
        // encrypt New password
        const newPassword = hashPassword(password)
        // console.log("new password", newPassword)
        if (user?._id) {
            const result = await updateUser({ email: user.email }, { password: newPassword })
            // console.log(result)
            if (result?._id) {
                result.password = undefined
                result.__v = undefined
                result.refreshJWT = undefined

                res.json({
                    status: "success",
                    message: "Password has been Updated..",
                    result
                })
            }
        }

        // console.log(result)





    } catch (error) {
        next()
    }

}