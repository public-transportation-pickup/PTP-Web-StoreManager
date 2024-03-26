import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetMenuByStoreId } from "../../api/menu-api";
import { getMenus } from "../../apiV2/menu";

export const fetchMenus = createAsyncThunk(
  "menu/fetch_menus",
  async (_, thunkAPI) => {
    try {
      const response = await GetMenuByStoreId();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);
const initialState = {
  menus: [],
  error: null,
  loading: false,
};
const menuSlice = createSlice({
  name: "menu",
  initialState: initialState,
  reducers: {
    updateMenus: async (state, action) => {
      try {
        console.log(action.payload);
        state.loading = true;
        const menus = fetchMenus();
        state.menus = menus;
        state.loading = false;
      } catch (error) {
        state.loading = false;
        console.log("fail to update menu list");
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMenus.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchMenus.fulfilled, (state, action) => {
      state.loading = false;
      state.menus = action.payload;
    });

    builder.addCase(fetchMenus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export const { updateMenus } = menuSlice.actions;

export const selectMenu = (state) => state.menu.menus;

export default menuSlice.reducer;
