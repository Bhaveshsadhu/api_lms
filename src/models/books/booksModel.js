import BookSchema from './booksSchema.js';

// CREATE new book
export const createNewBook = (bookObj) => {
    return BookSchema(bookObj).save();
};

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
