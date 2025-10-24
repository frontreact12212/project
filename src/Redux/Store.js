import {configureStore} from "@reduxjs/toolkit";
import TodoReducer from './Silces/TodoList.jsx';

export const store = configureStore({
    reducer: {
        todos: TodoReducer,
    }
})