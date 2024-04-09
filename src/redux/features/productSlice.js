import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProductByStoreId } from "../../api/product-api";

export const fetchProducts = createAsyncThunk(
  "menu/fetch_menus",
  async (param, thunkAPI) => {
    try {
      // console.log(param);
      const response = await getProductByStoreId(param);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);
const initialState = {
  products: [],
  error: null,
  loading: false,
};
const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    updateProducts: async (state, action) => {
      try {
        console.log(action.payload);
        state.loading = true;
        const products = fetchProducts();
        state.products = products;
        state.loading = false;
      } catch (error) {
        state.loading = false;
        console.log("fail to update menu list");
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });

    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export const { updateProducts } = productSlice.actions;

export const selectProduct = (state) => state.product.products;

export default productSlice.reducer;
