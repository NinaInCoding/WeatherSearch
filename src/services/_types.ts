import { type Dayjs } from 'dayjs';

export type TCityRaw = {
	name: string
	latitude: number
	longitude: number
	country: string
	population: number
	is_capital: boolean
};

export type TCity = {
	name: string
	latitude?: number
	longitude?: number
	country?: string
};

export type TWeatherByLocationRaw = {
	coord: TCoordRaw
	weather: TWeatherItemRaw[]
	base: 'stations'
	main: TMainRaw
	visibility: number
	wind: TWindRaw
	rain: TRainRaw
	clouds: TCloudsRaw
	dt: number
	sys: TSysRaw
	timezone: number
	id: number
	name: string
	cod: number
};

export type TWeatherByLocation = {
	coord: TCoord
	weather: TWeatherItemParsed[]
	main: {
		temp: number
		pressure: number
		humidity: number
	}
	wind: {
		speed: number
	}
	sys: TSys
	timezone: number
};

export type TWeatherItem = {
	id: number
	main: string
	description: string
};

export type TWeatherItemParsed = {
	id: number
	weatherId: EWeatherId | undefined
	main: string
	description: string
};

export type TSys = {
	sunrise: Dayjs
	sunset: Dayjs
};

export type TCoord = {
	lon: number
	lat: number
};

type TCoordRaw = {
	lon: number
	lat: number
};

type TWeatherItemRaw = {
	id: number
	main: string
	description: string
	icon: string
};

type TMainRaw = {
	temp: number
	feels_like: number
	temp_min: number
	temp_max: number
	pressure: number
	humidity: number
	sea_level: number
	grnd_level: number
};

type TWindRaw = {
	speed: number
	deg: number
	gust: number
};

type TRainRaw = {
	'1h': number
};

type TCloudsRaw = {
	all: number
};

type TSysRaw = {
	type: number
	id: number
	country: string
	sunrise: number
	sunset: number
};

export enum EWeatherId {
	THUNDERSTORM = 2,
	DRIZZLE = 3,
	RAIN = 5,
	SNOW = 6,
	ATMOSPHERE = 7,
	CLEAR = 800,
	CLOUDS = 80,
};
