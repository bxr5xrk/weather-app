import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { selectCities, setCities } from '../../../features/cities/citiesSlice';

interface DeleteProps {
  id: number
}

export default function Delete({ id }: DeleteProps) {
  const { cities } = useSelector(selectCities);
  const dispatch = useDispatch();

  const onDelete = () => {
    const updatedData = cities.filter((i) => i.id !== id);

    localStorage.setItem('items', JSON.stringify(updatedData));
    dispatch(setCities(updatedData));
  };

  return <DeleteIcon sx={{ cursor: 'pointer' }} onClick={onDelete} />;
}
