import { loginUser } from "@/services/authService";
import { setUser } from "@/state/authSlice";
import type { AppDispatch } from "@/state/store";

export const loginThunk = (credentials: {
    email: string;
    password: string;
}) => {
    return async (dispatch: AppDispatch) => {
        try {
            const userData = await loginUser(credentials);
            dispatch(setUser({ user: userData.user, token: userData.token }));
            localStorage.setItem("token", userData.token); // Store token in localStorage
        } catch (error) {
            console.error("Login failed:", error);
            throw error; // Re-throw the error for further handling if needed
        }
    };
}