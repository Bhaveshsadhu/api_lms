import { getSession } from "../models/sesson/sessionModel.js"
import { findOneUser, findUserByEmail } from "../models/user/UserModel.js"
import { createAccessJWT, verifyAccessJWT, verifyRefreshJWT } from "../utils/jwt.js"

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
                // console.log(ifFound)
                if (ifFound?._id) {
                    // get user by email
                    const user = await findUserByEmail(decoded.email)
                    if (user?._id && user?.status === "active") {
                        // return the user
                        req.userInfo = user
                        return next()
                    }
                }
                else {
                    res.json({
                        status: "error",
                        message: "jwt expired"
                    })
                }
            }
            else {
                decoded === "jwt expired" ? res.json({
                    status: "error",
                    message: "jwt expired",
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
export const renewAccessJwtMiddleware = async (req, res, next) => {
    try {
        // get refreshJWT
        const { authorization } = req.headers
        // console.log(authorization)

        if (authorization) {
            const refreshJWT = authorization.split(" ")[1]

            //  verify refreshJWT
            const decoded = verifyRefreshJWT(refreshJWT)
            // console.log(decoded)

            if (decoded.email) {
                // check its exits in User table
                const user = await findOneUser({ email: decoded.email, refreshJWT: refreshJWT })
                // console.log(user)
                if (user?._id && user?.status === "active") {
                    // create new accessJWT
                    const payload = await createAccessJWT(decoded.email)
                    // console.log(payload)
                    res.json({
                        status: "success",
                        message: "here is your new accessJWT",
                        payload
                    })
                }
            }
            else {
                decoded === "jwt expired" ? res.json({
                    status: "error",
                    message: "refreshJWT expired"
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