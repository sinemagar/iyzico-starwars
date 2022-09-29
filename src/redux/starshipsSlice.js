import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { starshipApi } from "../api/api";

//const page=1
//get items


export const fetchStarShips = createAsyncThunk(
    "starships/getStarShips",
    async (page = 1) => {
        const api = `${starshipApi}/?page=${page}&format=json`
        const res = await axios(api);
        const resultsApi = res.data.results
        console.log("res.data.next:", resultsApi);

        return resultsApi;
    }
);




export const starshipsSlice = createSlice({
    name: "starships",
    initialState: {
        items: [],
        status: "idle",
        page: 1,
        hasNextPage: true,
    },
    reducers: {},
    extraReducers: {
        [fetchStarShips.pending]: (state, action) => {
            state.status = "loading";
        },
        [fetchStarShips.fulfilled]: (state, action) => {

            state.items = [...state.items, ...action.payload];
            state.status = "succeeded";
            state.page += 1;
            if (state.page === 5) {
                state.hasNextPage = false;
            }
        },
        [fetchStarShips.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        },
    },
});

export default starshipsSlice.reducer;
