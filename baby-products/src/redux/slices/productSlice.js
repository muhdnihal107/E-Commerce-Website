import { createAsyncThunk, createSlice, Tuple } from "@reduxjs/toolkit";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_URL;
export const fetchCategories = createAsyncThunk('data/fetchCategories', async () => {
    const responce = await axios.get(`${API_BASE_URL}/api/products/category/`);
    return responce.data;
});

export const fetchProductByCategory = createAsyncThunk('data/fetchproductbycategories', async (category_id,{rejectWithValue}) => {
   try {
    const responce = await axios.get(`${API_BASE_URL}/products/category/${category_id}`);
    return responce.data;
}catch(error){
    return rejectWithValue(error.response?.data || 'An error occurred');

}
});

export const fetchProducts = createAsyncThunk('data/fetchproducts', async () => {
    const responce = await axios.get(`${API_BASE_URL}/api/products/list/`);
    return responce.data;
});

export const fetchProductdetail = createAsyncThunk('data/fetchproductdetail', async(productId)=>{
    const responce = await axios.get(`${API_BASE_URL}/api/products/${productId}`);
    return responce.data;
});

export const editProduct = createAsyncThunk('data/editproduct',async({productData,pk},{rejectWithValue})=>{
    try{
        const response = await axios.patch(`${API_BASE_URL}/api/products/edit/${pk}`,productData);
        return response.data;
    }catch(error){
        return rejectWithValue(error.response?.data || 'An error occurred');
    }
});

export const addProduct = createAsyncThunk('data/addproduct',async({newProduct},{rejectWithValue})=>{
    try{
        const response = await axios.post(`${API_BASE_URL}/api/products/add/`,newProduct);
        return response.data;
    }catch(error){
        return rejectWithValue(error.response?.data || 'An error occurred');
    }
});

export const deleteProduct = createAsyncThunk('data/deleteProduct', async (pk, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/api/products/edit/${pk}`);
        return response.data; 
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const searchProducts = createAsyncThunk('data/searchproducts',async(searchQuery,{rejectWithValue})=>{
    try{
        const response = await axios.get(`${API_BASE_URL}/api/products/search/?search=${searchQuery}`);
        return response.data;
    }catch(error){
        return rejectWithValue(error.response?.data || 'An error occurred');
    }
});


const productSlice = createSlice({
    name: 'products',
    initialState: {
        categories: { data: [], loading: false },
        products: { data: [], loading: false },
        productdetails: { data: [],loading:false},
        editStatus: { success: false, error: null, loading: false },
        addStatus: { success: false, error: null, loading: false },
        deleteStatus: { success: false, error: null, loading: false },
        productByCategory:{data:[],loading:false},
        productSearch:{data:[],loading:false},
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

        builder.addCase(editProduct.pending, (state) => {
            state.editStatus.loading = true;
            state.editStatus.success = false;
            state.editStatus.error = null;
        });
        builder.addCase(editProduct.fulfilled, (state, action) => {
            state.editStatus.loading = false;
            state.editStatus.success = true;
            state.products.data = state.products.data.map((product) =>
                product.id === action.payload.id ? action.payload : product
            );
        });
        builder.addCase(editProduct.rejected, (state, action) => {
            state.editStatus.loading = false;
            state.editStatus.success = false;
            state.editStatus.error = action.payload;
        });

        builder.addCase(addProduct.pending, (state) => {
            state.addStatus.loading = true;
            state.addStatus.success = false;
            state.addStatus.error = null;
          });
          builder.addCase(addProduct.fulfilled, (state, action) => {
            state.addStatus.loading = false;
            state.addStatus.success = true;
          });
          builder.addCase(addProduct.rejected, (state, action) => {
            state.addStatus.loading = false;
            state.addStatus.success = false;
            state.addStatus.error = action.payload;
          });

          builder.addCase(deleteProduct.pending, (state) => {
            state.deleteStatus.loading = true;
            state.deleteStatus.success = false;
            state.deleteStatus.error = null;
        });
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.deleteStatus.loading = false;
            state.deleteStatus.success = true;
            state.products.data = state.products.data.filter((product) => product.id !== action.payload);
        });
        builder.addCase(deleteProduct.rejected, (state, action) => {
            state.deleteStatus.loading = false;
            state.deleteStatus.success = false;
            state.deleteStatus.error = action.payload;
        });

        builder.addCase(fetchProductByCategory.pending, (state) => {
            state.productByCategory.loading = true;
        });
        builder.addCase(fetchProductByCategory.fulfilled, (state, action) => {
            state.productByCategory.loading = false;
            state.productByCategory.data = action.payload;
        });
        builder.addCase(fetchProductByCategory.rejected, (state) => {
            state.productByCategory.loading = false;
        });

        builder.addCase(searchProducts.pending, (state) => {
            state.productSearch.loading = true;
        });
        builder.addCase(searchProducts.fulfilled, (state, action) => {
            state.productSearch.loading = false;
            state.productSearch.data = action.payload;
        });
        builder.addCase(searchProducts.rejected, (state) => {
            state.productSearch.loading = false;
        });


    },

});

export default productSlice.reducer;


