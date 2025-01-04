import { configureStore } from "@reduxjs/toolkit";
import WheatherSlice from "../WheatherDashboard/WheatherSlice";

const store = configureStore(() => {
  reducer: {
    wheatherData: WheatherSlice;
  }
});

export default store;
