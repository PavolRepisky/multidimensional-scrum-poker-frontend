import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { ValidationError } from 'express-validator';
import { ValidationErrorMessage } from '../helpers/constants';
import { passwordRegex } from '../utils/auth';
import TextField from './TextField';

type FormData = yup.InferType<typeof schema>;

type RegistrationFormProps = {
  sendRegistrationRequest: (
    formData: any
  ) => Promise<ValidationError[] | boolean>;
};

export const schema = yup.object({
  firstName: yup
    .string()
    .label('First name')
    .required(ValidationErrorMessage.missing('first name'))
    .min(3, ValidationErrorMessage.notInlength('first name', 3, 50))
    .max(50, ValidationErrorMessage.notInlength('first name', 3, 50)),
  lastName: yup
    .string()
    .label('Last name')
    .required(ValidationErrorMessage.missing('last name'))
    .min(3, ValidationErrorMessage.notInlength('last name', 3, 50))
    .max(50, ValidationErrorMessage.notInlength('last name', 3, 50)),
  email: yup
    .string()
    .label('Email address')
    .required(ValidationErrorMessage.missing('email address'))
    .email(ValidationErrorMessage.invalidEmail('email address')),
  password: yup
    .string()
    .label('Password')
    .required(ValidationErrorMessage.missing('password'))
    .matches(passwordRegex, ValidationErrorMessage.weakPassword('password')),
  confirmationPassword: yup
    .string()
    .label('Confirmation password')
    .required(ValidationErrorMessage.missing('confirmation password'))
    .oneOf(
      [yup.ref('password')],
      ValidationErrorMessage.doNotMatch('confirmation password', 'password')
    ),
});

const RegistrationForm = (props: RegistrationFormProps) => {
  const {
    handleSubmit,
    formState: { errors },
    setError,
    control,
  } = useForm<FormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmationPassword: '',
    },
    resolver: yupResolver(schema),
  });

  const submitHandler = async (formData: FormData) => {
    const result = await props.sendRegistrationRequest(formData);

    if (Array.isArray(result)) {
      result.forEach((error: ValidationError) => {
        setError(error.param as any, {
          type: 'serverValidation',
          message: error.msg,
        });
      });
    }
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(submitHandler)}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            name="firstName"
            label="First name"
            type="text"
            autoComplete="given-name"
            control={control}
            errors={errors}
            autoFocus={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="lastName"
            label="Last name"
            type="text"
            autoComplete="family-name"
            control={control}
            errors={errors}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="email"
            label="Email address"
            type="email"
            autoComplete="email"
            control={control}
            errors={errors}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="password"
            label="Password"
            type="password"
            autoComplete="new-password"
            control={control}
            errors={errors}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="confirmationPassword"
            label="Confirm your password"
            type="password"
            control={control}
            errors={errors}
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 3, textTransform: 'none' }}
      >
        Register
      </Button>
    </Box>
  );
};

export default RegistrationForm;
