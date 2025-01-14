import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
    isAdmin: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.isAdmin = action.payload.role === 'admin';
          },
          logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.isAdmin = false;
          },
          setUser: (state, action) => {
            state.user = action.payload;
          },

    },
});

export const { login, logout, setUser } = authSlice.actions;
export default authSlice.reducer;