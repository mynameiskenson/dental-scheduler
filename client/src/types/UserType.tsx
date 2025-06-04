export interface User {
    id: string;
    name: string;
    email: string;
    token: string;
}

export interface AuthState {
    user: User | null;
}