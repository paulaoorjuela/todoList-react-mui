import { useState, useEffect } from "react";
import { List, Box, Typography, Tabs, Tab, TextField, Button, IconButton } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
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
            [currentList]: [...(prevLists[currentList] || []), { id: crypto.randomUUID(), name: text, completed: false }]
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

    const deleteList = (listName) => {
        setTodoLists(prevLists => {
            const updatedLists = { ...prevLists };
            delete updatedLists[listName];
    
            const remainingLists = Object.keys(updatedLists);
            setCurrentList(remainingLists[0] || ""); // Update immediately
    
            return updatedLists;
        });
    };

    useEffect(() => {
        const remainingLists = Object.keys(todoLists);
        if (!remainingLists.includes(currentList)) {
            setCurrentList(remainingLists[0] || ""); // Switch to first list or reset
        }
    }, [todoLists, currentList]);

    return (
        <Box sx={{display:"flex", justifyContent: "center", alignItems:"center", flexDirection:"column", marginTop:"50px"}}>
            <Typography variant="h2" component="h1" sx={{ flexGrow: 1, marginBottom: "5px" }}>
                To Do List
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "90vw", overflowX: "auto" }}>
                <Tabs
                    value={Object.keys(todoLists).includes(currentList) ? currentList : false} 
                    onChange={(e, newValue) => setCurrentList(newValue)}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{ width: "100%" }}
                >
                    {Object.keys(todoLists).map(list => (
                        <Tab key={list} value={list} label={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                        {list} 
                            <CloseIcon sx={{ marginLeft:"15px" }} fontSize="small" color="error" onClick={(e) => { 
                            e.stopPropagation(); // Prevent tab switch when clicking delete
                            deleteList(list); 
                            }} />
                    </Box>} />
                    ))}
                </Tabs>
            </Box>
            
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
                    edit={editTodo}
                    />
                ))}
                <TodoForm addTodo={addTodo}/>
            </List>
        </Box>
    );
}
