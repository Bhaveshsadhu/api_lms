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
            // console.log("Files:", req.files);
            const files = req.files.map(file => `/uploads/${file.filename}`);
            const bookData = req.body;

            bookData.addedBy = user._id
            bookData.lastUpdatedBy = user._id
            bookData.uploadedFiles = files
            bookData.coverImage = files[0]

            // console.log(bookData)


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
// export const updateBookByIdController = async (req, res, next) => {
//     try {
//         const user = req.userInfo
//         if (user?._id && user.role === "admin") {
//             const bookData = req.body;
//             const files = req.files.map(file => `/uploads/${file.filename}`);
//             bookData.uploadedFiles = files
//             bookData.coverImage = files[0]
//             const { _id } = bookData
//             console.log(bookData)
//             const updatedBook = await updateBookById(_id, bookData);
//             if (!updatedBook) {
//                 return res.status(404).json({ status: 'error', message: 'Book not found to update' });
//             }
//             res.json({ status: 'success', message: 'Book updated successfully', book: updatedBook });
//         }

//     } catch (error) {
//         next(error);
//     }
// };
// controllers/bookController.js
// import Book from '../models/bookModel.js';   // adjust path if different

export const updateBookByIdController = async (req, res, next) => {
    try {
        const user = req.userInfo;

        /* ────────────────────────────────
           1.  Only admins can update
        ────────────────────────────────── */
        if (!user?._id || user.role !== 'admin') {
            return res
                .status(403)
                .json({ status: 'error', message: 'Unauthorised access' });
        }

        /* ────────────────────────────────
           2.  Destructure body fields
        ────────────────────────────────── */
        const {
            _id,                     // required
            title,
            author,
            isbn,
            category,
            description,
            quantity,
            available,
            ExpectedDateAvailable,
            coverImage,              // may be a NEW coverImage path
            existingImages           // ← sent as string or array from frontend
        } = req.body;

        /* ────────────────────────────────
           3.  Load current book document
        ────────────────────────────────── */
        const book = await getBookById(_id);
        if (!book) {
            return res
                .status(404)
                .json({ status: 'error', message: 'Book not found' });
        }

        /* ────────────────────────────────
           4.  Prepare image arrays
        ────────────────────────────────── */
        /* Incoming images already in DB */
        let oldImages = existingImages || [];
        if (typeof oldImages === 'string') oldImages = [oldImages];

        /* New images just uploaded via Multer */
        const newImages = req.files
            ? req.files.map((file) => `/uploads/${file.filename}`)
            : [];

        const mergedImages = [...oldImages, ...newImages];

        /* ────────────────────────────────
           5.  Update document fields
        ────────────────────────────────── */
        book.title = title ?? book.title;
        book.author = author ?? book.author;
        book.isbn = isbn ?? book.isbn;
        book.category = category ?? book.category;
        book.description = description ?? book.description;
        book.quantity = quantity ?? book.quantity;
        book.available = available ?? book.available;
        book.ExpectedDateAvailable = ExpectedDateAvailable ?? book.ExpectedDateAvailable;

        /* Images */
        book.uploadedFiles = mergedImages;
        book.coverImage = coverImage || book.coverImage;  // keep old if none supplied

        /* ────────────────────────────────
           6.  Save & respond
        ────────────────────────────────── */
        // const saved = await book.save();
        const updatedBook = await updateBookById(_id, book);
        if (!updatedBook) {
            return res.status(404).json({ status: 'error', message: 'Book not found to update' });
        }
        res.json({ status: 'success', message: 'Book updated successfully', book: updatedBook });


        // return res.json({
        //     status: 'success',
        //     message: 'Book updated successfully',
        //     book: saved,
        // });
    } catch (err) {
        return next(err);
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
