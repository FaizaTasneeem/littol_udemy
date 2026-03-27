import { userRepository } from "../repositories/userRepository.js";

export const profileService = {
    async profile({ userId }){
        if(!userId){
            const error = new Error("User id is required !");
            error.code = "VALIDATION_ERROR";
            throw error;
        }
        const user = await userRepository.findByUserProperty({ _id: userId });
        if(!user){
            const error = new Error("User not found !");
            error.code = "NOT_FOUND";
            throw error;
        }

        return {user, message: `User profile fetched successfully for ${user.email} !`};
    },
    
    async editProfile({ userId, fullname }) {
        if(!userId || !fullname){
            const error = new Error("User id & Fullname is required !");
            error.code = "VALIDATION_ERROR";
            throw error;
        }
        
        const user = await userRepository.findByUserProperty({ _id: userId });
        if(!user){
            const error = new Error("User not found !");
            error.code = "NOT_FOUND";
            throw error;
        }

        const updatedUser = await userRepository.update({ _id: userId }, { fullname });

        return {updatedUser, message: `User profile updated successfully for ${updatedUser.email} !`};
    }
};