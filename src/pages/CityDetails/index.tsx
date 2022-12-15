/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetCityForecastQuery } from '../../features/cities/citiesService';
import { kFormatter, tempFormatter } from '../../utils/formatters';
import Forecast from './components/Forecast';

export default function CityDetails() {
  const { id } = useParams();

  const { data, isLoading } = useGetCityForecastQuery(Number(id));

  const weather = data?.list[0];

  document.title = data ? data.city.name : '';

  return (
    <Box data-testid="details" width="100%" height="100%">
      {isLoading
        ? (
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
          )
        : null}

      {data !== undefined && weather !== undefined
        ? (
        <Box display="flex" flexDirection="column" flex="1">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography color="gray" variant="h4" component="h2">
              {weather.weather[0].description}
            </Typography>
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="img"
              width="80px"
              height="80px"
            />
          </Box>
          <Typography data-testid="title" color="primary" variant="h1" component="h2">
            {data.city.name}, {data.city.country}
          </Typography>

          <Typography variant="h4" component="h3">
            {tempFormatter(weather.main.temp)}
          </Typography>
          <Box
            width="100%"
            display="flex"
            sx={{ flexDirection: { md: 'row', xs: 'column' }, gap: { xs: '20px', md: '0' } }}
            justifyContent="space-between"
          >
            <Box display="flex" flexDirection="row" gap="50px">
              <Stack mt="20px" spacing={4} direction="column">
                <Typography variant="h4" component="h3">
                  {`Feels like: ${tempFormatter(weather.main.feels_like)}`}
                </Typography>
                <Typography variant="h4" component="h3">
                  {`Wind: ${weather.wind.speed}m/s`}
                </Typography>
                <Typography variant="h4" component="h3">
                  {`Visibility: ${kFormatter(weather.visibility)}k/m`}
                </Typography>
                <Typography variant="h4" component="h3">
                  {`Humidity: ${weather.main.humidity}%`}
                </Typography>
              </Stack>
            </Box>
            <Forecast />
          </Box>
        </Box>
          )
        : null}
    </Box>
  );
}
