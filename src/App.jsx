import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addTodo, deleteTodo, editTodo, fetchTodos} from "./Redux/Silces/TodoList.jsx";


function App() {
    const [inputValue, setInputValue] = React.useState('');
    const [editId, setEditId] = React.useState(null);
    const {todos, loading ,error} = useSelector(state => state.todos)
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
    useEffect(() => {
        dispatch(fetchTodos())
    }, []);

    useEffect(() => {
        console.log(todos)
    }, [todos]);
    return (
        <div>
            <input type="text" onChange={(e)=> setInputValue(e.target.value)}
            value={inputValue} placeholder="type here" className="border"/>
            <button onClick={add}>{editId ? "save" : "add"}</button>
            {/*<button onClick={()=> dispatch(removeTodo([]))} className="pl-4">remove</button>*/}
            <ul>
                {
                    loading ? <li>loading</li> : error ? <li>{error}</li> : todos.length > 0 &&
                        todos.map(el=>{
                            return <div key={el.id} className="flex gap-2 mb-1">
                                <li>{el.title}</li>
                                <button onClick={()=> dispatch(deleteTodo(el.id))} className="bg-[red]">delete</button>
                                <button onClick={()=> {setInputValue(el.title),setEditId(el.id)}}>Edit</button>
                            </div>

                        })
                }
            </ul>
        </div>
    );
}

export default App;