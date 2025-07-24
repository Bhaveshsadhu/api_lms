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
    rating: {
        type: String,
        default: "",
    },
    availableQuantity: {
        type: Number,
        required: true,
        default: 1,
    },
    borrowedQuantity: {
        type: Number,
        default: 0,
    },
    pubDate: {
        type: Date,
        required: true
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
    }
    , uploadedFiles: {
        type: mongoose.Schema.Types.Array
    },
    ExpectedDateAvailable: {
        type: Date,
        required: true
    },
}, {
    timestamps: true, // includes createdAt and updatedAt
});

export default mongoose.model("Book", bookSchema);
