import axios from "@/lib/axios";

// Login a user
export const loginUser = async (credentials: {
    email: string;
    password: string;
}) => {
    const response = await axios.post("/auth/login", credentials);
    return response.data;
};

// Register a new user
export const registerUser = async (userData: {
    fullName: string;
    email: string;
    passwordHash: string;
    phone?: string;
}) => {
    const response = await axios.post("/auth/register", userData);
    return response.data;
};