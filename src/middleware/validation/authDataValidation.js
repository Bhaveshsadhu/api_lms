import { DataValidation } from "./dataValidation.js"
import {
    EMAIL_REQ,
    FNAME_REQ,
    LNAME_REQ,
    PASSWORD_REQ,
    PHONE_REQ,
    SESSIONID_REQ,
    TOKEN_REQ
} from "./joiConst.js"


export const NewUserDataValidation = (req, res, next) => {
    const obj = {
        fname: FNAME_REQ,
        lname: LNAME_REQ,
        email: EMAIL_REQ,
        phone: PHONE_REQ,
        password: PASSWORD_REQ,

    }
    // console.log(obj)
    DataValidation({ req, res, next, obj })
}

export const ResetPasswordDataValidation = (req, res, next) => {
    const obj = {
        token: TOKEN_REQ,
        sessionId: SESSIONID_REQ,
        password: PASSWORD_REQ, // Basic Joi validation, strength check will be in controller
    }
    DataValidation({ req, res, next, obj })
}

export const RequestPasswordResetDataValidation = (req, res, next) => {
    const obj = {
        email: EMAIL_REQ,
    }
    DataValidation({ req, res, next, obj })
}
export const VerifyUserFromEmailDataValidation = (req, res, next) => {

    const obj = {
        token: TOKEN_REQ,
        sessionId: SESSIONID_REQ,
    }
    DataValidation({ req, res, next, obj })
}

export const LoginDataValidation = (req, res, next) => {

    const obj = {
        email: EMAIL_REQ,
        password: PASSWORD_REQ,
    }
    DataValidation({ req, res, next, obj })
}