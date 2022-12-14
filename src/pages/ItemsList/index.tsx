import { Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../../components/Card';
import { selectCities } from '../../features/cities/citiesSlice';

export default function ListItems() {
  const { cities } = useSelector(selectCities);

  // console.log(cities);
  return (
    <Box display="flex" gap="30px" justifyContent="center" sx={{ flexWrap: 'wrap' }}>
      {cities.map((i) => (
        <Card key={i.id} />
      ))}
    </Box>
  );
}
