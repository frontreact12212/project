import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addTodo, deleteTodo, editTodo, removeTodo} from "./Redux/Silces/TodoList.jsx";


function App() {
    const [inputValue, setInputValue] = React.useState('');
    const [editId, setEditId] = React.useState(null);
    const todos = useSelector(state => state.todo.todos)
    const dispatch = useDispatch();
    function add(){
        if(!editId){
            if(inputValue.trim()){
                dispatch(addTodo(inputValue));
                setInputValue("")
            }
        }else{
            dispatch(editTodo({id: editId, title: inputValue}))
            setEditId(null);
        }
        setInputValue("")
    }
    return (
        <div>
            <input type="text" onChange={(e)=> setInputValue(e.target.value)}
            value={inputValue} placeholder="type here" className="border"/>
            <button onClick={add}>{editId ? "save" : "add"}</button>
            <button onClick={()=> dispatch(removeTodo([]))} className="pl-4">remove</button>
            <ul>
                {todos.map(el=>{
                    return <div key={el.id} className="flex gap-2 mb-1">
                        <li>{el.title}</li>
                        <button onClick={()=> dispatch(deleteTodo(el.id))} className="bg-[red]">delete</button>
                        <button onClick={()=> {setInputValue(el.title),setEditId(el.id)}}>Edit</button>
                    </div>

                })}
            </ul>
        </div>
    );
}

export default App;