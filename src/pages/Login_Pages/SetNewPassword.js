import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { validatePassword } from '../../components/constants';
import { url } from '../../components/constants';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import Translations from '../../Resources/languages';


function SetNewPassword({ language }) {
    const defaultTheme = createTheme();
    const { token }  = useParams();
    const navigate = useNavigate()
    const [isLinkValid, setValid] = useState(false);
    const [isPasswordValid, setPasswordValid] = useState(true);
    const [password, setPassword] = useState('');
    const [error, setErrors] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
  
    const handleSnackbarClose = () => {
      setSnackbarOpen(false);
    };
  
    const verifyLink = async () => {
       await axios.put(url + "/api/v1/auth/set-password/" + token, {})
       .then((response) => {
           setValid(true);
           console.log("token operation was successful", response);
           setSnackbarMessage(Translations[language]['successfull']);
           setSnackbarOpen(true);
         }).catch((error) => {
            console.error('There was a problem with the token operation:', error);
            setSnackbarMessage(Translations[language]['anErrorOccured']);
            setSnackbarOpen(true);
            navigate("/");
           });
         };

    useEffect(() => {
        verifyLink();
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
      if (isPasswordValid && isLinkValid) {
          await axios.put(url + '/api/v1/auth/set-password/' + token, {
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
                {Translations[language]['enterNewPassword']}
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label={Translations[language]['password']}
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
                  {Translations[language]['setNewPassword']}
                </Button>
              </Box>
            </Box>
          </Container>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
          >
            <SnackbarContent message={snackbarMessage} />
      </Snackbar>
        </ThemeProvider>
      
      );
}

export default SetNewPassword;
