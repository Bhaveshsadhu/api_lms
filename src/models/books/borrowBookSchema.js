// models/borrow/borrowBookSchema.js

import mongoose from "mongoose";

const borrowedBookSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    bookData: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Book",
                required: true
            },
            title: {
                type: String,
                required: true
            },
            coverImage: {
                type: String,
                default: ""
            },
            quantity: {
                type: Number,
                required: true,
                min: [1, "Quantity must be at least 1"]
            }
        }
    ],
    loanPeriod: {
        type: Number,
        required: true
    },
    borrowDate: {
        type: Date,
        default: Date.now
    },
    dueDate: {
        type: Date,
        required: true
    },
    returned: {
        type: Boolean,
        default: false
    },
    returnedDate: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

export default mongoose.model("BorrowedBook", borrowedBookSchema);
