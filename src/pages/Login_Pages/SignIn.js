import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import NavigateButton from '../../components/NavigateButton';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { MAIL_REGEX } from '../../components/constants';
import { url } from '../../components/constants';

function SignIn({ setSignedIn , language}) {
  const defaultTheme = createTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const currentLanguage = [language];
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

    const handleSubmit = async (data) => {

        data.preventDefault();
        
          const formData = new FormData(data.target);
          const email = formData.get("email");
          const password = formData.get("password");

      if (!MAIL_REGEX.test(email)) {
          setError('Invalid email address');
          return;
      }
      setError(''); 

      await axios.post(url + '/api/v1/auth/signin', {
        email: email,
        password: password
      }).then(response => {
        console.log("Fetch operation was successful" , response);
        console.log(response.data);
        setSnackbarMessage('Login successful');
        setSnackbarOpen(true);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("surname", response.data.surname);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("department", response.data.department);
        localStorage.setItem("image", response.data.image);
        setSignedIn(true);
      
    
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        setSnackbarMessage('Login failed');
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
                Sign In
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={(data) => setEmail(data.target.value)}
                  error={!!error} 
                  helperText={error} 
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={(data) => setPassword(data.target.value)}
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                 Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <NavigateButton to="/ResetPassword" buttonText="Reset Password"/>
                  </Grid>
                  <Grid item>
                    <NavigateButton to="/ActivateUser" buttonText="Activate User"/>
                  </Grid>
                </Grid>
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

export default SignIn;