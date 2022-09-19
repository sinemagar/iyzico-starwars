import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { starshipApi } from "../api/api";

//const page=1
//get items
export const fetchStarShips = createAsyncThunk(
    "starships/getStarShips",
    async (page = 1) => {
        const res = await axios(`${starshipApi}/?page=${page}&format=json`);
        return res.data.results;
    }
);

export const starshipsSlice = createSlice({
    name: "starships",
    initialState: {
        items: [],
        isLoading: false,
        page: 1,
    },
    reducers: {},
    extraReducers: {
        [fetchStarShips.pending]: (state, action) => {
            state.isLoading = true;
        },
        [fetchStarShips.fulfilled]: (state, action) => {
            console.log(action);
            state.items = action.payload;
            state.isLoading = false;
            state.page += 1;
        },
        [fetchStarShips.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        },
    },
});

export default starshipsSlice.reducer;
