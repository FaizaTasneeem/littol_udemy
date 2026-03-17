import User from "../models/User.js";

export const authRepository = {
    async create(userData) {
        const newUser = new User({...userData});
        await newUser.save();
    },

    async findByUserProperty(propertyObj) {
        const user = await User.findOne(propertyObj) || null;
        return user;
    }
}