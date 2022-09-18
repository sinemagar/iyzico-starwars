import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


//get items
export const fetchStarShips = createAsyncThunk('starships/getStarShips', async () => {
    const res = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}`)
    return res.data.results;
})

export const starshipsSlice = createSlice({
    name: 'starships',
    initialState: {
        items: [],
    },
    reducers: {},
    extraReducers: {
        [fetchStarShips.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.items = action.payload;
        }
    }
})

export default starshipsSlice.reducer;