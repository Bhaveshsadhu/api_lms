import {
    createNewBook,
    getBookById,
    updateBookById,
    deleteBookById,
    searchBooks,
    getAllBooksForAdmin,
    getAllBooksForUser
} from '../models/books/booksModel.js';

// CREATE
export const createBookController = async (req, res, next) => {
    try {
        const user = req.userInfo

        if (user?._id && user.role === "admin") {
            const bookData = req.body;
            bookData.addedBy = user._id
            bookData.lastUpdatedBy = user._id

            const newBook = await createNewBook(bookData);
            res.json({
                status: 'success',
                message: 'Book created successfully',
                book: newBook
            });
        }
        else {
            res.json({
                status: 'Error',
                message: 'You Are Not Authorized for this Transcation',

            });
        }

    } catch (error) {
        if (error.code === 11000 && error.keyPattern?.isbn) {
            return res.status(400).json({
                status: "error",
                message: "Duplicate ISBN. This book already exists.",
            });
        }
        next(error);
    }
};

// READ ALL
export const getAllBooksController = async (req, res, next) => {
    try {
        const user = req.userInfo;
        // IF ROLE=ADMIN THEN GET ALL BOOKS
        if (user?._id && user.role === "admin") {
            const books = await getAllBooksForAdmin();
            res.json({ status: 'success', books });
        }
        // IF ROLE=USER THEN GET ONLY AVAILABLE BOOKS
        if (user?._id && user.role === "user") {
            const books = await getAllBooksForUser();
            res.json({ status: 'success', books });
        }

    } catch (error) {
        next(error);
    }
};

// READ ONE
export const getBookByIdController = async (req, res, next) => {
    try {
        const book = await getBookById(req.params.id);
        if (!book) {
            return res.status(404).json({ status: 'error', message: 'Book not found' });
        }
        res.json({ status: 'success', book });
    } catch (error) {
        next(error);
    }
};

// UPDATE
export const updateBookByIdController = async (req, res, next) => {
    try {
        const { _id } = req.body
        const updatedBook = await updateBookById(_id, req.body);
        if (!updatedBook) {
            return res.status(404).json({ status: 'error', message: 'Book not found to update' });
        }
        res.json({ status: 'success', message: 'Book updated successfully', book: updatedBook });
    } catch (error) {
        next(error);
    }
};

// DELETE
export const deleteBookByIdController = async (req, res, next) => {
    try {
        const deletedBook = await deleteBookById(req.params.id);
        if (!deletedBook) {
            return res.status(404).json({ status: 'error', message: 'Book not found to delete' });
        }
        res.json({ status: 'success', message: 'Book deleted successfully' });
    } catch (error) {
        next(error);
    }
};

// SEARCH
export const searchBooksController = async (req, res, next) => {
    try {
        const keyword = req.params.keyword;
        const result = await searchBooks(keyword);
        res.json({ status: 'success', result });
    } catch (error) {
        next(error);
    }
};
