import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  Achievements,
  Dashboard,
  DashboardLayout,
  Help,
  History,
  HomeLayout,
  Landing,
  Login,
  Preferences,
  Register,
  Workouts,
} from './pages';
import { LoginAction } from './pages/Login';
import { registerAction } from './pages/Register';
import { Provider } from 'react-redux';
import { store } from './store';
import { ToastServiceConnector } from './components/Toast/ToastServiceConnector';
import ToastContainer from './components/Toast/ToastContainer';
import { dashboardLoader } from './pages/DashboardLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'login',
        element: <Login />,
        action: LoginAction,
      },
      {
        path: 'register',
        element: <Register />,
        action: registerAction,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: 'workouts',
            element: <Workouts />,
          },
          {
            path: 'history',
            element: <History />,
          },
          {
            path: 'achievements',
            element: <Achievements />,
          },
          {
            path: 'preferences',
            element: <Preferences />,
          },
          {
            path: 'help',
            element: <Help />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <Provider store={store}>
      <ToastServiceConnector />
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  );
};

export default App;
