import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { ValidationError } from 'express-validator';
import { ValidationErrorMessage } from '../helpers/constants';
import { passwordRegex } from '../utils/auth';
import TextField from './TextField';

type FormData = yup.InferType<typeof schema>;

type PasswordChangeFormProps = {
  sendPasswordChangeRequest: (
    formData: any
  ) => Promise<ValidationError[] | boolean>;
};

const schema = yup.object({
  password: yup
    .string()
    .label('Password')
    .required(ValidationErrorMessage.missing('password')),
  newPassword: yup
    .string()
    .label('New password')
    .required(ValidationErrorMessage.missing('new password'))
    .matches(
      passwordRegex,
      ValidationErrorMessage.weakPassword('new password')
    ),
  confirmationPassword: yup
    .string()
    .label('Confirmation password')
    .required(ValidationErrorMessage.missing('confirmation password'))
    .oneOf(
      [yup.ref('newPassword')],
      ValidationErrorMessage.doNotMatch('confirmation password', 'new password')
    ),
});

const PasswordChangeForm = (props: PasswordChangeFormProps) => {
  const {
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    control,
  } = useForm<FormData>({
    defaultValues: {
      password: '',
      newPassword: '',
      confirmationPassword: '',
    },
    resolver: yupResolver(schema),
  });

  const submitHandler = async (formData: FormData): Promise<void> => {
    const result = await props.sendPasswordChangeRequest(formData);

    if (result === true) {
      reset();
      return;
    } else if (Array.isArray(result)) {
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
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            control={control}
            errors={errors}
            autoFocus={true}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="newPassword"
            label="New Password"
            type="password"
            autoComplete="new-password"
            control={control}
            errors={errors}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="confirmationPassword"
            label="Repeat your new password"
            type="password"
            autoComplete="new-password"
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
        Change password
      </Button>
    </Box>
  );
};

export default PasswordChangeForm;
