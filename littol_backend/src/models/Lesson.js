import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    videoUrl: {
        type: String,
        required: true,
    },
    order: {
        type: Number,
        required: true
    },
    SectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section',
        required: true
    }
});

export default mongoose.model('Lesson', lessonSchema);
