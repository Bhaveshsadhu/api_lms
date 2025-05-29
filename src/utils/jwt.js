import jwt from 'jsonwebtoken'
import { createNewSession } from '../models/sesson/sessionModel.js';
import { updateUser } from '../models/user/UserModel.js';
export const createAccessJWT = async (email) => {
    // create
    const token = jwt.sign({ email }, process.env.ACCESSJWT_SCERET, { expiresIn: "15m" });
    // store in session table
    const obj = {
        token,
        association: email,
        expire: new Date(Date.now() + 1000 * 60 * 15), //15m
    }

    const newSession = await createNewSession(obj)
    // console.log(newSession)

    return newSession?._id ? token : null;
}

// verify accessJWT
export const verifyAccessJWT = token => {
    try {
        return jwt.verify(token, process.env.ACCESSJWT_SCERET,)
    } catch (error) {
        return error.message
    }
}
// verify refreshJWT
export const verifyRefreshJWT = token => {
    try {
        return jwt.verify(token, process.env.REFRESHJWT_SCERET,)
    } catch (error) {
        return error.message
    }
}

export const createRefreshJWT = async (email) => {
    // create
    const refreshJWT = jwt.sign({ email }, process.env.REFRESHJWT_SCERET, { expiresIn: "30d" });//30 days
    // update in user table
    const user = await updateUser({ email }, { refreshJWT })
    // console.log("REFRESH JWT TOKEN USER ", user)
    return user?._id ? refreshJWT : null;

}

export const getJwts = async (email) => {
    return {
        accessJWT: await createAccessJWT(email),
        refreshJWT: await createRefreshJWT(email),
    }
}