import { AlertColor, Alert as MuiAlert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';

type AlertProps = {
  open: boolean;
  severity: AlertColor;
  message: string;
  onClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
};

const Alert = (props: AlertProps) => {
  return (
    <Snackbar
      open={props.open}
      autoHideDuration={6000}
      onClose={props.onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <MuiAlert
        onClose={props.onClose}
        variant="filled"
        severity={props.severity}
      >
        {props.message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;
