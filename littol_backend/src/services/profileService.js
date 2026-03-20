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

        return {user, message: "User profile fetched successfully !"};
    },
    
    async editProfile({email}) {
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

        return {user, message: "User profile fetched successfully !"};
    }
}