import mongoose from 'mongoose';
import BookSchema from './booksSchema.js';

// CREATE new book
export const createNewBook = (bookObj) => {
    return BookSchema(bookObj).save();
};

// ADD MULTIPLE BOOKS
export const addBooks = async (arrBooks) => {
    return await BookSchema.insertMany(arrBooks)

}

// READ all books for ADMIN
export const getAllBooksForAdmin = () => {
    return BookSchema.find();
};
// GET ALL BOOKS FOR USER
export const getAllBooksForUser = () => {
    return BookSchema.find({ status: "available" });
};


// READ book by ID
export const getBookById = (_id) => {
    return BookSchema.findById(_id);
};

// get books by Ids
export const getBooksByIds = async (bookIds) => {
    // Step 1: Validate and filter out invalid ObjectIds
    const validIds = bookIds.filter(id => mongoose.Types.ObjectId.isValid(id));
    // console.log(validIds)
    // Step 2: Fetch books using $in query
    const books = await BookSchema.find({ _id: { $in: bookIds } });
    return books;
};

// UPDATE book by ID
export const updateBookById = (_id, updateObj) => {
    return BookSchema.findByIdAndUpdate(_id, updateObj, { new: true });
};

// DELETE book by ID
export const deleteBookById = (_id) => {
    return BookSchema.findByIdAndDelete(_id);
};

// SEARCH books by keyword (title, author, or genre)
export const searchBooks = (keyword) => {
    const regex = new RegExp(keyword, 'i'); // case-insensitive
    return BookSchema.find({
        $or: [
            { title: { $regex: regex } },
            { author: { $regex: regex } },
            { genre: { $regex: regex } }
        ]
    });
};
// Update book Quantity based on borrowed quantity
export const updateBookQuantities = async (books) => {
    await Promise.all(
        books.map(async (book) => {
            await BookSchema.findByIdAndUpdate(
                book._id,
                { $inc: { availableQuantity: -book.quantity, borrowedQuantity: book.quantity } },
                { new: true }
            );
        })
    );
};
