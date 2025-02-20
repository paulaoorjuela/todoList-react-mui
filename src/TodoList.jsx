import { useState } from "react";
import List from '@mui/material/List';
import TodoItem from "./TodoItem";

const InitialTodos = [
  { id: "1", name: "make the bed", completed: false },
  { id: "2", name: "do homework", completed: true },
  { id: "3", name: "wash the dishes", completed: false },
  { id: "4", name: "make lunch", completed: false },
];

export default function TodoList() {
    const [todos, setTodos] = useState(InitialTodos);

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
    return (
        <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
            {todos.map((todo) => (
                <TodoItem todo={todo} 
                key={todo.id} 
                remove={removeTodo} 
                toggle={() => toggleTodo(todo.id)}/>
            ))}
        </List>
    );
}
