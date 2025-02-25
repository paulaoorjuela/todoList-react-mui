import { useState, useEffect } from "react";
import { List, Box, Typography, Tabs, Tab, TextField, Button } from '@mui/material';
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";

const getInitialData = () => { 
    const data = JSON.parse(localStorage.getItem("todoLists"))
    if(!data) return []
    return data;
}

export default function TodoList() {
    const [todoLists, setTodoLists] = useState(getInitialData);
    const [currentList, setCurrentList] = useState(Object.keys(todoLists)[0]);
    const [newListName, setNewListName] = useState("");

    useEffect(() =>{
        localStorage.setItem("todoLists", JSON.stringify(todoLists));
    }, [todoLists])

    const addTodo = (text) => {
        setTodoLists(prevLists  => ({
            ...prevLists,
            [currentList]: [...prevLists[currentList], { id: crypto.randomUUID(), name: text, completed: false }]
        }))
    }

    const removeTodo = (id) => {
        setTodoLists(prevLists => ({
            ...prevLists,
            [currentList]: prevLists[currentList].filter(todo => todo.id !== id)
        }))
    }

    const toggleTodo = (id) => {
        setTodoLists(prevLists  => ({
            ...prevLists,
            [currentList]: prevLists[currentList].map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        }));
    }

    const editTodo = (id, newText) => {
        setTodoLists(prevLists => ({
            ...prevLists,
            [currentList]: prevLists[currentList].map(todo =>
                todo.id === id ? { ...todo, name: newText } : todo
            )
        }));
    };

    const addNewList = () => {
        if (newListName.trim() && !todoLists[newListName]) {
            setTodoLists(prevLists => ({ ...prevLists, [newListName]: [] }));
            setNewListName("");
            setCurrentList(newListName);
        }
    };

    

    return (
        <Box sx={{display:"flex", justifyContent: "center", alignItems:"center", flexDirection:"column", marginTop:"50px"}}>
            <Typography variant="h2" component="h1" sx={{ flexGrow: 1, marginBottom: "5px" }}>
                To Do List
            </Typography>

            <Tabs value={currentList} onChange={(e, newValue) => setCurrentList(newValue)}>
                {Object.keys(todoLists).map(list => (
                    <Tab key={list} label={list} value={list} />
                ))}
            </Tabs>

            <Box sx={{ display: "flex", marginTop: "10px" }}>
                <TextField
                    label="New List Name"
                    variant="outlined"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    size="small"
                />
                <Button variant="contained" onClick={addNewList} sx={{ marginLeft: "10px" }}>
                    Add List
                </Button>
            </Box>

            <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
                {todoLists[currentList]?.map((todo) => (
                    <TodoItem todo={todo} 
                    key={todo.id} 
                    remove={removeTodo} 
                    toggle={() => toggleTodo(todo.id)}
                    editTodo={editTodo}
                    />
                ))}
                <TodoForm addTodo={addTodo}/>
            </List>
        </Box>
    );
}
