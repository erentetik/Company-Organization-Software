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
import Translations from '../../Resources/languages';

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
          setError(Translations[language]['invalidEmail']);
          return;
      }
      setError(''); 
      const requestUrl = `${url}/api/auth/signin?email=${email}&password=${password}`;

      await axios.post(requestUrl, {
      }).then(response => {
        console.log("Fetch operation was successful" , response);
        setSnackbarMessage(Translations[language]['loginSuccessMessage']);
        setSnackbarOpen(true);
        setSignedIn(true); 
        console.log(response.data.data.userResponse.name);
        localStorage.setItem("signedIn", signedIn);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        setSnackbarMessage(Translations[language]['loginFailedMessage']);
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
                {Translations[language]['signIn']}
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label={Translations[language]['emailAddress']}
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
                  label={Translations[language]['password']}
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
                  {Translations[language]['signIn']}
                </Button>
                <Grid container>
                  <Grid item xs>
                    <NavigateButton to="/ResetPassword" buttonText={Translations[language]['resetPassword']}/>
                  </Grid>
                  <Grid item>
                    <NavigateButton to="/ActivateUser" buttonText={Translations[language]['activateUser']}/>
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