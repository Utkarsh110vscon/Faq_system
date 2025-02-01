import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();
const Mongo_Uri= process.env.MONGO_URI

export const connectMongodb= async() => {
    try{
        await mongoose.connect(Mongo_Uri);
        console.log('Database connection established.')
        return;
    }catch(error) {
        console.log(error);
        process.exit(1);
    }
}