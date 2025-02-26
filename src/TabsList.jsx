import { Tabs, Tab, TextField, IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function TabsList({ 
    todoLists, 
    currentList, 
    setCurrentList, 
    editingList, 
    setEditingList, 
    newListName, 
    setNewListName, 
    renameList, 
    deleteList, 
    handleTouchStart, 
    handleTouchEnd 
}) {
    return (
        <Box sx={{ display: "flex", alignItems: "center", width: "90vw", overflowX: "auto" }}>
            <Tabs
                value={Object.keys(todoLists).includes(currentList) ? currentList : false}
                onChange={(e, newValue) => setCurrentList(newValue)}
                variant="scrollable"
                scrollButtons="auto"
                sx={{ width: "100%" }}
            >
                {Object.keys(todoLists).map(list => (
                    <Tab
                        key={list}
                        value={list}
                        label={
                            editingList === list ? (
                                <TextField
                                    value={newListName}
                                    onChange={(e) => setNewListName(e.target.value)}
                                    onBlur={() => renameList(list, newListName)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") renameList(list, newListName);
                                        if (e.key === "Escape") setEditingList(null);
                                    }}
                                    autoFocus
                                    size="small"
                                    variant="standard"
                                />
                            ) : (
                                <Box
                                    sx={{ display: "flex", alignItems: "center" }}
                                    onDoubleClick={() => {
                                        setEditingList(list);
                                        setNewListName(list);
                                    }}
                                    onTouchStart={() => handleTouchStart(list)}
                                    onTouchEnd={handleTouchEnd}
                                >
                                    {list}
                                    <IconButton
                                        size="small"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteList(list);
                                        }}
                                    >
                                        <CloseIcon fontSize="small" color="error" />
                                    </IconButton>
                                </Box>
                            )
                        }
                    />
                ))}
            </Tabs>
        </Box>
    );
}