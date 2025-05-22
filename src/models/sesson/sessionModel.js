import sessionSchema from "./sessionSchema.js";

// create New Session
export const createNewSession = ({ token, association, type, durationInSeconds }) => {
    const expiresAt = new Date(Date.now() + durationInSeconds * 1000);
    const newSession = {
        token,
        association,
        type,
        expiresAt
    };
    return sessionSchema(newSession).save();
};

export const findSessionByToken = async (token) => {
    const session = await sessionSchema.findOne({ token });
    if (session && session.expiresAt < new Date()) {
        return null; // Session expired
    }
    return session;
};

export const deleteSession = (filter) => {
    return sessionSchema.deleteOne(filter);
};