import Joi from 'joi'


// USER REGISTRATION FORM CONSTS
export const FNAME = Joi.string().min(3).max(30)
export const FNAME_REQ = FNAME.required()

export const LNAME = Joi.string().min(3).max(30)
export const LNAME_REQ = LNAME.required()

export const EMAIL = Joi.string().email({ minDomainSegments: 2 })
export const EMAIL_REQ = EMAIL.required()

export const PHONE = Joi.number()
export const PHONE_REQ = PHONE.required()

export const PASSWORD = Joi.string().min(8).max(30)
export const PASSWORD_REQ = PASSWORD.required()

export const TOKEN = Joi.string().min(3).max(50)
export const TOKEN_REQ = TOKEN.required()

// VERIFICATION FROM EMAIL CONSTS

export const SESSIONID = Joi.string().min(3).max(50)
export const SESSIONID_REQ = SESSIONID.required()


