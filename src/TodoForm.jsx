import AddIcon from "@mui/icons-material/Add";
import { ListItem, TextField, InputAdornment,IconButton } from "@mui/material";

import { useState } from "react";

export default function TodoForm({addTodo}) {
    const [text, setText] = useState("");
    const handleChange = (e) => {
        setText(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        addTodo(text)
        setText("")
    }

    return (
        <ListItem>
            <form onSubmit={handleSubmit}>
            <TextField
                fullWidth
                id="outlined-basic"
                label="Add Todo"
                variant="outlined"
                value={text}
                onChange={handleChange}
                slotProps={{
                    input: {
                    endAdornment: <InputAdornment position="end">
                        <IconButton aria-label="AddTodo" edge="end" type="submit">
                            <AddIcon/>
                        </IconButton>
                    </InputAdornment>
                    }
                }}
            />
            </form>
        </ListItem>
    );
}
