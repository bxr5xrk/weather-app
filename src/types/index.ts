export interface ICity {
  title: string
  feelsLike: number
  temp: number
  weather: string
  wind: number
  id: number
}

export interface Weather {
  icon: string
  description: string
}

export interface Main {
  temp: number
  humidity: number
  feels_like: number
}

interface Sys {
  country: string
}

interface Wind {
  speed: number
}

export interface IFullCity {
  name: string
  weather: Weather[]
  main: Main
  sys: Sys
  wind: Wind
  visibility: number
  dt_txt: string
  dt: number
}

interface CityDetails {
  name: string
  country: string
}

export interface ICityForecast {
  list: IFullCity[]
  city: CityDetails
}
