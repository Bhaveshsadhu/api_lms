import {
    createNewBook,
    getAllBooks,
    getBookById,
    updateBookById,
    deleteBookById,
    searchBooks
} from '../models/books/booksModel.js';

// CREATE
export const createBookController = async (req, res, next) => {
    try {
        const newBook = await createNewBook(req.body);
        res.status(201).json({
            status: 'success',
            message: 'Book created successfully',
            book: newBook
        });
    } catch (error) {
        next(error);
    }
};

// READ ALL
export const getAllBooksController = async (req, res, next) => {
    try {
        const books = await getAllBooks();
        res.json({ status: 'success', books });
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
        const updatedBook = await updateBookById(req.params.id, req.body);
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
