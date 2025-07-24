import { dbConnect } from '../config/dbconfig.js';
import { addBooks } from '../models/books/booksModel.js';
import dotenv from 'dotenv'

dotenv.config()

export const dummyBooks = [
    {
        title: "Clean Code",
        author: "Robert C. Martin",
        isbn: "9780132350884",
        category: "Programming",
        description: "A Handbook of Agile Software Craftsmanship.",
        availableQuantity: 50,
        borrowedQuantity: 0,
        coverImage: "https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg",
        rating: 4.7,
        status: "available",
        addedBy: "64a1f3e8d7a4b5c6d7e8f901",
        lastUpdatedBy: null,
        uploadedFiles: [],
        ExpectedDateAvailable: "2025-08-10",
        pubDate: "2020-01-01",
    },
    {
        title: "Eloquent JavaScript",
        author: "Marijn Haverbeke",
        isbn: "9781593279509",
        category: "Programming",
        description: "A Modern Introduction to Programming.",
        availableQuantity: 55,
        borrowedQuantity: 0,
        coverImage: "https://covers.openlibrary.org/b/isbn/9781593279509-L.jpg",
        rating: 4.5,
        status: "available",
        addedBy: "64a1f3e8d7a4b5c6d7e8f902",
        lastUpdatedBy: null,
        uploadedFiles: [],
        ExpectedDateAvailable: "2025-08-10",
        pubDate: "2020-01-01",

    },
    {
        title: "You Don’t Know JS: Up & Going",
        author: "Kyle Simpson",
        isbn: "9781491924464",
        category: "Programming",
        description: "An exploration of the core mechanisms of the JavaScript language.",
        availableQuantity: 60,
        borrowedQuantity: 0,
        coverImage: "https://covers.openlibrary.org/b/isbn/9781491924464-L.jpg",
        rating: 4.3,
        status: "available",
        addedBy: "64a1f3e8d7a4b5c6d7e8f903",
        lastUpdatedBy: null,
        uploadedFiles: [],
        ExpectedDateAvailable: "2025-08-10",
        pubDate: "2020-01-01",

    },
    {
        title: "The Pragmatic Programmer",
        author: "Andrew Hunt & David Thomas",
        isbn: "9780201616224",
        category: "Programming",
        description: "Your Journey to Mastery.",
        availableQuantity: 70,
        borrowedQuantity: 0,
        coverImage: "https://covers.openlibrary.org/b/isbn/9780201616224-L.jpg",
        rating: 4.8,
        status: "available",
        addedBy: "64a1f3e8d7a4b5c6d7e8f904",
        lastUpdatedBy: null,
        uploadedFiles: [],
        ExpectedDateAvailable: "2025-08-10",
        pubDate: "2020-01-01",

    },
    {
        title: "Design Patterns",
        author: "Erich Gamma, et al.",
        isbn: "9780201633610",
        category: "Programming",
        description: "Elements of Reusable Object‑Oriented Software.",
        availableQuantity: 65,
        borrowedQuantity: 0,
        coverImage: "https://covers.openlibrary.org/b/isbn/9780201633610-L.jpg",
        rating: 4.6,
        status: "available",
        addedBy: "64a1f3e8d7a4b5c6d7e8f905",
        lastUpdatedBy: null,
        uploadedFiles: [],
        ExpectedDateAvailable: "2025-08-10",
        pubDate: "2020-01-01",
    },
    {
        title: "Refactoring",
        author: "Martin Fowler",
        isbn: "9780201485677",
        category: "Programming",
        description: "Improving the Design of Existing Code.",
        availableQuantity: 80,
        borrowedQuantity: 0,
        coverImage: "https://covers.openlibrary.org/b/isbn/9780201485677-L.jpg",
        rating: 4.4,
        status: "available",
        addedBy: "64a1f3e8d7a4b5c6d7e8f906",
        lastUpdatedBy: null,
        uploadedFiles: [],
        ExpectedDateAvailable: "2025-08-10",
        pubDate: "2020-01-01",
    },
    {
        title: "Introduction to Algorithms",
        author: "Cormen, Leiserson, Rivest & Stein",
        isbn: "9780262033848",
        category: "Programming",
        description: "The standard textbook on algorithms.",
        availableQuantity: 90,
        borrowedQuantity: 0,
        coverImage: "https://covers.openlibrary.org/b/isbn/9780262033848-L.jpg",
        rating: 4.2,
        status: "available",
        addedBy: "64a1f3e8d7a4b5c6d7e8f907",
        lastUpdatedBy: null,
        uploadedFiles: [],
        ExpectedDateAvailable: "2025-08-10",
        pubDate: "2020-01-01",
    },
    {
        title: "JavaScript: The Good Parts",
        author: "Douglas Crockford",
        isbn: "9780596517748",
        category: "Programming",
        description: "Unearthing the Excellence in JavaScript.",
        availableQuantity: 75,
        borrowedQuantity: 0,
        coverImage: "https://covers.openlibrary.org/b/isbn/9780596517748-L.jpg",
        rating: 4.1,
        status: "available",
        addedBy: "64a1f3e8d7a4b5c6d7e8f908",
        lastUpdatedBy: null,
        uploadedFiles: [],
        ExpectedDateAvailable: "2025-08-10",
        pubDate: "2020-01-01",
    },
    {
        title: "Programming Pearls",
        author: "Jon Bentley",
        isbn: "9780201657883",
        category: "Programming",
        description: "Essays on programming methodology.",
        availableQuantity: 68,
        borrowedQuantity: 0,
        coverImage: "https://covers.openlibrary.org/b/isbn/9780201657883-L.jpg",
        rating: 4.0,
        status: "available",
        addedBy: "64a1f3e8d7a4b5c6d7e8f909",
        lastUpdatedBy: null,
        uploadedFiles: [],
        ExpectedDateAvailable: "2025-08-10",
        pubDate: "2020-01-01",
    },
    {
        title: "Code Complete",
        author: "Steve McConnell",
        isbn: "9780735619678",
        category: "Programming",
        description: "A Practical Handbook of Software Construction.",
        availableQuantity: 85,
        borrowedQuantity: 0,
        coverImage: "https://covers.openlibrary.org/b/isbn/9780735619678-L.jpg",
        rating: 4.9,
        status: "available",
        addedBy: "64a1f3e8d7a4b5c6d7e8f910",
        lastUpdatedBy: null,
        uploadedFiles: [],
        ExpectedDateAvailable: "2025-08-10",
        pubDate: "2020-01-01",
    }
];



const SeedBooks = async () => {
    try {
        console.log("Connecting to Db")
        await dbConnect()
        console.log("Db connection is done")
        const result = await addBooks(dummyBooks);
        // console.log("Result is : ", result)
        console.log(`${dummyBooks.length} books created`);
    } catch (error) {
        console.error(' Seeding failed:', err.message);
        process.exit(1);
    }
    finally {
        console.log(' Disconnected');
        process.exit(0);
    }
}

SeedBooks();