import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/Theme/Theme.slice.js"
import authReducer from "../features/Authentication/state/auth.slice.js"

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        auth: authReducer
    }
})