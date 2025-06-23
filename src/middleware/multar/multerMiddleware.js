// middlewares/multerMiddleware.js

import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url";

// Handle __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define upload directory inside /public/uploads
// console.log(__dirname)
const uploadDir = path.resolve(__dirname, "..", "..", "..", "public", "uploads");
// const uploadDir = path.resolve(__dirname, "../public/uploads");
// const uploadDir = path.join(__dirname, "..", "public", "uploads");

// Create folder if it doesn't exist
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Define storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

// Create multer instance
export const upload = multer({ storage });

// delete from disk storage
export const removeFileFromDisc = (filePath) => {
    const absolutePath = path.join(__dirname, "..", "..", "..", "public", filePath);
    // console.log(absolutePath)
    fs.stat(absolutePath, (err, stats) => {
        if (err) {
            if (err.code !== 'ENOENT') console.error('FS stat error:', err);
            return;
        }

        if (stats.isFile()) {
            fs.unlink(absolutePath, (unlinkErr) => {
                if (unlinkErr) console.error('FS unlink error:', unlinkErr);
            });
        } else {
            console.warn('Path is not a file:', absolutePath);
        }
    });


}
