import mongoose from 'mongoose';

// DB CONNECTION
// export const dbConnect = async () => {
//     try {
//         if (!process.env.MONGO_URI) {
//             throw new Error("Provide MongoDB connectionString.")
//         }
//         await mongoose.connect(process.env.MONGO_URI) ?
//             console.log("Db connected") :
//             console.log("error in DB connection")

//     } catch (error) {
//         console.log("DB connection error:", error.message)
//     }

// }
export const dbConnect = async () => {

    if (!process.env.MONGO_URI) {
        throw new Error("Provide MongoDB connectionString.")
    }
    return mongoose.connect(process.env.MONGO_URI)
}