import { createAsyncThunk, createSlice, Tuple } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategories = createAsyncThunk('data/fetchCategories', async () => {
    const responce = await axios.get('http://127.0.0.1:8000/api/products/category/');
    return responce.data;
})

export const fetchProducts = createAsyncThunk('data/fetchproducts', async () => {
    const responce = await axios.get('http://127.0.0.1:8000/api/products/list/');
    return responce.data;
});

export const fetchProductdetail = createAsyncThunk('data/fetchproductdetail', async(productId)=>{
    const responce = await axios.get(`http://127.0.0.1:8000/api/products/${productId}`);
    return responce.data;
});

const productSlice = createSlice({
    name: 'products',
    initialState: {
        categories: { data: [], loading: false },
        products: { data: [], loading: false },
        productdetails: { data: [],loading:false},
    },
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(fetchCategories.pending, (state) => {
            state.categories.loading = true;
        });
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.categories.loading = false;
            state.categories.data = action.payload;
        });
        builder.addCase(fetchCategories.rejected, (state) => {
            state.categories.loading = false;
        });



        builder.addCase(fetchProducts.pending, (state) => {
            state.products.loading = true;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.products.loading = false;
            state.products.data = action.payload;
        });
        builder.addCase(fetchProducts.rejected, (state) => {
            state.products.loading = false;
        });


        builder.addCase(fetchProductdetail.pending,(state,action)=>{
            state.productdetails.loading = true;
        });
        builder.addCase(fetchProductdetail.fulfilled,(state,action)=>{
            state.productdetails.loading = false;
            state.productdetails.data = action.payload;
        });
        builder.addCase(fetchProductdetail.rejected, (state) => {
            state.productdetails.loading = false;
        });

    },

});

export default productSlice.reducer;


