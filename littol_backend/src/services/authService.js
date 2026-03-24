import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { userRepository } from "../repositories/userRepository.js";
import { generateAccessToken, generateRefreshToken } from "../auth/token.js";

export const authService = {
    async createUser ({ fullname, email, password }) {
        //check if fullname, email & password exist
        if (!fullname || !email || !password) {
            const error = new Error("Email and Password required !");
            error.code = "VALIDATION_ERROR";
            throw error;
        }

        //check if user already exists
        const oldUser = await userRepository.findByUserProperty({ email });
        if (oldUser) {
            const error = new Error("User already exists !");
            error.code = "CONFLICT_ERROR";
            throw error;
        }

        console.log("input register data - ", fullname, email, password);

        //create user in db
        const user = await userRepository.create({
            fullname: fullname,
            email: email,
            passwordHash: password,
            refreshToken: null,
        });

        //generate access + refresh tokens 
        const { accessToken, refreshToken } = await generateTokens(user);

        return {user, accessToken, refreshToken, message: "User created successfully !"};

    },

    async loginUser ({email, password}) {
        //check if email & password exist
        if (!email || !password) {
            const error = new Error("Email and Password required !");
            error.code = "VALIDATION_ERROR";
            throw error;
        }
        
        //check if user exists
        const user = await userRepository.findByUserProperty({ email });
        if (!user) {
            const error = new Error("Invalid credentials !");
            error.code = "UNAUTHORIZED";
            throw error;
        }

        //verify hashed password
        // const isValidCredentials = await bcrypt.compare(password, user.passwordHash);
        // if (!isValidCredentials) {
                // const error = new Error("Invalid credentials !");
                // error.code = "UNAUTHORIZED";
                // throw error;
        // }

        console.log("input login data - ", email, password);

        const { accessToken, refreshToken } = await generateTokens(user);

        return {user, accessToken, refreshToken, message: "User logged in successfully !"};

    },

    async refresh ({token}) {
        //check if token exists
        if (!token) {
            const error = new Error("Refresh token missing !");
            error.code = "UNAUTHORIZED";
            throw error;
        }  

        //verify refresh token sent in cookies
        const decoded_payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

        //check if user exists
        const user = await userRepository.findByUserProperty({ refreshToken: token });
        if (!user) {
            const error = new Error("Invalid refresh token !");
            error.code = "UNAUTHORIZED";
            throw error;
        }

        const { accessToken, refreshToken } = await generateTokens(user);

        return {user, accessToken, refreshToken, message: "Token refreshed successfully !"};

    },

    async logout ({token}) {
        //check if token exists
        if (!token) {
            const error = new Error("Refresh token missing !");
            error.code = "UNAUTHORIZED";
            throw error;
        }  

        //check if user exists
        const user = await userRepository.findByUserProperty({ refreshToken: token });
        if (!user) {
            const error = new Error("Invalid refresh token !");
            error.code = "UNAUTHORIZED";
            throw error;
        }

        //clear refresh token in user
        await userRepository.update({email:user.email, refreshToken: null});

        return {user, message: "Logged out successfully !"};

    }
}

async function generateTokens(user) {
  const accessToken = generateAccessToken(user.email);
  const refreshToken = generateRefreshToken(user.email);

  await userRepository.update({email:user.email, refreshToken});

  return { accessToken, refreshToken };
}
