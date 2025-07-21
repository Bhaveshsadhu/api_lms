import Joi from 'joi'
import { now } from 'mongoose'


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

// VERIFICATION FROM EMAIL CONSTS
export const TOKEN = Joi.string().min(3).max(50)
export const TOKEN_REQ = TOKEN.required()

export const SESSIONID = Joi.string().min(3).max(50)
export const SESSIONID_REQ = SESSIONID.required()


// Book Validation -- making universal Validation

export const SHORT_STR = Joi.string().min(1).max(50)
export const SHORT_STR_REQ = SHORT_STR.required()

export const LONG_STR = Joi.string().min(1).max(5000)
export const LONG_STR_REQ = LONG_STR.required()

export const ISBN_REQ = Joi.string()
    .pattern(/^\d{13}$/)
    .required()
    .messages({
        'string.pattern.base': 'ISBN must be a 13-digit number',
        'string.empty': 'ISBN is required',
    });

export const AVAILABLEQUANTITY = Joi.number().min(1).max(50)
export const AVAILABLEQUANTITY_REQ = Joi.number().min(1).max(50)

export const BORROWEDQUANTITY = Joi.number().min(1).max(50)
export const BORROWEDQUANTITY_REQ = Joi.number().min(0).max(50)

export const PUBDATE_REQ = Joi.date()
    .iso()               // must be ISO 8601 (YYYY‑MM‑DD[…])
    .max('now')          // no future dates
    .required()
    .messages({
        'date.base': `"publicationDate" should be a valid date`,
        'date.format': `"publicationDate" must be in ISO format (YYYY-MM-DD)`,
        'date.max': `"publicationDate" cannot be in the future`,
        'any.required': `"publicationDate" is required`
    })




