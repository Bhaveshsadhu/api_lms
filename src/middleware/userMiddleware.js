import { getSession } from "../models/sesson/sessionModel.js"
import { findUserByEmail } from "../models/user/UserModel.js"
import { verifyAccessJWT } from "../utils/jwt.js"

export const userMiddleware = async (req, res, next) => {
    try {
        // get accessJWT
        const { authorization } = req.headers
        if (authorization) {
            const token = authorization.split(" ")[1]
            // console.log(token)

            // check if valid
            const decoded = verifyAccessJWT(token)
            if (decoded.email) {
                // check its exits in session table
                const ifFound = await getSession({ token })
                if (ifFound?._id) {
                    // get user by email
                    const user = await findUserByEmail(decoded.email)
                    if (user?._id && user?.status === "active") {
                        // return the user
                        req.userInfo = user

                        return next()
                    }
                }
            }
            else {
                decoded === "jwt expired" ? res.json({
                    status: "error",
                    message: "jwt expired"
                }) :
                    res.json({
                        status: "error",
                        message: "Unauthorized"
                    })
            }

        }
        else {
            res.json({
                status: "error",
                message: "Unauthorized"
            })
        }
    } catch (error) {
        next(error)
    }
}