import UserSchema from "./UserSchema.js";

// create New User
export const RegisterNewUser = userObj => {
    return UserSchema(userObj).save();
}