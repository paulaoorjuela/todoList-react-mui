import { useState, useEffect } from "react";
import useTodoLogic from "./hooks/useTodoLogic";
import { List, Box, Typography, Tabs, Tab, TextField, Button, IconButton } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import TabsList from "./TabsList";


export default function TodoList() {
    const {
        todoLists,
        currentList,
        setCurrentList,
        editingList,
        setEditingList,
        newListName,
        setNewListName,
        addTodo,
        removeTodo,
        toggleTodo,
        editTodo,
        addNewList,
        renameList,
        deleteList,
        handleTouchStart,
        handleTouchEnd
    } = useTodoLogic();

    return (
        <Box sx={{display:"flex", justifyContent: "center", alignItems:"center", flexDirection:"column", marginTop:"50px"}}>
            <Typography variant="h2" component="h1" sx={{ flexGrow: 1, marginBottom: "5px" }}>
                To Do List
            </Typography>

            <TabsList {...{ todoLists, currentList, setCurrentList, editingList, setEditingList, newListName, setNewListName, renameList, deleteList, handleTouchStart, handleTouchEnd }} />
            
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
