import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/Theme/Theme.slice.js"

export const store = configureStore({
    reducer: {
        theme: themeReducer
    }
})