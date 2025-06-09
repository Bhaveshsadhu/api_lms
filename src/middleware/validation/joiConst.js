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

export const QUANTITY = Joi.number().min(1).max(50)
export const QUANTITY_REQ = Joi.number().min(1).max(50)

export const AVAILABLE = Joi.number().min(1).max(50)
export const AVAILABLE_REQ = Joi.number().min(1).max(50)



// {
//   "title": "Eloquent JavaScript",
//   "author": "Marijn Haverbeke",
//   "isbn": "9781593279507",
//   "category": "Programming",
//   "description": "A Modern Introduction to Programming covering JavaScript fundamentals, advanced topics, and real-world projects.",
//   "quantity": 10,
//   "available": 10,
//   "coverImage": "eloquent-js.jpg",
//   "addedBy": "660e2a54bb12a2d52c3f39a2"
// }

