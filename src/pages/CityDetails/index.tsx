/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetCityByCoordsQuery } from '../../features/cities/citiesService';
import { IFullCity } from '../../types';
import { kFormatter } from '../../utils/kFormatter';
import Forecast from './components/Forecast';

export default function CityDetails() {
  const { lat, lon } = useParams();
  const { data, isLoading } = useGetCityByCoordsQuery<{
    data: IFullCity
    isLoading: boolean
  }>({
    lat: Number(lat) ?? 0,
    lon: Number(lon) ?? 0,
  });

  return (
    <Box width="100%" height="100%">
      {isLoading
        ? (
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
          )
        : null}

      {data !== undefined
        ? (
        <Box display="flex" flexDirection="column" flex="1">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography color="gray" variant="h4" component="h2">
              {data.weather[0].description}
            </Typography>
            <img
              src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt="img"
              width="80px"
              height="80px"
            />
          </Box>
          <Typography color="primary" variant="h1" component="h2">
            {data.name}, {data.sys.country}
          </Typography>

          <Typography variant="h4" component="h3">
            {String(data.main.temp).slice(0, 1) !== '-' ? `+${data.main.temp}` : data.main.temp}°C
          </Typography>
          <Box width="100%" display="flex" flexDirection="row" justifyContent="space-between">
            <Box display="flex" flexDirection="row" gap="50px">
              <Stack mt="20px" spacing={4} direction="column">
                <Typography variant="h4" component="h3">
                  {`Feels like: ${data.main.feels_like}°C`}
                </Typography>
                <Typography variant="h4" component="h3">
                  {`Wind: ${data.wind.speed}m/s`}
                </Typography>
                <Typography variant="h4" component="h3">
                  {`Visibility: ${kFormatter(data.visibility)}k/m`}
                </Typography>
                <Typography variant="h4" component="h3">
                  {`Humidity: ${data.main.humidity}%`}
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
