import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICity } from '../../types';
import { RootState } from '../../app/store';

const items = localStorage.getItem('items');
const getCities = items !== null ? JSON.parse(items) : [];

type RequestState = 'pending' | 'fulfilled' | 'rejected'

interface CitiesState {
  cities: ICity[]
  status: RequestState
}

const initialState: CitiesState = {
  cities: getCities,
  status: 'pending',
};

export const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    setCities: (state, action: PayloadAction<ICity[]>) => {
      state.cities = action.payload;
    },
  },
});

export const selectCities = (state: RootState) => state.cities;

export const { setCities } = citiesSlice.actions;

export default citiesSlice.reducer;
