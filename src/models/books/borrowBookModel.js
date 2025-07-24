// models/borrow/borrowBookModel.js

import BorrowedBook from './borrowBookSchema.js';

// Create a new borrow record
export const borrowBooks = async (borrowData) => {
    return await BorrowedBook.create(borrowData);
};

// Get all borrowed books (optionally by user)
export const getAllBorrowedBooks = async (userId = null) => {
    if (userId) {
        return await BorrowedBook.find({ userId }).populate("userId").sort({ borrowDate: -1 });
    }
    return await BorrowedBook.find().populate("userId").sort({ borrowDate: -1 });
};

// Mark book as returned
export const markAsReturned = async (borrowId) => {
    return await BorrowedBook.findByIdAndUpdate(
        borrowId,
        { returned: true, returnedDate: new Date() },
        { new: true }
    );
};

// Delete a borrow record
export const deleteBorrowRecord = async (borrowId) => {
    return await BorrowedBook.findByIdAndDelete(borrowId);
};
