import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface AuthState {
    token: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: AuthState = {
    token: null,
    status: 'idle',
    error: null,
};

export const login = createAsyncThunk('auth/login', async (credentials: { username: string; password: string }) => {
    const response = await axios.post('https://todos-be.vercel.app/auth/login', credentials, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return response.data.access_token;
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.token = null;
        },
        setToken(state, action) {
            state.token = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.error = null;
                state.token = action.payload;
                localStorage.setItem('token', action.payload);
            })
            .addCase(login.rejected, (state) => {
                state.status = 'failed';
                state.error = 'Failed to log in';
            });
    },
});

export const { logout, setToken } = authSlice.actions;

export default authSlice.reducer;
