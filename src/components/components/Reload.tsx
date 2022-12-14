/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import ReplayIcon from '@mui/icons-material/Replay';
import { fetchApi } from '../../features/cities/citiesService';
import { addNewCity } from '../../utils/addNewCity';
import { useSelector, useDispatch } from 'react-redux';
import { selectCities, setCities } from '../../features/cities/citiesSlice';
import { Coords } from '../../types';

interface ReloadProps {
  coords: Coords
}

export default function Reload({ coords }: ReloadProps) {
  const { cities } = useSelector(selectCities);
  const dispatch = useDispatch();

  const onReload = async () => {
    const request = await fetchApi({ coords });

    const { newData } = addNewCity(cities, request);
    if (newData != null) {
      localStorage.setItem('items', JSON.stringify(newData));
      dispatch(setCities(newData));
    }
  };

  return <ReplayIcon sx={{ cursor: 'pointer' }} onClick={onReload} />;
}
