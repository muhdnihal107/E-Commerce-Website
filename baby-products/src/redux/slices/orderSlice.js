import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const fetchOrderDetail = createAsyncThunk('order/fecthorderdetail',async (pk,{rejectWithValue})=>{
    try{
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`${API_BASE_URL}/api/orders/details/${pk}`        );
        return response.data
    }catch(error){
        return rejectWithValue(error.response?.data || 'An error occurred');
    }

});

export const fetchOrder = createAsyncThunk('order/fecthOrder',async (_,{rejectWithValue})=>{
    try{
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`${API_BASE_URL}/api/orders/detail/`,
            { headers: { Authorization: `Bearer ${token}` }, }
        );
        return response.data
    }catch(error){
        return rejectWithValue(error.response?.data || 'An error occurred');
    }

});


export const createOrder = createAsyncThunk('order/createOrder',async ({ orderData},{rejectWithValue})=>{
    try{
        const token = localStorage.getItem('accessToken');
        const response = await axios.post(`${API_BASE_URL}/api/orders/create/`,
            orderData,
            { headers: { Authorization: `Bearer ${token}` }, }
        );
        return response.data
    }catch (error){
        return rejectWithValue(error.response?.data || 'An error occurred');
    }
});

export const fetchAllOrders = createAsyncThunk('order/fetchallorders',async (_,{rejectWithValue})=>{
    try{
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`${API_BASE_URL}/api/orders/create/`,
            { headers: { Authorization: `Bearer ${token}` }, }
        );
        return response.data;
    }catch (error){
        return rejectWithValue(error.response?.data || 'An error occurred');
    }
});

export const verifyPayment = createAsyncThunk(
    'order/verifyPayment',
    async ({ razorpay_order_id, razorpay_payment_id, razorpay_signature }, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${API_BASE_URL}/api/orders/verify/`, {
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
        });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || 'An error occurred');
      }
    }
  );



const orderSlice = createSlice({
    name: 'order',
    initialState:{
        order: null,
        loading: false,
        error: null,
        orders:{data:[],loading:false,error:null},
        orderdetails:{orderData:[],loading:false,error:null},
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
            })

            .addCase(fetchOrder.pending,(state,action)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrder.fulfilled,(state,action)=>{
                state.loading = false;
                state.order = action.payload;
            })
            .addCase(fetchOrder.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(fetchAllOrders.pending,(state,action)=>{
                state.orders.loading = true;
                state.orders.error = null;
            })
            .addCase(fetchAllOrders.fulfilled,(state,action)=>{
                state.orders.loading = false;
                state.orders.data = action.payload;
            })
            .addCase(fetchAllOrders.rejected,(state,action)=>{
                state.orders.loading = false;
                state.orders.error = action.payload;
            })

            .addCase(fetchOrderDetail.pending,(state,action)=>{
                state.orderdetails.loading = true;
                state.orderdetails.error = null;
            })
            .addCase(fetchOrderDetail.fulfilled,(state,action)=>{
                state.orderdetails.loading = false;
                state.orderdetails.orderData = action.payload;
            })
            .addCase(fetchOrderDetail.rejected,(state,action)=>{
                state.orderdetails.loading = false;
                state.orderdetails.error = action.payload;
            });

    }
});

export default orderSlice.reducer;
