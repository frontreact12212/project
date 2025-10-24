import {configureStore} from "@reduxjs/toolkit";
import TodoList from './Silces/TodoList.jsx';

export const store = configureStore({
    reducer: {
        todo: TodoList,
    }
})