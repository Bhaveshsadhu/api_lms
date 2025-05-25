import { getSession } from "../models/sesson/sessionModel.js"
import { findUserByEmail } from "../models/user/UserModel.js"
import { verifyAccessJWT } from "../utils/jwt.js"

export const userProfile = async (req, res, next) => {
    try {

        const user = req.userInfo
        user.password = undefined
        user.__v = undefined
        user.refreshJWT = undefined
        console.log(user)

        res.json({
            status: "success",
            message: "User Profile",
            user
        })



    } catch (error) {
        next()
    }

}