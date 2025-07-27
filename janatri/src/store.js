import { configureStore } from "@reduxjs/toolkit";
import devicesReducer from "./features/devices/devicesSlice";
import installationsReducer from "./features/installations/installationsSlice";
import serviceVisitsReducer from "./features/serviceVisits/serviceVisitsSlice";
import contractsReducer from "./features/contracts/contractsSlice";
const store = configureStore({
  reducer: {
    devices: devicesReducer,
    installations: installationsReducer,
    serviceVisits: serviceVisitsReducer,
    contracts: contractsReducer,
  },
});

export default store;
