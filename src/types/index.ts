export interface Coords {
  lat: number
  lon: number
}

export interface ICity {
  title: string
  feelsLike: number
  temp: number
  weather: string
  wind: number
  id: number
  coords: Coords
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
}
