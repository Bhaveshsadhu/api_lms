import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    status: {
        type: String,
        default: 'inactive',

    },
    fname: {
        type: String,
        required: [true, 'Please provide a fname'],

    },
    lname: {
        type: String,
        required: [true, 'Please provide a lname'],

    },
    email: {
        type: String,
        required: [true, 'Please provide an email address'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [
            /^\w+([\.+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email address',
        ],
        index: 1
    },
    role: {
        type: String,
        enum: ['admin', 'user'], // admin = Librarian, user = Student/Staff
        default: 'user',
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: [6, 'Password must be at least 6 characters'],
        // select: false, // don't return password by default
    },
    phone: {
        type: String,
        required: true,
    },
    refreshJWT: {
        type: String
    }
}, {
    timestamps: true
})

export default mongoose.model("User", userSchema);