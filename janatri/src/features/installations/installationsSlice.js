import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("installations")) || [];

const installationsSlice = createSlice({
  name: "installations",
  initialState,
  reducers: {
    addInstallation: (state, action) => {
      const updated = [...state, action.payload];
      localStorage.setItem("installations", JSON.stringify(updated));
      return updated;
    },
    updateInstallation: (state, action) => {
      const updated = state.map((i) =>
        i.id === action.payload.id ? action.payload : i
      );
      localStorage.setItem("installations", JSON.stringify(updated));
      return updated;
    },
    deleteInstallation: (state, action) => {
      const updated = state.filter((i) => i.id !== action.payload);
      localStorage.setItem("installations", JSON.stringify(updated));
      return updated;
    },
  },
});

export const { addInstallation, updateInstallation, deleteInstallation } =
  installationsSlice.actions;
export default installationsSlice.reducer;
