import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { weatherApi } from '../features/AddNewCity/AddNewCityService';
import citiesSlice from '../features/cities/citiesSlice';

export const store = configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
    cities: citiesSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;
