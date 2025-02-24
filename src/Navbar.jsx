import { AppBar, Box, Toolbar, Typography, IconButton} from '@mui/material';
import ChecklistIcon from '@mui/icons-material/Checklist';

export default function Navbar(){
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <ChecklistIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        My To Do List
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
        );
}