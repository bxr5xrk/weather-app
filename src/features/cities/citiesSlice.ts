import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICity } from '../../types';
import { RootState } from '../../app/store';

const items = localStorage.getItem('items');
export const getCities = items !== null ? JSON.parse(items) : [];

interface CitiesState {
  cities: ICity[]
}

const initialState: CitiesState = {
  cities: getCities,
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
