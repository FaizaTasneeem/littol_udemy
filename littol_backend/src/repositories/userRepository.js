import User from "../models/User.js";

export const userRepository = {
    async create(userData) {
        const newUser = new User({...userData});
        await newUser.save();
        return newUser;
    },

    async update(filter, updates) {
        const user = await User.findOneAndUpdate(
            filter,
            { $set: updates },
            { new: true, runValidators: true }
        );
        return user;
    },
    
    async findByUserProperty(filter) {
        const user = await User.findOne(filter) || null;
        return user;
    },
}