import User from "../models/User.js";

export const userRepository = {
    async create(userData) {
        const newUser = new User({...userData});
        await newUser.save();
        return newUser;
    },

    async findByUserProperty(propertyObj) {
        const user = await User.findOne(propertyObj) || null;
        return user;
    },

    async update(propertyObj, fullname) {
        const user = await User.findOne(propertyObj);
        user.fullname = fullname;
        await user.save();
        return user;
    }
}