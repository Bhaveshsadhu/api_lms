import sessionSchema from "./sessionSchema.js";

// create New User
export const createNewSession = sessionObj => {
    return sessionSchema(sessionObj).save();
}
export const findSessionByToken = async (token) => {
    return await sessionSchema.findOne({ token });
};
export const getSession = (filter) => {
    return sessionSchema.findOne(filter);
}
export const deleteSession = (filter) => {
    return sessionSchema.findOneAndDelete(filter);
}
export const deleteManySession = (filter) => {
    return sessionSchema.deleteMany(filter)
}