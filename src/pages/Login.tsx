import { Box, Grid, Link, Paper, Typography } from '@mui/material';
import { ValidationError } from 'express-validator';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';

import Alert from '../components/Alert';
import LoadingSpinner from '../components/LoadingSpinner';
import LoginForm from '../components/LoginForm';
import {
  AlertMessage,
  AlertSeverity,
  API_BASE_URL,
} from '../helpers/constants';
import { saveAuthToken } from '../utils/auth';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const [alert, setAlert] = useState({
    open: false,
    severity: AlertSeverity.DEFAULT,
    message: AlertMessage.EMPTY,
  });

  useEffect(() => {
    if (location.state && location.state.alertOpen === true) {
      setAlert({
        open: true,
        message: location.state.alertMessage,
        severity: location.state.alertSeverity,
      });
    }
  }, [location]);

  const fetchFormData = async (formData: FormData) => {
    return await fetch(API_BASE_URL + '/users/login', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  const sendLoginRequest = async (
    formData: FormData
  ): Promise<ValidationError[] | boolean> => {
    try {
      setIsLoading(true);

      const response = await fetchFormData(formData);

      if (response.ok) {
        const responseData = await response.json();
        saveAuthToken(responseData.data.token);
        navigate('/');
        return true;
      }

      if (response.status === 400) {
        const responseData = await response.json();
        return responseData.errors as ValidationError[];
      }
      throw new Error('Login request failed');
    } catch (error: any) {
      setAlert({
        open: true,
        severity: AlertSeverity.ERROR,
        message: AlertMessage.LOGIN_GENERIC_ERROR,
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const alertCloseHandler = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ): void => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert({
      open: false,
      severity: AlertSeverity.DEFAULT,
      message: AlertMessage.EMPTY,
    });
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <LoadingSpinner isLoading={isLoading} />
      <Alert
        open={alert.open}
        severity={alert.severity}
        message={alert.message}
        onClose={alertCloseHandler}
      />

      <Grid item xs={12} sm={12} md={5} component={Paper} square>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Box
            sx={{
              maxWidth: '360px',
              textAlign: 'left',
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              sx={{ fontWeight: 500, mb: '0.3rem', fontSize: '2rem' }}
            >
              Log into your account
            </Typography>
            <Typography component="p" sx={{ color: '#787777', mb: '2rem' }}>
              Welcome back! Please enter your details.
            </Typography>

            <LoginForm sendLoginRequest={sendLoginRequest} />

            <Grid container justifyContent="center" sx={{ mt: '2.5rem' }}>
              <Grid item sx={{ color: '#787777' }}>
                Don't have an account?&nbsp;
                <Link component={RouterLink} to="/register" variant="body1">
                  Register
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>

      <Grid
        item
        xs={false}
        sm={false}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'white',
          backgroundPosition: 'center',
        }}
      />
    </Grid>
  );
};

export default Login;
