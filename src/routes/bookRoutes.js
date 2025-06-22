import express from 'express';
import {
    createBookController,
    getAllBooksController,
    getBookByIdController,
    updateBookByIdController,
    deleteBookByIdController,
    searchBooksController
} from '../controller/booksController.js';
import { insertBookDataValidation } from '../middleware/validation/bookDataValidation.js';
import { userMiddleware } from '../middleware/userMiddleware.js';
import { upload } from '../middleware/multar/multerMiddleware.js';


const router = express.Router();

// CREATE a new book
router.post('/', userMiddleware, insertBookDataValidation, upload.array("uploadedFiles", 10), createBookController);

// GET all books
router.get('/', userMiddleware, getAllBooksController);

// GET book by ID
router.get('/:id', getBookByIdController);

// UPDATE book by ID
router.put('/', userMiddleware, upload.array("uploadedFiles", 10), updateBookByIdController);

// DELETE book by ID
router.delete('/:id', deleteBookByIdController);

// SEARCH books
router.get('/search/:keyword', searchBooksController);

export default router;
