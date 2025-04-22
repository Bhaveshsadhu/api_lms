import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

const PORT = process.env.PORT || 8000;

const app = express()

// Middleware
app.use(cors());
app.use(express.json());
dotenv.config();

// Listen method
app.listen(PORT, (error) => {
    error ?
        console.log("Error While running Server") :
        console.log(`Server running at http://localhost:${PORT}`);
})

// DB CONNECTION
const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI) ?
            console.log("Db connected") :
            console.log("error in DB connection")

    } catch (error) {
        console.log("DB connection error:", error.message)
    }

}

dbConnect();

// routers