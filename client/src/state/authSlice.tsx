import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User, AuthState } from '../types/UserType';

const initialState: AuthState = {
    user: null,
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<{ user: User | null; token: string | null }>) {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout(state) {
            state.user = null;
            state.token = null;  // <-- clear token on logout
            localStorage.removeItem('token'); // Remove token from localStorage
        },
    },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;