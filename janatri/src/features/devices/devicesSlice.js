// src/features/devices/devicesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("devices")) || [];

const devicesSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {
    addDevice: (state, action) => {
      const updated = [...state, action.payload];
      localStorage.setItem("devices", JSON.stringify(updated));
      return updated;
    },
    updateDevice: (state, action) => {
      const updated = state.map((d) =>
        d.id === action.payload.id ? action.payload : d
      );
      localStorage.setItem("devices", JSON.stringify(updated));
      return updated;
    },
    deleteDevice: (state, action) => {
      const updated = state.filter((d) => d.id !== action.payload);
      localStorage.setItem("devices", JSON.stringify(updated));
      return updated;
    },
  },
});

export const { addDevice, updateDevice, deleteDevice } = devicesSlice.actions;
export default devicesSlice.reducer;
