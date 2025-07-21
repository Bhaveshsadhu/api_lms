import { DataValidation } from "./dataValidation.js"
import { AVAILABLEQUANTITY_REQ, ISBN_REQ, LONG_STR_REQ, BORROWEDQUANTITY_REQ, SHORT_STR, SHORT_STR_REQ, PUBDATE_REQ } from "./joiConst.js"

export const insertBookDataValidation = (req, res, next) => {
    const obj = {
        title: SHORT_STR_REQ,
        author: SHORT_STR_REQ,
        isbn: ISBN_REQ,
        category: SHORT_STR,
        description: LONG_STR_REQ,
        availableQuantity: AVAILABLEQUANTITY_REQ,
        borrowedQuantity: BORROWEDQUANTITY_REQ,
        pubDate: PUBDATE_REQ,
        // coverImage: LONG_STR_REQ,
    }
    DataValidation({ req, res, next, obj })
}