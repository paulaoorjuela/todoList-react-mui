import { useState } from "react";
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Checkbox, IconButton, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import BackspaceIcon from '@mui/icons-material/Backspace';
import EditIcon from '@mui/icons-material/Edit';

export default function TodoItem({todo, remove, toggle, edit}){
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(todo.name);

    const labelId = `checkbox-list-label-${todo.id}`;
    // const removeTodo = () => {
    //     remove(todo.id)
    // }

    const handleEdit = () => {
        if (isEditing && newText.trim()) {
            edit(todo.id, newText);
        }
        setIsEditing(!isEditing);
    };

    return (
    <ListItem
        secondaryAction={
        <>
            <IconButton edge="end" onClick={handleEdit} color={isEditing ? "success" : "primary"}>
                {isEditing ? <SaveIcon /> : <EditIcon />}
            </IconButton>
            <IconButton sx={{ marginLeft: "15px" }} edge="end" aria-label="delete todo" onClick={() => remove(todo.id)} color="error">
                <BackspaceIcon />
            </IconButton>
        </>
        }
        disablePadding
    >
        <ListItemButton dense>
        <ListItemIcon>
            <Checkbox
            edge="start"
            checked={todo.completed}
            tabIndex={-1}
            disableRipple
            inputProps={{ "aria-labelledby": labelId }}
            onChange={toggle}
            />
        </ListItemIcon>
        {isEditing ? (
        <TextField value={newText} onChange={(e) => setNewText(e.target.value)} size="small" autoFocus /> ) : 
        ( <ListItemText id={labelId} primary={todo.name} /> )}
        </ListItemButton>
    </ListItem>
    )
}