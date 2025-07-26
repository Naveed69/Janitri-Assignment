import { configureStore } from "@reduxjs/toolkit";
import devicesReducer from "./features/devices/devicesSlice";
import installationsReducer from "./features/installations/installationsSlice";
import serviceVisitsReducer from "./features/serviceVisits/serviceVisitsSlice";
const store = configureStore({
  reducer: {
    devices: devicesReducer,
    installations: installationsReducer,
    serviceVisits: serviceVisitsReducer,
  },
});

export default store;
