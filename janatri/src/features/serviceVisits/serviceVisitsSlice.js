// src/features/serviceVisits/serviceVisitsSlice.js
import { createSlice, nanoid } from "@reduxjs/toolkit";

// Load from localStorage on initialization
const initialState = JSON.parse(localStorage.getItem("serviceVisits")) || [];

const serviceVisitsSlice = createSlice({
  name: "serviceVisits",
  initialState,
  reducers: {
    addServiceVisit: {
      reducer(state, action) {
        state.push({ ...action.payload, status: "pending" });
        localStorage.setItem("serviceVisits", JSON.stringify(state));
      },
      prepare(visit) {
        return {
          payload: {
            id: nanoid(),
            ...visit,
          },
        };
      },
    },

    markServiceDone(state, action) {
      const visit = state.find((v) => v.id === action.payload);
      if (visit) {
        visit.status = "done";
        localStorage.setItem("serviceVisits", JSON.stringify(state));
      }
    },

    updateServiceVisit(state, action) {
      const index = state.findIndex((v) => v.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
        localStorage.setItem("serviceVisits", JSON.stringify(state));
      }
    },

    deleteServiceVisit(state, action) {
      const updated = state.filter((v) => v.id !== action.payload);
      localStorage.setItem("serviceVisits", JSON.stringify(updated));
      return updated;
    },

    deleteVisitsByDeviceId(state, action) {
      const updated = state.filter((v) => v.deviceId !== action.payload);
      localStorage.setItem("serviceVisits", JSON.stringify(updated));
      return updated;
    },
  },
});

export const {
  addServiceVisit,
  updateServiceVisit,
  deleteServiceVisit,
  deleteVisitsByDeviceId,
  markServiceDone,
} = serviceVisitsSlice.actions;

export default serviceVisitsSlice.reducer;
