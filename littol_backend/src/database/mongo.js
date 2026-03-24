import mongoose from 'mongoose';
import env from '../config/env.js';

const mongoURI = env.mongoUrl;

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB successfully.');
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

export default connectToMongoDB;