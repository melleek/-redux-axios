import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = 'http://localhost:3000/data'

export const getData = createAsyncThunk('getData',
    async () => {
        try {
            const { data } = await axios.get(api)
            return data
        } catch (error) {
            console.log(error);
        }
    }
)

export const deleteData = createAsyncThunk('deleteData',
    async (id, { dispatch }) => {
        try {
            const { data } = await axios.delete(`${api}/${id}`)
            dispatch(getData())
        } catch (error) {
            console.log(error);
        }
    }
)

export const addData = createAsyncThunk('addData',
    async (user, { dispatch }) => {
        try {
            const { data } = await axios.post(api, user)
            dispatch(getData())
        } catch (error) {
            console.log(error);
        }
    }
)
export const editData = createAsyncThunk('editData',
    async ({ id, user }, { dispatch }) => {
        try {
            const { data } = await axios.put(`${api}/${id}`, user)
            dispatch(getData())
        } catch (error) {
            console.log(error);
        }
    }
)


export const completedData = createAsyncThunk("completedData",
    async (user, { dispatch }) => {
        try {
            const { data } = await axios.put(`${api}/${user.id}`, {
                id: user.id,
                title: user.title,
                completed: !user.completed,
            });
            dispatch(getData());
        } catch (error) {
            console.log(error);
        }
    }
);
