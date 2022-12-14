/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useSelector, useDispatch } from 'react-redux';
import { selectCities, setCities } from '../../features/cities/citiesSlice';
import { fetchApi } from '../../features/cities/citiesService';
import { addNewCity } from '../../utils/addNewCity';

export default function CreateNew() {
  const { cities } = useSelector(selectCities);
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }

    if (value.length < 2) {
      setMessage('Too short city name.');
      return null;
    }

    const request = await fetchApi({ city: value });
    if (request.message) {
      setMessage(request.message);
      return null;
    }

    const { newData } = addNewCity(cities, request);

    if (newData != null) {
      localStorage.setItem('items', JSON.stringify(newData));
      dispatch(setCities(newData));

      setMessage(`${value} city successfully added to list!`);
    } else {
      setMessage('Wrong data :( Please try again.');
    }
    setValue('');
  };

  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      flexDirection="column"
      alignItems={'center'}
      paddingX={'400px'}
    >
      <Box minWidth="700px">
        <form
          style={{ width: '100%', position: 'relative' }}
          onSubmit={async (e) => await handleSubmit(e)}
        >
          <TextField
            id="outlined-basic"
            label="Enter city name"
            variant="outlined"
            fullWidth
            color="primary"
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <ArrowForwardIcon
            type="submit"
            onClick={async () => await handleSubmit()}
            style={{
              cursor: 'pointer',
              position: 'absolute',
              top: '15px',
              right: '12px',
            }}
          />
        </form>

        <Typography
          textAlign="center"
          mt={'40px'}
          color="primary"
          variant="h5"
          component="h3"
        >
          {message ?? 'Enter the name of the city above.'}
        </Typography>
      </Box>
    </Box>
  );
}
