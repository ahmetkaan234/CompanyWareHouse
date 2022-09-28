import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getWarehouseAsync = createAsyncThunk(
  "warehouse/getWarehouseAsync",
  async () => {
    const res = await axios.get(`https://companyahmet.herokuapp.com/warehouse`);
    return res.data;
  }
);

export const updateWareHouseAsync = createAsyncThunk(
  "warehouse/updateWareHouseAsync",
  async (data) => {
    const res = await axios.put(`https://companyahmet.herokuapp.com/warehouse`, data);
    return res.data;
  }
);

export const deleteWareHouseAsync = createAsyncThunk(
  "warehouse/deleteWareHouseAsync",
  async (id) => {
    const res = await axios.delete(
      `https://companyahmet.herokuapp.com/warehouse/delete/${id}`
    );
    return res.data;
  }
);

export const addWareHouseAsync = createAsyncThunk(
  "warehouse/addWareHouseAsync",
  async (data) => {
    const res = await axios.post(`https://companyahmet.herokuapp.com/warehouse`, data);
    return res;
  }
);

export const getOneWareHouseAsync = createAsyncThunk(
  "warehouse/getOneWareHouseAsync",
  async (id) => {
    const res = await axios.get(`https://companyahmet.herokuapp.com/warehouse/${id}`);
    return res.data;
  }
);

export const getInventoryByWareHouse = createAsyncThunk(
  "warehouse/getInventoryByWareHouse",
  async (id) => {
    const res = await axios.get(`https://companyahmet.herokuapp.com/inventory/${id}`);
    return res.data;
  }
);
export const addInventoryAsync = createAsyncThunk(
  "warehouse/addInventoryAsync",
  async (data) => {
    const res = await axios.post(`https://companyahmet.herokuapp.com/inventory`, data);
    return res.data;
  }
);

export const updateInventoryAsync = createAsyncThunk(
  "warehouse/updateInventoryAsync",
  async (data) => {
    const res = await axios.put(`https://companyahmet.herokuapp.com/inventory`, data);
    console.log(data);
    return res.data;
  }
);

export const deleteInventoryAsync = createAsyncThunk(
  "warehouse/deleteInventoryAsync",
  async (id) => {
    const res = await axios.delete(`https://companyahmet.herokuapp.com/inventory/${id}`);
    return res.data;
  }
);

export const warehouseSlice = createSlice({
  name: "warehouse",
  initialState: {
    items: [],
    data: [],
    inventories: [],
    error: null,
    loading: true,
  },
  //state.items = state.items.filter((item) => item._id !== action.payload);
  reducers: {
    deleteInventories: (state, action) => {
      const id = action.payload;
      const index =state.inventories.findIndex(item=>item._id ===id)
      state.inventories.splice(index,1)

    },
    removeWareHouses: (state, action) => {
       const id =  action.payload;
      const index = state.items.findIndex(item=>item._id ===id);
        state.items.splice(index, 1);
  
    },
    updateInventory: (state, action) => {

      const data = state.inventories.find(
        (item) => (item._id = action.payload.id)
      );
      data.name = action.payload.data;
    },
    postInventory: (state, action) => {
      state.inventories.push(action.payload);
    },
    addWareHouse: (state, action) => {
      state.items = state.items.map((item) => {
        if (item._id === action.payload._id) item = action.payload;
        return item;
      });
    },
  },
  extraReducers: {
    [getWarehouseAsync.fulfilled]: (state, action) => {
      state.items = action.payload.wareHouse;
    },
    [addWareHouseAsync.pending]: (state, action) => {
        state.loading  =true;

    },
    [addWareHouseAsync.fulfilled]: (state, action) => {
      state.loading  =false;
      state.items.push(action.payload.data.createWare);
    },
    [addWareHouseAsync.rejected]: (state, action) => {
      state.error = action.error.message;
    },
    [addInventoryAsync.fulfilled]: (state, action) => {
      state.inventories.push(action.payload.inventory);
    },

    [getOneWareHouseAsync.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
    [getInventoryByWareHouse.fulfilled]: (state, action) => {
      state.inventories = action.payload.inventories;
    },
  },
});

export const {
  deleteInventories,
  addWareHouse,
  removeWareHouses,
  updateInventory,
  postInventory,
} = warehouseSlice.actions;

export default warehouseSlice.reducer;
