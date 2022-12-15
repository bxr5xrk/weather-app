import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './Card';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import CityDetails from '../pages/CityDetails';
import userEvent from '@testing-library/user-event';

const data = {
  title: 'title 1',
  feelsLike: 20,
  temp: 17,
  weather: 'description',
  wind: 7000,
  id: 1225424,
};

describe('test card', () => {
  test('renders card', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Card
            title={data.title}
            temp={data.temp}
            feelsLike={data.feelsLike}
            weather={data.weather}
            wind={data.wind}
            id={data.id}
          />
        </Provider>
      </BrowserRouter>
    );
    const Title = screen.getByText(/title 1/i);

    expect(Title).toBeInTheDocument();
  });
  test('redirecting to city details page', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Card
            title={data.title}
            temp={data.temp}
            feelsLike={data.feelsLike}
            weather={data.weather}
            wind={data.wind}
            id={data.id}
          />
          <CityDetails />
        </Provider>
      </BrowserRouter>
    );

    const Button = screen.getByText(/more/i);
    expect(Button).toBeInTheDocument();
    void userEvent.click(Button)

    expect(screen.getByTestId('details')).toBeInTheDocument();
  });
});
