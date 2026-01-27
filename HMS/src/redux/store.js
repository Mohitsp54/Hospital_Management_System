import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import patientReducer from "./slices/patientSlice";
import userReducer from "./slices/userSlice";
import roleReducer from "./slices/roleSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    patient: patientReducer,
    user: userReducer,
    role: roleReducer,
  },
});
