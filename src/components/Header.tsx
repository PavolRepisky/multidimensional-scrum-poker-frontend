import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router-dom';
import { removeAuthToken } from '../utils/auth';

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeAuthToken();
    navigate('/login');
  };

  return (
    <>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Button
          variant="outlined"
          size="small"
          sx={{ marginLeft: 'auto' }}
          onClick={handleLogout}
        >
          Log out
        </Button>
      </Toolbar>
    </>
  );
}
