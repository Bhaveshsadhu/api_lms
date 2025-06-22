import express from 'express';
import { dbConnect } from './src/config/dbconfig.js';
import cors from 'cors';
import authRoutes from './src/routes/authRoutes.js'
import { errorHandler } from './src/middleware/errorHandler.js';
import userRoutes from './src/routes/userRoutes.js';
import bookRouter from './src/routes/bookRoutes.js';
import path from "path";
import { fileURLToPath } from "url";


// import dotenv from 'dotenv';

const PORT = process.env.PORT || 8000;

const app = express()

// Middleware
// app.use(cors());
app.use(cors({
    origin: 'http://localhost:5173', // frontend origin
    methods: ['GET', 'POST', 'OPTIONS', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
// dotenv.config();

// DATABASE CONNECTIONS
dbConnect().then(() => {
    console.log("DB Connected.")
    // Listen method
    app.listen(PORT, (error) => { // this server will run only when db connected
        error ?
            console.log("Error While running Server") :
            console.log(`Server running at http://localhost:${PORT}`);
    })
}).catch((error) => console.log(error))

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static images
// ✅ Directly resolve uploads from current folder level
const uploadsPath = path.resolve(__dirname, "public/uploads");

// ✅ Serve static files on /uploads route
app.use("/uploads", express.static(uploadsPath));

// console.log(uploadsPath)
// console.log("Serving static files from:", uploadsPath);


// API END POINTS
app.use("/api/v1/auth", authRoutes);
// Users END POINTS
app.use("/api/v1/users", userRoutes);
// Users END POINTS
app.use("/api/v1/books", bookRouter);
// Global Error handler
app.use(errorHandler);





// routers