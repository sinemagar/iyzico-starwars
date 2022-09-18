import { configureStore } from "@reduxjs/toolkit";
import starshipsSlice from "./starshipsSlice";

export const store = configureStore({
    reducer:{
        starships:starshipsSlice,
    },
})