import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodos = createAsyncThunk("todos/fetchTodos",
    async(_, {rejectWithValue})=> {
    try{
        const res = await axios.get("http://localhost:3000/list")
        return res.data
    }catch(error){
        return rejectWithValue(error.message)
    }
    })

const todoSlice = createSlice({
    name: "todos",
    initialState: {
        todos: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, ((state)=>{
                state.loading = true;
                state.error = null;
            }))
            .addCase(fetchTodos.fulfilled, ((state, action)=>{
                state.loading = false;
                state.todos = action.payload;
            }))
            .addCase(fetchTodos.rejected, ((state, action)=>{
                state.loading = false;
                state.error = action.payload;
            }))
    }
})


export default todoSlice.reducer;