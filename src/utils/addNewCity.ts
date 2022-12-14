import { ICity } from '../types';

const returnUniqueItems = (data: ICity[]) =>
  data.filter((a, i) => data.findIndex((s: ICity) => a.id === s.id) === i);

export const addNewCity = (oldData: ICity[], newData: any) => {
  const newCity = {
    title: newData.name,
    feelsLike: newData.main.feels_like,
    temp: newData.main.temp,
    weather: newData.weather[0].description,
    wind: newData.wind.speed,
    id: newData.sys.id,
    coords: newData.coord,
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
    const index = copy.indexOf(newCity);

    if (index !== -1) {
      copy[index] = newCity;

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
