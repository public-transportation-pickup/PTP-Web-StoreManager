import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  GetOrderByStoreId,
  GetOrderByStoreIdWithPhone,
} from "../../api/order-api";

export const fetchOrders = createAsyncThunk(
  "menu/fetch_menus",
  async (param, thunkAPI) => {
    try {
      // console.log(param);
      if (param.phoneNumber !== "") {
        // console.log("Not empty");
        return await GetOrderByStoreIdWithPhone(param);
      } else {
        // console.log("Empty");
        return await GetOrderByStoreId(param);
      }
      // return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);
const initialState = {
  orders: [],
  error: null,
  loading: false,
};
const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    updateOrders: async (state, action) => {
      try {
        console.log(action.payload);
        state.loading = true;
        const orders = fetchOrders();
        state.orders = orders;
        state.loading = false;
      } catch (error) {
        state.loading = false;
        console.log("fail to update order list");
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    });

    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export const { updateOrders } = orderSlice.actions;

export const selectOrder = (state) => state.order.orders;

export default orderSlice.reducer;
