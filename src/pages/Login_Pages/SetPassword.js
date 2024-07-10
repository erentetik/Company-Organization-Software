import React, { useState } from 'react';
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
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

function SetPassword() {
  const defaultTheme = createTheme();
  const { token } = useParams();
  const navigate = useNavigate();
  const [isPasswordValid, setPasswordValid] = useState(true);
  const [password, setPassword] = useState('');
  const [error, setErrors] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validatePassword(password);

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setPasswordValid(false);
      return;
    } else {
      setPasswordValid(true);
      setErrors(''); // Clear any previous errors
    }
    console.log("token: ", token);
    console.log("password", password);

    try {
      const response = await axios.post('https://iD-2.eu-north-1.elasticbeanstalk.com/api/auth/activateUser', {
        token: token,
        password: password
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      console.log("Fetch operation was successful", response);
      setSnackbarMessage("Password set successfully!");
      setSnackbarOpen(true);
      navigate('/login'); // Redirect to login page after successful password set
    } catch (error) {
      if (error.response) {
        console.error('Error saving data: ', error.response.data);
        setSnackbarMessage(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        console.error('Error saving data: No response received', error.request);
        setSnackbarMessage('Error: No response from server.');
      } else {
        console.error('Error saving data: ', error.message);
        setSnackbarMessage(`Error: ${error.message}`);
      }
      setSnackbarOpen(true);
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
              onChange={(event) => setPassword(event.target.value)}
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

export default SetPassword;
