import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const fetchCart = createAsyncThunk('cart/fetchcart', async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`${API_BASE_URL}/api/cart/list/`, {
            headers: { Authorization: `Bearer ${token}`, },
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response?.data || 'An error occurred');
    }
});

export const addToCart = createAsyncThunk('cart/addToCart', async (itemData, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.post(`${API_BASE_URL}/api/cart/list/`, itemData, {

            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'An error occurred');
    }
});

export const clearCart = createAsyncThunk('cart/clearCart', async (_, { rejectWithValue }) => {
    try {
        await axios.delete(`${API_BASE_URL}/api/cart/list/`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
        });
        return { message: 'Cart cleared' };
    } catch (error) {
        return rejectWithValue(error.response?.data || 'An error occurred');
    }
});

export const updateCartItemQuantity = createAsyncThunk('cart/updateQuantity', async ({ updatedata, pk }, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.patch(`${API_BASE_URL}/api/cart/quantity/${pk}`, updatedata,
            { headers: { Authorization: `Bearer ${token}` }, }
        );
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'An error occurred');
    }
});

export const removeCartItem = createAsyncThunk('cart/removeCartItem', async ({product_id,pk }, { rejectWithValue }) => {
    try {
        const responce =await axios.delete(`${API_BASE_URL}/api/cart/remove/${product_id}/${pk}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
        });
        return responce.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'An error occurred');
    }
});

export const fetchUserCartItems = createAsyncThunk('cart/fetchusercartitems',async(userId,{rejectWithValue})=>{
    try{
        const response = await axios.get(`${API_BASE_URL}/api/cart/user/${userId}`);
        return response.data;
    }catch(error){
        return rejectWithValue(error.response?.data || 'An error occurred');
    }
});



const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        totalItems: 0,
        totalPrice: 0,
        status: "idle",
        error: null,
        user:{item:[],loading:false,error:null},
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload.items;
                state.totalItems = action.payload.total_items;
                state.totalPrice = action.payload.total_price;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            .addCase(addToCart.fulfilled, (state, action) => {
                state.items = action.payload.items;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(clearCart.fulfilled, (state) => {
                state.items = [];
            })
            .addCase(clearCart.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
                const { product_id, new_quantity } = action.payload;
                const item = state.items.find((item) => item.product.id === product_id);
                if (item) {
                    item.quantity = new_quantity;
                    // Recalculate totals
                    state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
                    state.totalPrice = state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
                };
            })
            .addCase(updateCartItemQuantity.rejected, (state, action) => {
                state.error = action.payload;
            })

            .addCase(removeCartItem.fulfilled, (state, action) => {
                const { product_id, pk } = action.payload; 
                state.items = state.items.filter(item => !(item.product.id === product_id && item.id === pk));
                state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
                state.totalPrice = state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

            })
            .addCase(removeCartItem.rejected, (state, action) => {
                state.error = action.payload;
            })

            .addCase(fetchUserCartItems.pending,(state,action)=>{
                state.user.loading = true;
                state.user.error = null;
            })
            .addCase(fetchUserCartItems.fulfilled,(state,action)=>{
                state.user.loading = false;
                state.user.item = action.payload;
            })
            .addCase(fetchUserCartItems.rejected,(state,action)=>{
                state.user.loading = false;
                state.user.error = action.payload;
            });
    },
});

export default cartSlice.reducer;
