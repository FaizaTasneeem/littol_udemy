import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
    title:{
        required: true,
        type: String,
    },
    description:{
        required: true,
        type: String,
    },
    instructor:{
        required: true,
        type: String,
    },
    category:{
        required: true,
        type: String,
    },
    level:{
        required: true,
        type: String,
    },
    thumbnailFilePath:{
        type: String
    },
    rating:{
        type: Number,
    }
})

export default mongoose.model('Course', courseSchema);