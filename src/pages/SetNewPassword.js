import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { validatePassword } from './constants';
import { url } from './constants';
import axios from 'axios';

import { useNavigate, useParams } from "react-router-dom";

function SetNewPassword() {
    const defaultTheme = createTheme();
    const { token }  = useParams();
    const navigate = useNavigate()
    const [isLinkValid, setValid] = useState(false);
    const [isPasswordValid, setPasswordValid] = useState(true);
    const [password, setPassword] = useState('');
    const [error, setErrors] = useState('');

    // const verifyLink = async () => {
    //   await axios.post(url + "/api/v1/auth/set-password" )
    //     .then((response) => {
    //       // continue to site
    //       setValid(true);
    //     }).catch((error) => {
    //       setSnackbarState({
    //         snackbarOpen: true,
    //         snackbarMessage: "Token is not valid",
    //         severity: "error"
    //       });
    //       navigate("/");
    //     });
    // }
    const getToken = async () => {
      await axios.get(url + '/api/v1/auth/set-password', {
        token: token,
    }).then((response) => {
        console.log("Fetch operation was successful" , response);
    }).catch((error) => {
        console.log("There was a problem with the fetch operation:", error);
    })
  }

    useEffect(() => {
        getToken();
    }, [])
      

    const handleSubmit = async (data) => {
      data.preventDefault();
  
      const formData = new FormData(data.target);
      const password = formData.get("password");
  
      const validationErrors = validatePassword(password);
  
      if (validationErrors.length > 0) {
          setErrors(validationErrors);
          setPasswordValid(false);
          return;
      } else {
          setPasswordValid(true);
      }
  
      setErrors([]); // Clear any previous errors
      if (isPasswordValid ) {
          await axios.put(url + '/api/v1/auth/set-password', {
              token: token,
              password: password
          }).then((response) => {
              console.log("Fetch operation was successful", response);
              
              
          }).catch((error) => {
              
              console.log("There was a problem with the fetch operation:", error);
          });
          navigate("/");
      }
  };
  
    return (
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h5">
                Enter your password
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(data) => setPassword(data.target.value)}
                  error={!!error} 
                  helperText={error} 
                />
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Set new password
                </Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      
      );
}

export default SetNewPassword;
