import React, { useEffect, useState } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useAddNewCityQuery } from '../../features/AddNewCity/AddNewCityService';
import { useSelector, useDispatch } from 'react-redux';
import { selectCities, setCities } from '../../features/cities/citiesSlice';
import { ICity } from '../../types';

const addNewCity = (oldData: ICity[], newData: any) => {
  const newCity = {
    title: newData.name,
    clouds: newData.clouds.all,
    feelsLike: newData.main.feels_like,
    tempMax: newData.main.temp_max,
    tempMin: newData.main.temp_min,
    weather: newData.weather[0].description,
    icon: newData.weather[0].icon,
    wind: newData.wind.speed,
    id: newData.sys.id,
  };

  if (oldData.length === 0) {
    return {
      message: 'successfully added',
      newData: [newCity],
    };
  } else {
    if (oldData.map((i) => i.id).includes(newCity.id)) {
      return {
        message: 'city already includes',
        newData: null,
      };
    }

    const updatedData = [...oldData, newCity];

    return {
      message: 'successfully added',
      newData: updatedData,
    };
  }
};

export default function CreateNew() {
  const { cities } = useSelector(selectCities);
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [handleClick, setHandleClick] = useState(true);
  const {
    data: city,
    isLoading,
    isError,
  } = useAddNewCityQuery(value, {
    skip: handleClick,
  });

  if (isError && !handleClick) {
    setHandleClick(true);
    setValue('');
  }

  useEffect(() => {
    if (city !== undefined) {
      const { newData } = addNewCity(cities, city);

      if (newData != null) {
        localStorage.setItem('items', JSON.stringify(newData));
        dispatch(setCities(newData));
      }
    }
    setHandleClick(true);
    setValue('');
  }, [city]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHandleClick(false);
  };

  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      flexDirection="column"
      alignItems={'center'}
      paddingX={'400px'}
    >
      <Box>
        <form
          style={{ width: '100%', position: 'relative' }}
          onSubmit={(e) => handleSubmit(e)}
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
            onClick={() => setHandleClick(false)}
            style={{
              cursor: 'pointer',
              position: 'absolute',
              top: '15px',
              right: '12px',
            }}
          />
        </form>

        <Typography mt={'40px'} color="primary" variant="h5" component="h3">
          {isError ? 'Wrong data :(' : null}
          {isLoading ? 'Loading...' : null}
          Enter the city
        </Typography>
      </Box>
    </Box>
  );
}
