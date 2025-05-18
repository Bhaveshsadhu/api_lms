import UserSchema from "./UserSchema.js";

// create New User
export const RegisterNewUser = userObj => {
    return UserSchema(userObj).save();
}
// FIND USER BY EMAIL
export const findUserByEmail = async (email) => {
    return await UserSchema.findOne({ email: email.toLowerCase().trim() });
};

// update user
export const updateUser = (filter, update) => {
    return UserSchema.findOneAndUpdate(filter, update, { new: true })
}