import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a book title"],
        trim: true,
    },
    author: {
        type: String,
        required: [true, "Please provide the author's name"],
        trim: true,
    },
    isbn: {
        type: String,
        required: [true, "Please provide ISBN number"],
        unique: true,
    },
    category: {
        type: String,
        enum: ["Fiction", "Non-Fiction", "Science", "Biography", "Technology", "Other", "Programming", "Adventure", "Math"],
        default: "Other",
    },
    description: {
        type: String,
        default: "",
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
    available: {
        type: Number,
        default: 0,
    },
    expected_date_available: {
        type: Date,
        // default: Date.now,
    },
    coverImage: {
        type: String, // URL or file path
        default: "",
    },
    status: {
        type: String,
        enum: ["available", "borrowed", "unavailable"],
        default: "available",
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    lastUpdatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    }, uploadedFiles: {
        type: mongoose.Schema.Types.Array
    }
}, {
    timestamps: true, // includes createdAt and updatedAt
});

export default mongoose.model("Book", bookSchema);
