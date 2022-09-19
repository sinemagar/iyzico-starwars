import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {  starshipApi } from "../api/api";


//get items
export const fetchStarShips = createAsyncThunk('starships/getStarShips', async () => {
    
    const res = await axios(starshipApi);
    return res.data.results;
})
//ex img

export const starshipsSlice = createSlice({
    name: 'starships',
    initialState: {
        items: [],
    },
    reducers: {},
    extraReducers: {
        [fetchStarShips.fulfilled]: (state, action) => {
            //console.log(action.payload);
            state.items = action.payload;
        },
        
    }
})

export default starshipsSlice.reducer;