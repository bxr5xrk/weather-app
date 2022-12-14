import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Coords, IFullCity } from '../../types';

// secret
const API_KEY = '4ff02532f7283368f82e4802cc107771';

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.openweathermap.org/data/2.5',
  }),
  endpoints: (builder) => ({
    getCityByCoords: builder.query<IFullCity, Coords>({
      query: (data: Coords) =>
        `/weather?lat=${data.lat}&lon=${data.lon}&units=metric&appid=${API_KEY}`,
    }),
    getCityForecast: builder.query({
      query: (data: Coords) =>
        `/forecast?lat=${data.lat}&lon=${data.lon}&units=metric&appid=${API_KEY}`,
    }),
  }),
});

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchApi = async ({
  coords,
  city,
}: {
  coords?: Coords
  city?: string
}) =>
  await fetch(
    `${baseUrl}?cnt=3&&${
      coords !== undefined ? `lat=${coords.lat}&lon=${coords.lon}` : city !== undefined ? `q=${city}` : ''
    }&units=metric&&appid=${API_KEY}`
  )
    .then(async (res) => await res.json())
    .then((data) => data);

export const { useGetCityForecastQuery, useGetCityByCoordsQuery } = weatherApi;
