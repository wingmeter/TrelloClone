import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../components/UserPanel/userSlice";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});