import express from 'express';
import {
    createBookController,
    getAllBooksController,
    getBookByIdController,
    updateBookByIdController,
    deleteBookByIdController,
    searchBooksController
} from '../controller/booksController.js';
import { userMiddleware } from '../middleware/userMiddleware.js';

const router = express.Router();

// CREATE a new book
router.post('/', createBookController);

// GET all books
router.get('/', getAllBooksController);

// GET book by ID
router.get('/:id', getBookByIdController);

// UPDATE book by ID
router.put('/:id', updateBookByIdController);

// DELETE book by ID
router.delete('/:id', deleteBookByIdController);

// SEARCH books
router.get('/search/:keyword', searchBooksController);

export default router;
