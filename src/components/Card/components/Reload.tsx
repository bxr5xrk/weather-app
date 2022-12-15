/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import ReplayIcon from '@mui/icons-material/Replay';
import { getCityWeatherService } from '../../../features/cities/citiesService';
import { addNewCity } from '../../../utils/addNewCity';
import { useSelector, useDispatch } from 'react-redux';
import { selectCities, setCities } from '../../../features/cities/citiesSlice';

interface ReloadProps {
  id: number
}

export default function Reload({ id }: ReloadProps) {
  const { cities } = useSelector(selectCities);
  const dispatch = useDispatch();

  const onReload = async () => {
    const request = await getCityWeatherService({ id });

    const { newData } = addNewCity(cities, request);
    if (newData != null) {
      localStorage.setItem('items', JSON.stringify(newData));
      dispatch(setCities(newData));
    }
  };

  return <ReplayIcon sx={{ cursor: 'pointer' }} onClick={onReload} />;
}
