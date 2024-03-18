import React, { useState } from 'react';
import NavigateButton from '../../components/NavigateButton';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MAIL_REGEX } from '../../components/constants';
import { url } from '../../components/constants';
import axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Navigate } from 'react-router-dom';

function ResetPassword() {
    const defaultTheme = createTheme();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    
    const handleSubmit = async (data) => {
      data.preventDefault();
      
      const formData = new FormData(data.target);
      const email = formData.get("email");

      if (!MAIL_REGEX.test(email)) {
          setError('Invalid email address');
          return;
      }
      setError(''); 

      

      await axios.post(url + '/api/v1/auth/reset-password', {
        email: email
      }).then(response => {
        console.log("Fetch operation was successful" , response);
        setSnackbarMessage('Verification email sent');
        setSnackbarOpen(true);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        setSnackbarMessage('Failed to send verification email');
        setSnackbarOpen(true);
      });
      Navigate('/')
         
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
                Enter your email
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  onChange={(data) => setEmail(data.target.value)}
                  type='email'
                  error={!!error} // Display error state
                  helperText={error} // Show error message
                />
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Send verification email
                </Button>
                <NavigateButton to="/" buttonText="Return sign in page" fullWidth sx={{ mt: 3, mb: 2 }}/>
              </Box>
            </Box>
          </Container>
          <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={() => setSnackbarOpen(false)}
          >
            <SnackbarContent message={snackbarMessage} />
          </Snackbar>
        </ThemeProvider>
      );
}

export default ResetPassword;