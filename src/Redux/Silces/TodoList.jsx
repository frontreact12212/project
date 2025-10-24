import {createSlice} from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: "Todos",
    initialState: {
        todos: [
            {
                id: 1,
                title: 'Hello Ashxarh',
            }
        ],
    },
    reducers: {
        addTodo: (state, action) => {
            state.todos.push({
                id: Math.random(),
                title: action.payload
            })
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter(el => el.id !== action.payload)
        },
        removeTodo: (state, action) => {
            state.todos = action.payload
        },
        editTodo: (state, action) => {
            state.todos = state.todos.map(el => el.id === action.payload.id ? {id: action.payload.id, title: action.payload.title} : el)
        }
    }
})

export const {addTodo, deleteTodo,removeTodo,editTodo} = todoSlice.actions;
export default todoSlice.reducer;