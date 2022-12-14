import React from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Stack
      paddingBottom={'20px'}
      marginBottom={'20px'}
      borderBottom={'1px solid #111'}
      justifyContent={'space-between'}
      direction={'row'}
    >
      <Typography
        sx={{ cursor: 'pointer' }}
        onClick={() => navigate('/')}
        variant="h5"
        component="h2"
      >
        weather app
      </Typography>
      {pathname !== '/new'
        ? (
        <Button
          onClick={() => navigate('/new')}
          color="primary"
          variant="contained"
        >
          Add new
        </Button>
          )
        : null}
    </Stack>
  );
}
