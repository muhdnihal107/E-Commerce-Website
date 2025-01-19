import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = 'http://127.0.0.1:8000';


export const createOrder = createAsyncThunk('order/createOrder',async ({ orderData},{rejectWithValue})=>{
    try{
        const token = localStorage.getItem('accessToken');
        console.log(token);
        const response = await axios.post(`${API_BASE_URL}/api/orders/create/`,
            { orderData},
            { headers: { Authorization: `Bearer ${token}` }, }
        );
        return response.data
    }catch (error){
        return rejectWithValue(error.response?.data || 'An error occurred');
    }
});


const orderSlice = createSlice({
    name: 'order',
    initialState:{
        order: null,
        loading: false,
        error: null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default orderSlice.reducer;
