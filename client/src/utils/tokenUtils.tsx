import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    exp: number;
    [key: string]: any;
}

export const isTokenExpired = (token: string): boolean => {
    try {
        const decoded = jwtDecode<JwtPayload>(token);
        const now = Date.now() / 1000;
        return decoded.exp < now;
    } catch (error) {
        console.error("Invalid token", error);
        return true; // treat as expired if decoding fails
    }
}