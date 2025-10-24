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

export const addTodo = createAsyncThunk("todos/addTodo",
    async(title, {rejectWithValue})=>{
    try {
        const res = await axios.post("http://localhost:3000/list", {title})
        return res.data
    }catch (e) {
      return rejectWithValue(e.message)
    }
})
export const editTodo = createAsyncThunk("todos/editTodo",
    async ({id, title}, {rejectWithValue}) =>{
    try {
        const res = await axios.patch(`http://localhost:3000/list/${id}`, {title})
        return res.data
    }catch (e) {
        return rejectWithValue(e.message)
    }

    }
    )
export const deleteTodo = createAsyncThunk("todos/deleteTodo",
    async(id, {rejectWithValue})=>{
    try {
        const res = await axios.delete(`http://localhost:3000/list/${id}`)
        return res.data

    }catch (e) {
        return rejectWithValue(e.message)
    }
    }
)

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
            .addCase(addTodo.fulfilled, ((state, action) =>{
                state.todos.push(action.payload)
            }) )
            .addCase(editTodo.fulfilled, ((state, action) =>{
               state.todos = state.todos.map(el => el.id === action.payload.id ? action.payload : el)

            }))
            .addCase(deleteTodo.fulfilled,((state, action)=>{
                state.todos = state.todos.filter(el => el.id !== action.payload.id)
                }
            ))
    }
})


export default todoSlice.reducer;