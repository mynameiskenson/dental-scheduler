import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/";

// Login a user
export const loginUser = async (credentials: {
    email: string;
    password: string;
}) => {
    const response = await axios.post(API_URL + "login", credentials);
    return response.data;
}

// Register a new user
export const registerUser = async (userData: {
    fullName: string;
    email: string;
    passwordHash: string;
    phone?: string;
}) => {
    const response = await axios.post(API_URL + "register", userData);
    return response.data;
}