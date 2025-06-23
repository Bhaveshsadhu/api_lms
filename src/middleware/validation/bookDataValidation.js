import { DataValidation } from "./dataValidation.js"
import { AVAILABLE_REQ, ISBN_REQ, LONG_STR_REQ, QUANTITY_REQ, SHORT_STR, SHORT_STR_REQ } from "./joiConst.js"

export const insertBookDataValidation = (req, res, next) => {
    const obj = {
        title: SHORT_STR_REQ,
        author: SHORT_STR_REQ,
        isbn: ISBN_REQ,
        category: SHORT_STR,
        description: LONG_STR_REQ,
        quantity: QUANTITY_REQ,
        available: AVAILABLE_REQ,
        // coverImage: LONG_STR_REQ,
    }
    DataValidation({ req, res, next, obj })
}