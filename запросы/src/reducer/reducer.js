import { createSlice } from "@reduxjs/toolkit";
import { getData } from "../api/api";

const reducer = createSlice({
    name: 'reducer',
    initialState: {
        todo: [],
        loading: false
    },

    reducers: {},
    
    extraReducers: (builder) => {
        builder.addCase(getData.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getData.fulfilled, (state, action) => {
            state.loading = false;
            state.todo = action.payload
        });
        builder.addCase(getData.rejected, (state, action) => {
            state.loading = false;
        })
    }
})

export default reducer.reducer
export const { } = reducer.actions