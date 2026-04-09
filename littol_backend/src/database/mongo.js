import mongoose from 'mongoose';
import env from '../config/env.js';

const mongoURI = env.mongoUrl;

export const connectToMongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB successfully.');
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
};

export const createMongoDBIndex = async () => {
    try {
        await mongoose.connection.collection("courses").createIndex(
            {title: "text"},
            {description: "text"},
            {instructor: "text"},
        )
        console.log('Created Index in MongoDB Course collection successfully.');
    }
    catch (error) {
        console.error("Error creating Index in MongoDB Course collection: ", error);
        throw error;
    }
};