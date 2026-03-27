import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
    title:{
        required: true
    },
    description:{
        required: true
    },
    instructor:{
        required: true
    },
    category:{
        required: true
    },
    level:{
        required: true
    },
    thumbnail:{},
    rating:{}
})

export default mongoose.model('Course', courseSchema);