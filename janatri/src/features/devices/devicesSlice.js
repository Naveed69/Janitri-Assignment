// src/features/devices/devicesSlice.js
import { createSlice, nanoid } from "@reduxjs/toolkit";
import { deleteContractsByDeviceId } from "../contracts/contractsSlice";
import { deleteVisitsByDeviceId } from "../serviceVisits/serviceVisitsSlice";

const initialState = JSON.parse(localStorage.getItem("devices")) || [];

const devicesSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {
    addDevice: (state, action) => {
      const newDevice = {
        id: nanoid(),
        name: action.payload.name,
        serial: action.payload.serial,
        type: action.payload.type,
        facility: action.payload.facility,
        status: action.payload.status, // "Online", "Offline", "Maintenance"
        battery: action.payload.battery, // number or string like "85%"
        lastServiceDate: action.payload.lastServiceDate, // date string
        amcStatus: action.payload.amcStatus, // "AMC", "CMC", or "None"
      };
      state.push(newDevice);
      localStorage.setItem("devices", JSON.stringify(state));
    },

    updateDevice: (state, action) => {
      const index = state.findIndex((d) => d.id === action.payload.id);
      if (index !== -1) {
        state[index] = { ...action.payload };
        localStorage.setItem("devices", JSON.stringify(state));
      }
    },

    deleteDevice: (state, action) => {
      const updated = state.filter((d) => d.id !== action.payload);
      localStorage.setItem("devices", JSON.stringify(updated));
      return updated;
    },
  },
});

export const { addDevice, updateDevice, deleteDevice } = devicesSlice.actions;

export const deleteDeviceAndContracts = (deviceId) => (dispatch) => {
  dispatch(deleteDevice(deviceId));
  dispatch(deleteContractsByDeviceId(deviceId));
  dispatch(deleteVisitsByDeviceId(deviceId));
};

export default devicesSlice.reducer;
