import { Box, Container, Typography } from '@mui/material';
import { ValidationError } from 'express-validator';
import { useState } from 'react';

import Alert from '../components/Alert';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';
import PasswordChangeForm from '../components/PasswordChangeForm';
import {
  AlertMessage,
  AlertSeverity,
  API_BASE_URL,
} from '../helpers/constants';
import { getAuthToken } from '../utils/auth';

const PasswordChange = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [alert, setAlert] = useState({
    open: false,
    severity: AlertSeverity.DEFAULT,
    message: AlertMessage.EMPTY,
  });

  const fetchFormData = async (formData: FormData) => {
    const token = getAuthToken();
    return await fetch(API_BASE_URL + '/users/password', {
      method: 'PATCH',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
  };

  const sendPasswordChangeRequest = async (
    formData: FormData
  ): Promise<ValidationError[] | boolean> => {
    try {
      setIsLoading(true);

      const response = await fetchFormData(formData);

      if (response.ok) {
        setAlert({
          open: true,
          severity: AlertSeverity.SUCCESS,
          message: AlertMessage.PASSWORD_CHANGE_SUCCESS,
        });
        return true;
      }

      if (response.status === 400) {
        const responseData = await response.json();
        return responseData.errors as ValidationError[];
      }

      throw new Error('Password change request failed');
    } catch (error: any) {
      setAlert({
        open: true,
        severity: AlertSeverity.ERROR,
        message: AlertMessage.PASSWORD_CHANGE_GENERIC_ERROR,
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
    <>
      <Header />
      <LoadingSpinner isLoading={isLoading} />
      <Alert
        open={alert.open}
        severity={alert.severity}
        message={alert.message}
        onClose={alertCloseHandler}
      />

      <Container component="main" maxWidth="xs" sx={{ height: '100vh' }}>
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
              Change your password
            </Typography>
            <Typography component="p" sx={{ color: '#787777', mb: '2rem' }}>
              Please enter your current and a new passwords.
            </Typography>

            <PasswordChangeForm
              sendPasswordChangeRequest={sendPasswordChangeRequest}
            />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default PasswordChange;
