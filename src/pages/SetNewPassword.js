import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function ResetPassword() {
    const defaultTheme = createTheme();

    const [password, setPassword] = useState('');
    const [error, setErrors] = useState('');

    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

    const validatePassword = (password) => {
        const errorMessages = [];

        if (password.length < 8 || password.length > 20) {
            errorMessages.push('Password length should be between 8 and 20 characters.\n');
        }
        if (!/[A-Z]/.test(password)) {
            errorMessages.push('Password must contain at least one uppercase character.\n');
        }
        if (!/[a-z]/.test(password)) {
            errorMessages.push('Password must contain at least one lowercase character.\n');
        }
        if (!/\d/.test(password)) {
            errorMessages.push('Password must contain at least one numeric character.\n');
        }
        if (!/[@$!%*?&]/.test(password)) {
            errorMessages.push('Password must contain at least one special symbol among @$.!-+');
        }

        return errorMessages;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validatePassword(password);
        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors([]); // Clear any previous errors
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
                  onChange={(e) => setPassword(e.target.value)}
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

export default ResetPassword;
