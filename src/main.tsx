import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './main.css';
import '@fontsource/roboto';
import '@fontsource/roboto/500.css';
import DashboardLayout from '~/routes/dashboard/layout';
import Dashboard, { loader as dashboardLoader } from '~/routes/dashboard/index';
import ErrorPage, { loader as errorLoader } from '~/routes/error-page';
import UserList from '~/routes/user-list';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <UserList />,
          },
          {
            path: '/dashboard/:userId',
            element: <Dashboard />,
            loader: dashboardLoader,
          },
          {
            path: '/*',
            element: <></>,
            loader: errorLoader,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
