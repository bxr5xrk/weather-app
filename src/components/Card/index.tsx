import React from 'react';
import ItemCard from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Reload from './components/Reload';
import Delete from './components/Delete';
import { tempFormatter } from '../../utils/formatters';

interface CardProps {
  title: string
  weather: string
  temp: number
  wind: number
  feelsLike: number
  id: number
}

export default function Card({
  title,
  weather,
  temp,
  wind,
  feelsLike,
  id,
}: CardProps) {
  const navigate = useNavigate();

  return (
    <ItemCard sx={{ minWidth: 275 }}>
      <CardContent>
        <Box
          display="flex"
          mb="20px"
          alignItems="flex-start"
          justifyContent="space-between"
        >
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
            <Reload id={id} />
            <Delete id={id} />
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography sx={{ mb: 1.5 }} color="primary">
            {tempFormatter(temp)}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            feels like: {tempFormatter(feelsLike)}
          </Typography>
        </Box>
        <Typography variant="body2">wind: {wind}m/s</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => navigate(`details/${id}`)} size="small">
          More
        </Button>
      </CardActions>
    </ItemCard>
  );
}
