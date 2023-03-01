import { FormControl, TextField as MuiTextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';

type TextFieldProps = {
  name: string;
  label: string;
  control: Control<any>;
  errors: any;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  autoFocus?: boolean;
};

const TextField = (props: TextFieldProps) => {
  const { name, label, type, control, errors, autoComplete, autoFocus } = props;

  const error = errors[name] ? errors[name].message : null;

  return (
    <FormControl fullWidth>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <MuiTextField
            {...field}
            label={label}
            error={error != null}
            type={type ?? ''}
            autoComplete={autoComplete ?? ''}
            autoFocus={autoFocus ?? false}
            helperText={error}
            size="small"
          />
        )}
      />
    </FormControl>
  );
};

export default TextField;
