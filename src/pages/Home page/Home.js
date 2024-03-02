import React from "react";
import { useEffect } from "react";
import { Container, Box, Typography, Button, Paper } from "@mui/material";
import LocalStorageDelete from "../../Resources/localStorage";

const Home = ({ signedIn, setSignedIn }) => {
    const name = localStorage.getItem("name");
    const surname = localStorage.getItem("surname");
    const role = localStorage.getItem("role");
    const email = localStorage.getItem("email");
    const department = localStorage.getItem("department");
    const company = localStorage.getItem("company");

    useEffect(() => {
        checkUser()
    }, [])

    const checkUser = () => {
        if (!signedIn) {
            LocalStorageDelete()
            setSignedIn(false)
        }
    }

    const handleSignOut = () => {
        LocalStorageDelete();
        setSignedIn(false);
    };
    return ( 
        <Container>
            <Box mt={4} display="flex" justifyContent="center">
                <Paper elevation={3} style={{ padding: '20px', maxWidth: '500px' }}>
                    <Typography variant="h3" align="center">Welcome to the Home Page</Typography>
                    <Typography variant="body1">Name: {name}</Typography>
                    <Typography variant="body1">Surname: {surname}</Typography>
                    <Typography variant="body1">Role: {role}</Typography>
                    <Typography variant="body1">Email: {email}</Typography>
                    <Typography variant="body1">Department: {department}</Typography>
                    <Typography variant="body1">Company: {company}</Typography>
                    <Box mt={2} display="flex" justifyContent="center">
                        <Button variant="contained" onClick={handleSignOut}>Sign Out</Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}


export default Home;
