import { createSlice } from "@reduxjs/toolkit";

const savedData = JSON.parse(localStorage.getItem("serviceVisits")) || [];

const serviceVisitsSlice = createSlice({
  name: "serviceVisits",
  initialState: savedData,
  reducers: {
    addServiceVisit: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("serviceVisits", JSON.stringify(state));
    },
    deleteServiceVisit: (state, action) => {
      const updated = state.filter((v) => v.id !== action.payload);
      localStorage.setItem("serviceVisits", JSON.stringify(updated));
      return updated;
    },
    updateServiceVisit: (state, action) => {
      const index = state.findIndex((v) => v.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
        localStorage.setItem("serviceVisits", JSON.stringify(state));
      }
    },
  },
});

export const { addServiceVisit, deleteServiceVisit, updateServiceVisit } =
  serviceVisitsSlice.actions;
export default serviceVisitsSlice.reducer;
