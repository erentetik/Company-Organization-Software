import { useRef , useState, useEffect } from 'react';
import NavigateButton from '../components/NavigateButton';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const MAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const ActivateUser = () => {
    const defaultTheme = createTheme();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!MAIL_REGEX.test(email)) {
          setError('Invalid email address');
          return;
      }
      setError(''); // Clear any previous errors
      // make an API call to back-end
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
                  onChange={(e) => setEmail(e.target.value)}
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
        </ThemeProvider>
      );
}
 
export default ActivateUser;