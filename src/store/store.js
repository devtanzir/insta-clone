import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./features/postSlice";

const store = configureStore({
  reducer: {
    post: postSlice,
  },
  middleware: (GetDefaultMiddleware) => GetDefaultMiddleware(),
  devTools: true,
});



export default store;
