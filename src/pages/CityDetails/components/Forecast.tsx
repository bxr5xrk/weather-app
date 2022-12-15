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
import { tempFormatter } from '../../../utils/formatters';

function createData(
  time: string,
  temp: number,
  description: string,
  id: number
) {
  return { time, temp, description, id };
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
  const { id } = useParams();
  const { data } = useGetCityForecastQuery(Number(id));
  const forecast = data?.list;

  const rows: TableData[] = useMemo(() => [], [data]);

  useMemo(
    () =>
      forecast?.map((i) =>
        rows.push(
          createData(
            i.dt_txt.split(' ')[1],
            i.main.temp,
            i.weather[0].description,
            i.dt
          )
        )
      ),
    [data]
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
              <TableCell>{tempFormatter(row.temp)}</TableCell>
              <TableCell>{row.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
