// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const API_BASE_URL = 'http://127.0.0.1:8000';

// export const fetchCart = createAsyncThunk('cart/fetchcart', async (_, { rejectWithValue }) => {
//     try {
//         const response = await axios.get(`http://127.0.0.1:8000/api/cart/list/`, {
//             headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//         });
//         console.log('hlooo',response.data)
//         return response.data;
//     } catch (error) {
//         console.log(error);
//         return rejectWithValue(error.response.data);
//     }
// });

// export const addToCart = createAsyncThunk('cart/addToCart', async (item, { rejectWithValue }) => {
//     try {
//         const response = await axios.post(`${API_BASE_URL}/cart/list/`, item, {
//             headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//         });
//         return response.data;
//     } catch (error) {
//         return rejectWithValue(error.response.data);
//     }
// });

// export const clearCart = createAsyncThunk('cart/clearCart', async (_, { rejectWithValue }) => {
//     try {
//         await axios.delete(`${API_BASE_URL}/cart/list/`, {
//             headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//         });
//         return { message: 'Cart cleared' };
//     } catch (error) {
//         return rejectWithValue(error.response.data);
//     }
// });

// export const updateCartItemQuantity = createAsyncThunk('cart/updateQuantity', async ({ pk, action, product_id }, { rejectWithValue }) => {
//     try {
//         const response = await axios.patch(
//             `${API_BASE_URL}/cart/quantity/${pk}`,
//             { action, product_id },
//             {
//                 headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//             }
//         );
//         return response.data;
//     } catch (error) {
//         return rejectWithValue(error.response.data);
//     }
// });

// const cartSlice = createSlice({
//     name: "cart",
//     initialState: {
//         cart: { items:[]},
//         status: "idle",
//         error: null,
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             // Fetch Cart
//             .addCase(fetchCart.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(fetchCart.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.cart=[...state.cart.items, ...action.payload];
//             })
//             .addCase(fetchCart.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.payload;
//             })
//             // Add to Cart
//             .addCase(addToCart.fulfilled, (state, action) => {
//                 state.cart = action.payload;
//             })
//             .addCase(addToCart.rejected, (state, action) => {
//                 state.error = action.payload;
//             })
//             // Clear Cart
//             .addCase(clearCart.fulfilled, (state) => {
//                 state.cart = { items: [] };
//             })
//             .addCase(clearCart.rejected, (state, action) => {
//                 state.error = action.payload;
//             })
//             // Update Quantity
//             .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
//                 const { product_id, new_quantity } = action.payload;
//                 const item = state.cart.items.find((item) => item.product.id === product_id);
//                 if (item) item.quantity = new_quantity;
//             })
//             .addCase(updateCartItemQuantity.rejected, (state, action) => {
//                 state.error = action.payload;
//             });
//     },
// });

// export default cartSlice.reducer;


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = 'http://127.0.0.1:8000';

export const fetchCart = createAsyncThunk('cart/fetchcart', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/cart/list/`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response?.data || 'An error occurred');
    }
});

export const addToCart = createAsyncThunk('cart/addToCart', async (item, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/cart/list/`, item, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'An error occurred');
    }
});

export const clearCart = createAsyncThunk('cart/clearCart', async (_, { rejectWithValue }) => {
    try {
        await axios.delete(`${API_BASE_URL}/cart/list/`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return { message: 'Cart cleared' };
    } catch (error) {
        return rejectWithValue(error.response?.data || 'An error occurred');
    }
});

export const updateCartItemQuantity = createAsyncThunk('cart/updateQuantity', async ({ pk, action, product_id }, { rejectWithValue }) => {
    try {
        const response = await axios.patch(
            `${API_BASE_URL}/cart/quantity/${pk}`,
            { action, product_id },
            {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            }
        );
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'An error occurred');
    }
});

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: { items: [] },
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Cart
            .addCase(fetchCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.cart.items = [...state.cart.items, ...action.payload];  // Avoid mutation
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                state.cart.items = [];  // Reset cart on failure
            })
            // Add to Cart
            .addCase(addToCart.fulfilled, (state, action) => {
                state.cart.items.push(action.payload);  // Add new item to the cart
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.error = action.payload;
            })
            // Clear Cart
            .addCase(clearCart.fulfilled, (state) => {
                state.cart = { items: [] };  // Reset cart state
            })
            .addCase(clearCart.rejected, (state, action) => {
                state.error = action.payload;
            })
            // Update Quantity
            .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
                const { product_id, new_quantity } = action.payload;
                const item = state.cart.items.find((item) => item.product.id === product_id);
                if (item) item.quantity = new_quantity;
            })
            .addCase(updateCartItemQuantity.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export default cartSlice.reducer;
