import { addNewCity } from './addNewCity';

const firstData = {
  oldData: [
    {
      title: 'title 1',
      feelsLike: 20,
      temp: 17,
      weather: 'description',
      wind: 7000,
      id: 1225424,
    },
    {
      title: 'title 2',
      feelsLike: 20,
      temp: 17,
      weather: 'description',
      wind: 7000,
      id: 2225894,
    },
  ],
  toBe: [
    {
      title: 'title 1',
      feelsLike: 20,
      temp: 17,
      weather: 'description',
      wind: 7000,
      id: 1225424,
    },
    {
      title: 'title 2',
      feelsLike: 20,
      temp: 17,
      weather: 'description',
      wind: 7000,
      id: 2225894,
    },
  ],
};

const secondData = {
  oldData: [
    {
      title: 'title 1',
      feelsLike: 20,
      temp: 17,
      weather: 'description',
      wind: 7000,
      id: 1225424,
    },
  ],
  toBe: [
    {
      title: 'title 1',
      feelsLike: 20,
      temp: 17,
      weather: 'description',
      wind: 7000,
      id: 1225424,
    },
    {
      title: 'title 2',
      feelsLike: 20,
      temp: 17,
      weather: 'description',
      wind: 7000,
      id: 8765432,
    },
  ],
};

describe('Validation city data', () => {
  test('check adding a new city', () => {
    expect(
      addNewCity(firstData.oldData, {
        name: 'title 2',
        main: {
          feels_like: 20,
          temp: 17,
        },
        weather: [
          {
            description: 'description',
          },
        ],
        wind: {
          speed: 7000,
        },
        id: 2225894,
      })
    ).toStrictEqual({
      newData: firstData.toBe,
    });
  });
  test('check adding a repeating city', () => {
    expect(
      addNewCity(secondData.oldData, {
        name: 'title 2',
        main: {
          feels_like: 20,
          temp: 17,
        },
        weather: [
          {
            description: 'description',
          },
        ],
        wind: {
          speed: 7000,
        },
        id: 8765432,
      })
    ).toStrictEqual({
      newData: secondData.toBe,
    });
  });
});
