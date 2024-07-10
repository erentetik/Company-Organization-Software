import React, { useState } from 'react';
import { AppBar, Box, Container, Drawer, IconButton, List, ListItem, ListItemText, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

export const NavBar = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const navigateTo = (route) => {
        navigate(`/${route}`);
    };

    return (
        <Container>
            <Box sx={{ flexGrow: 1 }}>
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
                    </Toolbar>
                </AppBar>
                <Drawer
                    anchor="left"
                    open={open}
                    onClose={handleDrawerClose}
                >
                    <List>
                        {['HomePage', 'Users', 'Companies', 'Departments', 'Cities', 'Regions', 'Towns'].map((text) => (
                            <ListItem button key={text} onClick={() => navigateTo(text)}>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
            </Box>
        </Container>
    );
};

