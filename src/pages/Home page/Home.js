import React from "react";
import { useEffect } from "react";
import { Container, Box, Typography, Button, Paper } from "@mui/material";
import LocalStorageDelete from "../../Resources/localStorage";
import NavBar from "../../components/navbar";
import { useAuth } from "../../components/AuthContext";
import translations from "../../Resources/languages";


const Home = ({ signedIn, setSignedIn, language }) => {

    const image = localStorage.getItem("image");

    const base64String = image;

    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/jpeg' });

    const imageUrl = URL.createObjectURL(blob);

    const { handleSignOut } = useAuth();
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

 

    return ( 
        <Container>
            <NavBar handleSignOut={handleSignOut}/>
            <Box mt={4} display="flex" justifyContent="center">
                <Paper elevation={3} style={{ padding: '20px', maxWidth: '500px' }}>
                    <Typography variant="h3" align="center">{translations[language]['userInfo']}</Typography>
                    <img src={imageUrl} alt="User" style={{ width: '70%', borderRadius: '50%', marginBottom: '20px', marginLeft:'75px'  }} />
                    <Typography variant="body1">{translations[language]['name']}: {name}</Typography>
                    <Typography variant="body1">{translations[language]['surname']}: {surname}</Typography>
                    <Typography variant="body1">{translations[language]['role']}: {role}</Typography>
                    <Typography variant="body1">{translations[language]['email']}: {email}</Typography>
                    <Typography variant="body1">{translations[language]['company']}: {company}</Typography>
                    <Typography variant="body1">{translations[language]['department']}: {department}</Typography>
                </Paper>
            </Box>
        </Container>
    );
}


export default Home;