import {  useState } from 'react';
import NavigateButton from '../components/NavigateButton';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import  { MAIL_REGEX }  from './constants';
import { url } from './constants';

const ActivateUser = () => {
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
      
      await axios.post(url + "/api/v1/auth/activate-user", {
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
                  onChange={(data) => setEmail(data.target.value)}
                  id="email"
                  type='email'
                  label="Email Address"
                  name="email"
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
                <NavigateButton to="/" buttonText="I already have an account" fullWidth sx={{ mt: 3, mb: 2 }}/>
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
            onClose={() => setSnackbarOpen(false)}
          >
            <SnackbarContent message={snackbarMessage} />
          </Snackbar>
        </ThemeProvider>
      );
}
 
export default ActivateUser;