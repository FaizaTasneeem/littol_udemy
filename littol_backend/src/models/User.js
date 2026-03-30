import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    profilePicFilePath: {
        type: String,
    },
    refreshToken: {
        type: String,
        default: null
    }
});

export default mongoose.model('User', userSchema);
