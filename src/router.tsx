import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import CityDetails from './pages/CityDetails';
import CreateNew from './pages/CreateNew';
import ListItems from './pages/ItemsList';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <ListItems />,
      },
      {
        path: 'new',
        element: <CreateNew />,
      },
      {
        path: 'details/lat=:lat&lon=:lon',
        element: <CityDetails />,
      },
    ],
  },
]);
