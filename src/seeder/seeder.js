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
        quantity: 50,
        available: 50,
        coverImage: "https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg",
        rating: 4.7,
        status: "available",
        addedBy: "64a1f3e8d7a4b5c6d7e8f901",
        lastUpdatedBy: null,
        uploadedFiles: []
    },
    {
        title: "Eloquent JavaScript",
        author: "Marijn Haverbeke",
        isbn: "9781593279509",
        category: "Programming",
        description: "A Modern Introduction to Programming.",
        quantity: 55,
        available: 55,
        coverImage: "https://covers.openlibrary.org/b/isbn/9781593279509-L.jpg",
        rating: 4.5,
        status: "available",
        addedBy: "64a1f3e8d7a4b5c6d7e8f902",
        lastUpdatedBy: null,
        uploadedFiles: []
    },
    {
        title: "You Don’t Know JS: Up & Going",
        author: "Kyle Simpson",
        isbn: "9781491924464",
        category: "Programming",
        description: "An exploration of the core mechanisms of the JavaScript language.",
        quantity: 60,
        available: 60,
        coverImage: "https://covers.openlibrary.org/b/isbn/9781491924464-L.jpg",
        rating: 4.3,
        status: "available",
        addedBy: "64a1f3e8d7a4b5c6d7e8f903",
        lastUpdatedBy: null,
        uploadedFiles: []
    },
    {
        title: "The Pragmatic Programmer",
        author: "Andrew Hunt & David Thomas",
        isbn: "9780201616224",
        category: "Programming",
        description: "Your Journey to Mastery.",
        quantity: 70,
        available: 70,
        coverImage: "https://covers.openlibrary.org/b/isbn/9780201616224-L.jpg",
        rating: 4.8,
        status: "available",
        addedBy: "64a1f3e8d7a4b5c6d7e8f904",
        lastUpdatedBy: null,
        uploadedFiles: []
    },
    {
        title: "Design Patterns",
        author: "Erich Gamma, et al.",
        isbn: "9780201633610",
        category: "Programming",
        description: "Elements of Reusable Object‑Oriented Software.",
        quantity: 65,
        available: 65,
        coverImage: "https://covers.openlibrary.org/b/isbn/9780201633610-L.jpg",
        rating: 4.6,
        status: "available",
        addedBy: "64a1f3e8d7a4b5c6d7e8f905",
        lastUpdatedBy: null,
        uploadedFiles: []
    },
    {
        title: "Refactoring",
        author: "Martin Fowler",
        isbn: "9780201485677",
        category: "Programming",
        description: "Improving the Design of Existing Code.",
        quantity: 80,
        available: 80,
        coverImage: "https://covers.openlibrary.org/b/isbn/9780201485677-L.jpg",
        rating: 4.4,
        status: "available",
        addedBy: "64a1f3e8d7a4b5c6d7e8f906",
        lastUpdatedBy: null,
        uploadedFiles: []
    },
    {
        title: "Introduction to Algorithms",
        author: "Cormen, Leiserson, Rivest & Stein",
        isbn: "9780262033848",
        category: "Programming",
        description: "The standard textbook on algorithms.",
        quantity: 90,
        available: 90,
        coverImage: "https://covers.openlibrary.org/b/isbn/9780262033848-L.jpg",
        rating: 4.2,
        status: "available",
        addedBy: "64a1f3e8d7a4b5c6d7e8f907",
        lastUpdatedBy: null,
        uploadedFiles: []
    },
    {
        title: "JavaScript: The Good Parts",
        author: "Douglas Crockford",
        isbn: "9780596517748",
        category: "Programming",
        description: "Unearthing the Excellence in JavaScript.",
        quantity: 75,
        available: 75,
        coverImage: "https://covers.openlibrary.org/b/isbn/9780596517748-L.jpg",
        rating: 4.1,
        status: "available",
        addedBy: "64a1f3e8d7a4b5c6d7e8f908",
        lastUpdatedBy: null,
        uploadedFiles: []
    },
    {
        title: "Programming Pearls",
        author: "Jon Bentley",
        isbn: "9780201657883",
        category: "Programming",
        description: "Essays on programming methodology.",
        quantity: 68,
        available: 68,
        coverImage: "https://covers.openlibrary.org/b/isbn/9780201657883-L.jpg",
        rating: 4.0,
        status: "available",
        addedBy: "64a1f3e8d7a4b5c6d7e8f909",
        lastUpdatedBy: null,
        uploadedFiles: []
    },
    {
        title: "Code Complete",
        author: "Steve McConnell",
        isbn: "9780735619678",
        category: "Programming",
        description: "A Practical Handbook of Software Construction.",
        quantity: 85,
        available: 85,
        coverImage: "https://covers.openlibrary.org/b/isbn/9780735619678-L.jpg",
        rating: 4.9,
        status: "available",
        addedBy: "64a1f3e8d7a4b5c6d7e8f910",
        lastUpdatedBy: null,
        uploadedFiles: []
    }
];



const SeedBooks = async () => {
    try {
        console.log("Connecting to Db")
        await dbConnect()
        console.log("Db connection is done")
        await addBooks(dummyBooks);
        console.log(`${dummyBooks.length} books created`);
    } catch (error) {
        console.error(' Seeding failed:', err.message);
        process.exit(1);
    }
    finally {
        console.log(' Disconnecting…');
        process.exit(0);
    }
}

SeedBooks();