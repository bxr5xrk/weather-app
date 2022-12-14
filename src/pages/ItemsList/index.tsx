import React from 'react';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import Card from '../../components/Card';
import { selectCities } from '../../features/cities/citiesSlice';

export default function ListItems() {
  const { cities } = useSelector(selectCities);

  return !cities.length
    ? (
    <Box mt="300px">
      <Typography
        textAlign="center"
        color="primary"
        variant="h5"
        component="h3"
      >
        There isn&apos;t city yet.
      </Typography>
    </Box>
      )
    : (
    <Box display="flex" gap="30px" justifyContent="center" flexWrap="wrap">
      {cities.map((i) => (
        <Card
          key={i.id}
          id={i.id}
          coords={i.coords}
          title={i.title}
          weather={i.weather}
          temp={i.temp}
          wind={i.wind}
          feelsLike={i.feelsLike}
        />
      ))}
    </Box>
      );
}
