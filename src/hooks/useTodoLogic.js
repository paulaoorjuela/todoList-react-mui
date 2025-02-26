import { useState, useEffect } from "react";

export default function useTodoLogic() {
    const getInitialData = () => {
        const data = JSON.parse(localStorage.getItem("todoLists"));
        return data || {};
    };

    const [todoLists, setTodoLists] = useState(getInitialData);
    const [currentList, setCurrentList] = useState(Object.keys(todoLists)[0] || "");
    const [editingList, setEditingList] = useState(null);
    const [newListName, setNewListName] = useState("");
    const [touchTimer, setTouchTimer] = useState(null);

    useEffect(() => {
        localStorage.setItem("todoLists", JSON.stringify(todoLists));
    }, [todoLists]);

    useEffect(() => {
        const remainingLists = Object.keys(todoLists);
        if (!remainingLists.includes(currentList)) {
            setCurrentList(remainingLists[0] || ""); 
        }
    }, [todoLists, currentList]);

    const addTodo = (text) => {
        setTodoLists(prevLists => ({
            ...prevLists,
            [currentList]: [...(prevLists[currentList] || []), { id: crypto.randomUUID(), name: text, completed: false }]
        }));
    };

    const removeTodo = (id) => {
        setTodoLists(prevLists => ({
            ...prevLists,
            [currentList]: prevLists[currentList].filter(todo => todo.id !== id)
        }));
    };

    const toggleTodo = (id) => {
        setTodoLists(prevLists => ({
            ...prevLists,
            [currentList]: prevLists[currentList].map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        }));
    };

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

    const renameList = (oldName, newName) => {
        if (!newName.trim() || newName === oldName || todoLists[newName]) {
            setEditingList(null);
            return;
        }

        setTodoLists(prevLists => {
            const updatedLists = { ...prevLists };
            updatedLists[newName] = updatedLists[oldName];
            delete updatedLists[oldName];
            return updatedLists;
        });

        setCurrentList(newName);
        setEditingList(null);
    };

    const deleteList = (listName) => {
        setTodoLists(prevLists => {
            const updatedLists = { ...prevLists };
            delete updatedLists[listName];
            const remainingLists = Object.keys(updatedLists);
            setCurrentList(remainingLists[0] || "");
            return updatedLists;
        });
    };

    const handleTouchStart = (list) => {
        const timer = setTimeout(() => {
            setEditingList(list);
            setNewListName(list);
        }, 500);
        setTouchTimer(timer);
    };

    const handleTouchEnd = () => {
        clearTimeout(touchTimer);
    };

    return {
        todoLists,
        currentList,
        editingList,
        newListName,
        setNewListName,
        setCurrentList,
        setEditingList,
        addTodo,
        removeTodo,
        toggleTodo,
        editTodo,
        addNewList,
        renameList,
        deleteList,
        handleTouchStart,
        handleTouchEnd,
    };
}