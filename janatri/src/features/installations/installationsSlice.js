import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("installations")) || [];

const installationsSlice = createSlice({
  name: "installations",
  initialState,
  reducers: {
    addInstallation: (state, action) => {
      const newInstall = { ...action.payload, status: "Pending" };
      const updated = [...state, newInstall];
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
    markInstallationComplete: (state, action) => {
      const { id, attachments } = action.payload;
      const item = state.find((i) => i.id === id);
      if (item) {
        item.status = "Completed";
        item.attachments = attachments.map((f) => ({
          name: f.name,
          url: URL.createObjectURL(f),
        }));
        localStorage.setItem("installations", JSON.stringify(state));
      }
    },
  },
});

export const {
  addInstallation,
  updateInstallation,
  deleteInstallation,
  markInstallationComplete,
} = installationsSlice.actions;
export default installationsSlice.reducer;
