import express from 'express';
import { dbConnect } from './config/dbconfig.js';
import cors from 'cors';
// import dotenv from 'dotenv';

const PORT = process.env.PORT || 8000;

const app = express()

// Middleware
app.use(cors());
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






// routers