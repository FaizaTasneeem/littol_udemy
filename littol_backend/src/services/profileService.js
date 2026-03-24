import { userRepository } from "../repositories/userRepository.js";

export const profileService = {
    async profile({email}){
        if(!email){
            const error = new Error("Email is required !");
            error.code = "VALIDATION_ERROR";
            throw error;
        }
        const user = await userRepository.findByUserProperty({email});
        if(!user){
            const error = new Error("User not found !");
            error.code = "NOT_FOUND";
            throw error;
        }

        return {user, message: `User profile fetched successfully for ${user.email} !`};
    },
    
    async editProfile({email, fullname}) {
        if(!email){
            const error = new Error("Email is required !");
            error.code = "VALIDATION_ERROR";
            throw error;
        }
        
        const user = await userRepository.findByUserProperty({email});
        if(!user){
            const error = new Error("User not found !");
            error.code = "NOT_FOUND";
            throw error;
        }

        const updatedUser = await userRepository.update({email, fullname});

        return {updatedUser, message: `User profile updated successfully for ${updatedUser.email} !`};
    }
}