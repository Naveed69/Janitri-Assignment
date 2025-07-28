import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("contracts")) || [];

const contractsSlice = createSlice({
  name: "contracts",
  initialState,
  reducers: {
    addContract: {
      reducer(state, action) {
        state.push(action.payload);
        localStorage.setItem("contracts", JSON.stringify(state));
      },
      prepare(contract) {
        return {
          payload: {
            id: nanoid(),
            ...contract,
          },
        };
      },
    },

    updateContract(state, action) {
      const index = state.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
        localStorage.setItem("contracts", JSON.stringify(state));
      }
    },

    deleteContract(state, action) {
      const updated = state.filter((c) => c.id !== action.payload);
      localStorage.setItem("contracts", JSON.stringify(updated));
      return updated;
    },

    deleteContractsByDeviceId(state, action) {
      const updated = state.filter((c) => c.deviceId !== action.payload);
      localStorage.setItem("contracts", JSON.stringify(updated));
      return updated;
    },
  },
});

export const {
  addContract,
  updateContract,
  deleteContract,
  deleteContractsByDeviceId,
} = contractsSlice.actions;

export default contractsSlice.reducer;
