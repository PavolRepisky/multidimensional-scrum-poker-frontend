import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import { PageNotFound } from './pages/PageNotFound';
import PasswordChange from './pages/PasswordChange';
import Registration from './pages/Registration';
import { ProtectRoute, RedirectRoute } from './utils/auth';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/register',
    element: (
      <RedirectRoute>
        <Registration />
      </RedirectRoute>
    ),
  },
  {
    path: '/login',
    element: (
      <RedirectRoute>
        <Login />
      </RedirectRoute>
    ),
  },
  {
    path: '/password',
    element: (
      <ProtectRoute>
        <PasswordChange />
      </ProtectRoute>
    ),
  },
  {
    path: '*',
    element: <PageNotFound></PageNotFound>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
