// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/candidate/loginslice.js";
import employAuthReducer from "../features/employ/employAuthSlice.js"

const store = configureStore({
  reducer: {
    auth: authReducer,
    employAuth: employAuthReducer

  },
  
});

export default store;
