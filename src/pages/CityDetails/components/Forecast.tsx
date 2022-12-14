import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useGetCityForecastQuery } from '../../../features/cities/citiesService';
import { Main, Weather } from '../../../types';

function createData(
  time: string,
  temp: number,
  description: string,
  id: number,
) {
  return { time, temp, description, id };
}

interface ReceivedData {
  dt_txt: string
  main: Main
  weather: Weather[]
  dt: number
}

interface TableData {
  time: string
  temp: number
  description: string
  id: number
}

const cellData = [
  {
    id: 1,
    title: 'Next 24 hours',
  },
  {
    id: 2,
    title: '',
  },
  {
    id: 3,
    title: '',
  },
];

export default function Forecast() {
  const { lat, lon } = useParams();
  const { data } = useGetCityForecastQuery<{ data: { list: ReceivedData[] } }>({
    lat: Number(lat) ?? 0,
    lon: Number(lon) ?? 0,
  });
  const forecast = data?.list.slice(0, 8);

  const rows: TableData[] = useMemo(() => [], [data]);

  forecast?.map((i) =>
    rows.push(
      createData(
        i.dt_txt.split(' ')[1],
        i.main.temp,
        i.weather[0].description,
        i.dt
      )
    )
  );

  return (
    <TableContainer sx={{ maxWidth: 500 }} component={Paper}>
      <Table sx={{ maxWidth: 500 }} size="small" aria-label="forecast">
        <TableHead>
          <TableRow>
            {cellData.map((i) => (
              <TableCell key={i.id}>{i.title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={`${row.id}${row.time}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{row.time}</TableCell>
              <TableCell>{String(row.temp).slice(0, 1) !== '-' ? `+${row.temp}` : row.temp}°C</TableCell>
              <TableCell>{row.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
