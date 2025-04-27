import sessionSchema from "./sessionSchema.js";

// create New User
export const createNewSession = sessionObj => {
    return sessionSchema(sessionObj).save();
}