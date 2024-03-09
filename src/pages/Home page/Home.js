import React from "react";
import { useEffect } from "react";
import { Container, Box, Typography, Button, Paper } from "@mui/material";
import LocalStorageDelete from "../../Resources/localStorage";
import NavBar from "../../components/navbar";


const Home = ({ signedIn, setSignedIn }) => {
    const name = localStorage.getItem("name");
    const surname = localStorage.getItem("surname");
    const role = localStorage.getItem("role");
    const email = localStorage.getItem("email");
    const department = localStorage.getItem("department");
    const image = localStorage.getItem("image");
    const token = localStorage.getItem("token");
    
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
            <NavBar />
            <Box mt={4} display="flex" justifyContent="center">
                <Paper elevation={3} style={{ padding: '20px', maxWidth: '500px' }}>
                    <Typography variant="h3" align="center">User Information</Typography>
                    <img src={image ? image : "https://w7.pngwing.com/pngs/981/645/png-transparent-default-profile-united-states-computer-icons-desktop-free-high-quality-person-icon-miscellaneous-silhouette-symbol-thumbnail.png"} alt="User" style={{ width: '50%', borderRadius: '50%', marginBottom: '20px' }} />
                    <Typography variant="body1">Name: {name}</Typography>
                    <Typography variant="body1">Surname: {surname}</Typography>
                    <Typography variant="body1">Role: {role}</Typography>
                    <Typography variant="body1">Email: {email}</Typography>
                    <Typography variant="body1">Department: {department}</Typography>
                    <Box mt={2} display="flex" justifyContent="center">
                        <Button variant="contained" onClick={handleSignOut}>Sign Out</Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}


export default Home;
