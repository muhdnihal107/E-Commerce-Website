import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk('products/fetch',async () => {
    const responce = await axios.get('http://127.0.0.1:8000/products/');
    return Response.data;
});

const productSlice= createSlice({
    name: 'products',
    initialState:{data:[],loading:false},
    reducers:{},
    extraReducers:{
        [fetchProducts.pending]: (state,action)=>{
            state.loading = false;
            state.data = action.payload;
        }
    }

})

