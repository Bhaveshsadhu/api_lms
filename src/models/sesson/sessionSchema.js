import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, 'Please provide a Token'],
    },
    association: {
        type: String,
    },
    type: {
        type: String,
        required: true,
        enum: ['emailVerification', 'passwordReset']
    },
    expiresAt: {
        type: Date,
        required: true
    },
    expire: { // This field seems to be for TTL index, consider if it's still needed or how it interacts with expiresAt
        type: Date,
        required: true,
        default: new Date(Date.now() + 1000 * 60 * 60), //1hr
        expires: 0
    }
}, {
    timestamps: true
})

export default mongoose.model("session", sessionSchema);