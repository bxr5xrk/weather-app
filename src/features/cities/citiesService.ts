import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICityForecast } from '../../types';

// secret
const API_KEY = '4ff02532f7283368f82e4802cc107771';
const baseUrl = 'https://api.openweathermap.org/data/2.5';

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    getCityForecast: builder.query<ICityForecast, number>({
      query: (id) =>
        `forecast?cnt=9&id=${id}&units=metric&appid=${API_KEY}`
    }),
  }),
});

export const { useGetCityForecastQuery } = weatherApi;

export const getCityWeatherService = async ({
  id,
  city,
}: {
  id?: number
  city?: string
}) =>
  await fetch(
    `${baseUrl}/weather?${
      id !== undefined ? `id=${id}` : city !== undefined ? `q=${city}` : ''
    }&units=metric&&appid=${API_KEY}`
  )
    .then(async (res) => await res.json())
    .then((data) => data);
