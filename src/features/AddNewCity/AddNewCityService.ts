import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// secret
const API_KEY = '4ff02532f7283368f82e4802cc107771';

export const weatherApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.openweathermap.org/data/2.5/weather?',
  }),
  endpoints: (builder) => ({
    addNewCity: builder.query({
      query: (city: string) => `&q=${city}&units=metric&appid=${API_KEY}`,
    }),
  }),
});

export const { useAddNewCityQuery, useLazyAddNewCityQuery } = weatherApi;
