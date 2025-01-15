import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = 'http://127.0.0.1:8000';

const savedAuthData = JSON.parse(localStorage.getItem('authData'));


export const loginJWT = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const responce = await axios.post(`${API_BASE_URL}/api/users/login`, credentials);
    return responce.data;
  } catch (error) {
    console.log("log in request is not working");
    return rejectWithValue(error.responce.data);
  }
});

export const logoutUser = createAsyncThunk('auth/logout',async (refreshToken,{rejectWithValue})=>{
  try {
    const responce = await axios.post(`${API_BASE_URL}/api/users/logout/`,{refresh_token: refreshToken});
    return responce.data;
  }catch (error) {
    console.log("logout request not working");
    return rejectWithValue(error.responce.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState:{
    user: savedAuthData?.user || null,
    accessToken: savedAuthData?.accessToken || null,
    refreshToken: savedAuthData?.refreshToken || null,
    isAuthenticated: !!savedAuthData,
    loading:false,
    error:null,
  },
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    clearAuth: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem('authData'); // Clear localStorage
    },
  },
  extraReducers: (builder)=>{
    builder.addCase(loginJWT.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginJWT.fulfilled, (state, action) => {
      state.loading = false;
      state.accessToken = action.payload.access_token;
      state.refreshToken = action.payload.refresh_token;
      state.user = action.payload.user; // Assuming the API returns user details as part of the response
      state.isAuthenticated = true;

      localStorage.setItem('authData', JSON.stringify({
        user: action.payload.user,
        accessToken: action.payload.access_token,
        refreshToken: action.payload.refresh_token,
      }));
    });
    builder.addCase(loginJWT.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });


    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.loading = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.user = null;

      localStorage.removeItem('authData');
    })
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

  },
});

export const { resetError,clearAuth } = authSlice.actions;
export default authSlice.reducer;