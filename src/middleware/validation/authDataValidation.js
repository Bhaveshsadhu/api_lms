import { DataValidation } from "./dataValidation.js"

export const NewUserDataValidation = (req, res, next) => {
    const obj = {
        fname: Joi.string().min(3).max(30).required(),
        lname: Joi.string().min(3).max(30).required(),
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
        phone: Joi.number(),
        password: Joi.string().required(),

    }
    DataValidation({ req, res, next, obj })
}
export const VerifyUserFromEmailDataValidation = (req, res, next) => {

    const obj = {
        token: Joi.string().min(3).max(50).required(),
        sessionId: Joi.string().min(3).max(50).required(),
    }
    DataValidation({ req, res, next, obj })
}