import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import NavigateButton from '../../components/NavigateButton';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { MAIL_REGEX } from '../../components/constants';
import { url } from '../../components/constants';
import translations from '../../Resources/translations';

function SignIn({ setSignedIn, signedIn, language }) {

  const defaultTheme = createTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');


  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

    const handleSubmit = async (data) => {

        data.preventDefault();
        
          const formData = new FormData(data.target);
          const email = formData.get("email");
          const password = formData.get("password");

      if (!MAIL_REGEX.test(email)) {
          setError(translations[language]['invalidEmail']);
          return;
      }
      setError(''); 

    
      await axios.post(url + '/api/v1/auth/signin', {
        email: email,
        password: password
      }).then(response => {
        console.log("Fetch operation was successful" , response);
        setSnackbarMessage(translations[language]['loginSuccess']);
        setSnackbarOpen(true);
        localStorage.setItem("name", response.data.userDto.name);
        localStorage.setItem("surname", response.data.userDto.surname);
        localStorage.setItem("role", response.data.userDto.role);
        localStorage.setItem("email", response.data.userDto.email);
        localStorage.setItem("department", response.data.userDto.department);
        localStorage.setItem("company", response.data.userDto.company);
        localStorage.setItem("image", response.data.userDto.image);
        localStorage.setItem("token", response.data.token);
        setSignedIn(true); 
        localStorage.setItem("signedIn", signedIn);
        console.log(response.data.userDto.company);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        setSnackbarMessage(translations[language]['loginFailed']);
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
                {translations[language]['signIn']}
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label={translations[language]['emailAddress']}
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
                  label={translations[language]['password']}
                  type="password"
                  id="password"
                  onChange={(data) => setPassword(data.target.value)}
                  autoComplete="current-password"
                />
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {translations[language]['signIn']}
                </Button>
                <Grid container>
                  <Grid item xs>
                    <NavigateButton to="/ResetPassword" buttonText={translations[language]['resetPassword']}/>
                  </Grid>
                  <Grid item>
                    <NavigateButton to="/ActivateUser" buttonText={translations[language]['activateUser']}/>
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