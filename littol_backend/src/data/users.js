import bcrypt from "bcrypt";

export const users = [
    {
        id: 1,
        email: 'faizat9696@gmail.com',
        passwordHash: bcrypt.hashSync("password123", 10),
        refreshToken: null
    }
]