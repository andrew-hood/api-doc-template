import { configureStore } from "@reduxjs/toolkit";
import errorsReducer from "src/components/features/Errors/reducer";
import authReducer from "src/components/features/Auth/reducer";

export default configureStore({
  reducer: {
    errors: errorsReducer,
    auth: authReducer,
  },
});
