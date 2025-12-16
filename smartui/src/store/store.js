// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/candidate/loginSlice.js";
import employAuthReducer from "../features/employ/employAuthSlice.js"
import jobReducer from "../features/jobs/JobSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    employAuth: employAuthReducer,
    jobs: jobReducer
  },
  
});

export default store;
