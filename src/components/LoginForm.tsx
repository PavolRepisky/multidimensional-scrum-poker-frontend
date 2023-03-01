import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid } from '@mui/material';
import { ValidationError } from 'express-validator';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { ValidationErrorMessage } from '../helpers/constants';
import TextField from './TextField';

type FormData = yup.InferType<typeof schema>;

type LoginFormProps = {
  sendLoginRequest: (formData: any) => Promise<ValidationError[] | boolean>;
};

const schema = yup.object({
  email: yup
    .string()
    .label('Email address')
    .required(ValidationErrorMessage.missing('email address')),
  password: yup
    .string()
    .label('Password')
    .required(ValidationErrorMessage.missing('password')),
});

const LoginForm = (props: LoginFormProps) => {
  const {
    handleSubmit,
    formState: { errors },
    setError,
    control,
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const submitHandler = async (formData: FormData) => {
    const result = await props.sendLoginRequest(formData);

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
        <Grid item xs={12}>
          <TextField
            name="email"
            label="Email address"
            type="email"
            autoComplete="email"
            control={control}
            errors={errors}
            autoFocus={true}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
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
        Log In
      </Button>
    </Box>
  );
};

export default LoginForm;
