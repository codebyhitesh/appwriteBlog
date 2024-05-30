import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./authSlice"; // Corrected import name

export const store = configureStore({
    reducer: {
        auth: authSliceReducer // Use the imported reducer directly
    }
});
