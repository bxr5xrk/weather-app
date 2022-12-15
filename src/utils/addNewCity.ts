import { ICity } from '../types';

interface ExpectedData {
  name: string
  main: {
    feels_like: number
    temp: number
  }
  weather: [{
    description: string
  }]
  wind: {
    speed: number
  }
  id: number
}

const returnUniqueItems = (data: ICity[]) =>
  data.filter((a, i) => data.findIndex((s: ICity) => a.id === s.id) === i);

export const addNewCity = (oldData: ICity[], newData: ExpectedData) => {
  const newCity = {
    title: newData.name,
    feelsLike: newData.main.feels_like,
    temp: newData.main.temp,
    weather: newData.weather[0].description,
    wind: newData.wind.speed,
    id: newData.id,
  };

  if (oldData.length < 2) {
    if (oldData.length === 1) {
      const isExist = newCity.id === oldData[0].id;

      return {
        newData: isExist ? [newCity] : [...oldData, newCity],
      };
    } else {
      return {
        newData: [newCity],
      };
    }
  } else {
    const copy = [...oldData];
    const isIncludes = copy.find((i) => i.id === newCity.id);

    if (isIncludes) {
      const index = copy.indexOf(isIncludes);
      copy.splice(index, 1, newCity);

      return {
        newData: returnUniqueItems(copy),
      };
    } else {
      return {
        newData: returnUniqueItems([...oldData, newCity]),
      };
    }
  }
};
