import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/Auth/authSlice";
import newsReducer from "../features/News/newsClice";
import commentReducer from "../features/Detail/commentClice";

const rootReducer = {
  auth: authReducer,
  news: newsReducer,
  comment: commentReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
