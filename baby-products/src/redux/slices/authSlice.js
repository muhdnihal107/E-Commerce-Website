import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = 'http://127.0.0.1:8000';

const savedAuthData = JSON.parse(localStorage.getItem('authData'));

export const registerUser = createAsyncThunk('auth/register', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/users/register`, credentials);
    return response.data;

  } catch (error) {
    return rejectWithValue(error.response.data);

  }
});


export const loginJWT = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const responce = await axios.post(`${API_BASE_URL}/api/users/login`, credentials);
    return responce.data;
  } catch (error) {
    console.log("log in request is not working");
    return rejectWithValue(error.response?.data || 'An error occurred');
  }
});

export const logoutUser = createAsyncThunk('auth/logout', async (refreshToken, { rejectWithValue }) => {
  try {
    const responce = await axios.post(`${API_BASE_URL}/api/users/logout/`, { refresh_token: refreshToken });
    return responce.data;
  } catch (error) {
    console.log("logout request not working");
    return rejectWithValue(error.responce.data);
  }
});


export const fetchUsers = createAsyncThunk('auth/fetchUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/users/list/`

    );
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Failed to fetch users');
  }
}
);

export const fetchUserdetail = createAsyncThunk('auth/fetchUserdetail', async (pk, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/users/detail/${pk}`

    );
    return response.data;
    console.log(response.data,'from redudux user details');
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Failed to fetch users');
  }
}
);

export const blockUser = createAsyncThunk('auth/blockuser', async (user_id, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/users/block/${user_id}`

    );
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Failed to fetch users');
  }
}
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: savedAuthData?.user || null,
    accessToken: savedAuthData?.accessToken || null,
    refreshToken: savedAuthData?.refreshToken || null,
    isAuthenticated: !!savedAuthData,
    loading: false,
    error: null,
    users: { data: [], loading: false, error: null },
    userdetails: { data: [], loading: false, error: null },
    blockUserState: { loading: false, error: null, success: false },
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
      localStorage.removeItem('authData'); 
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginJWT.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginJWT.fulfilled, (state, action) => {
      state.loading = false;
      state.accessToken = action.payload.access_token;
      state.refreshToken = action.payload.refresh_token;
      state.user = action.payload.user; 
      state.isAuthenticated = true;
      localStorage.setItem('accessToken', action.payload.access_token);
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
      localStorage.removeItem('accessToken');
    })
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(fetchUsers.pending, (state) => {
      state.users.loading = true;
      state.users.error = null;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users.loading = false;
      state.users.data = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.users.loading = false;
      state.users.error = action.payload;
    });

    builder.addCase(fetchUserdetail.pending, (state) => {
      state.userdetails.loading = true;
      state.userdetails.error = null;
    });
    builder.addCase(fetchUserdetail.fulfilled, (state, action) => {
      state.userdetails.loading = false;
      state.userdetails.data = action.payload;
    });


    builder.addCase(fetchUserdetail.rejected, (state, action) => {
      state.userdetails.loading = false;
      state.userdetails.error = action.payload;
    });
    builder.addCase(blockUser.pending, (state) => {
      state.blockUserState.loading = true;
      state.blockUserState.error = null;
      state.blockUserState.success = false;
    });
    builder.addCase(blockUser.fulfilled, (state, action) => {
      state.blockUserState.loading = false;
      state.blockUserState.success = true;

    });
  },
});

export const { resetError, clearAuth } = authSlice.actions;
export default authSlice.reducer;