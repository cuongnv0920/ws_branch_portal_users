import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/Auth/authSlice";
import newsReducer from "../features/News/newsClice";

const rootReducer = {
  auth: authReducer,
  news: newsReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
