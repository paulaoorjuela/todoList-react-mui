import { useState, useEffect } from "react";
import { List, Box, Typography } from '@mui/material';
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";

const getInitialData = () => { 
    const data = JSON.parse(localStorage.getItem("todos"))
    if(!data) return []
    return data;
}

export default function TodoList() {
    const [todos, setTodos] = useState(getInitialData);

    useEffect(() =>{
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos])

    const removeTodo = (id) => {
        setTodos(prevTodos =>{
            return prevTodos.filter((t) => t.id !== id);
        })
    }

    const toggleTodo = (id) => {
        setTodos(prevTodos => {
            return prevTodos.map((todo) =>
                todo.id === id? {...todo, completed : !todo.completed } : todo
            );
        });
    }

    const addTodo = (text) => {
        setTodos(prevTodos => {
            return [...prevTodos, { id: crypto.randomUUID(), name: text, completed: false }];
        })
    }

    return (
        <Box sx={{display:"flex", justifyContent: "center", alignItems:"center", flexDirection:"column", marginTop:"50px"}}>
            <Typography variant="h2" component="h1" sx={{ flexGrow: 1, marginBottom: "5px" }}>
                To Do List
            </Typography>
            <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
                {todos.map((todo) => (
                    <TodoItem todo={todo} 
                    key={todo.id} 
                    remove={removeTodo} 
                    toggle={() => toggleTodo(todo.id)}/>
                ))}
                <TodoForm addTodo={addTodo}/>
            </List>
        </Box>
    );
}
