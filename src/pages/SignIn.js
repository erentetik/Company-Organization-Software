import React, { useState } from 'react';
import NavigateButton from '../components/NavigateButton';
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
import { MAIL_REGEX } from './constants';
import { url } from './constants';


function SignIn() {
    const defaultTheme = createTheme();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');

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
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
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
                Sign in
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
        </ThemeProvider>
      );
    }

export default SignIn;