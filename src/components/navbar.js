import React, { useState } from 'react';
import { AppBar, Box, Drawer, IconButton, List, ListItem, ListItemText, Toolbar, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from './AuthContext';


const NavBar = () => {

    const { handleSignOut } = useAuth();

    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const navigateTo = (route) => {
        window.location.href = `/${route}`;
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={handleDrawerOpen} // Open the Drawer when Menu icon is clicked
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Menu
                </Typography>
               
                    <Box>
                        <Button 
                            variant="contained" 
                            onClick={handleSignOut} 
                            color="secondary">
                            Sign Out
                        </Button>
                    </Box>
                
            </Toolbar>
            <Drawer anchor="left" open={open} onClose={handleDrawerClose}>
                <List>
                    {['Home', 'Users', 'Companies', 'Cities', 'Regions', 'Towns'].map(
                        (text) => (
                            <ListItem button key={text} onClick={() => navigateTo(text)}>
                                <ListItemText primary={text} />
                            </ListItem>
                        )
                    )}
                </List>
            </Drawer>
        </AppBar>
    );
};

export default NavBar;
