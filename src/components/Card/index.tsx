import React from 'react';
import ItemCard from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { Coords } from '../../types';
import { useNavigate } from 'react-router-dom';
import Reload from '../components/Reload';
import Delete from '../components/Delete';

interface CardProps {
  title: string
  weather: string
  temp: number
  wind: number
  feelsLike: number
  coords: Coords
  id: number
}

export default function Card({
  title,
  weather,
  temp,
  wind,
  feelsLike,
  coords,
  id,
}: CardProps) {
  const navigate = useNavigate();

  const goToLink = `details/lat=${coords.lat}&lon=${String(coords.lon)}`;

  return (
    <ItemCard sx={{ minWidth: 275 }}>
      <CardContent>
        <Box display="flex" mb="20px" alignItems="flex-start" justifyContent="space-between">
          <Box>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {weather}
            </Typography>
            <Typography variant="h5" component="div">
              {title}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap="15px">
            <Reload coords={coords} />
            <Delete id={id} />
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography sx={{ mb: 1.5 }} color="primary">
            {String(temp).slice(0, 1) !== '-' ? `+${temp}` : temp}°C
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            feels like: {feelsLike}°
          </Typography>
        </Box>
        <Typography variant="body2">wind: {wind}m/s</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => navigate(goToLink)} size="small">
          More
        </Button>
      </CardActions>
    </ItemCard>
  );
}
