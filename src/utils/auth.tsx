import { Navigate } from 'react-router-dom';

export const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

export const saveAuthToken = (token: string): void => {
  sessionStorage.setItem('token', token);
};

export const removeAuthToken = (): void => {
  sessionStorage.removeItem('token');
};

export const getAuthToken = (): string | null => {
  return sessionStorage.getItem('token');
};

export const ProtectRoute = ({ children }: any) => {
  const token = getAuthToken();

  if (!token) {
    return <Navigate to={'/login'} replace={true}></Navigate>;
  }

  return children;
};

export const RedirectRoute = ({ children }: any) => {
  const token = getAuthToken();

  if (token) {
    return <Navigate to={'/'} replace={true}></Navigate>;
  }

  return children;
};
