import { Container } from '@mui/material';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

function App() {
  return (
    <Container sx={ { paddingTop: '20px', paddingBottom: '20px' } }>
      <RouterProvider router={router} />
    </Container>
  );
}

export default App;
