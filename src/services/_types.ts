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
	coord: TCoord
	weather: TWeatherItem[]
	base: 'stations'
	main: TMain
	visibility: number
	wind: TWind
	rain: TRain
	clouds: TClouds
	dt: number
	sys: TSys
	timezone: number
	id: number
	name: string
	cod: number
};

export type TWeatherByLocation = {
	//   TCoord: {
	//     lon: 10.99
	//     lat: 44.34
	//   },
	//   weather: [
	//     {
	//       id: 501,
	//       TMain: Rain,
	//       description: moderate TRain,
	//       icon: 10d
	//     }
	//   ],
	//   base: stations,
	main: {
		temp: number
		// feels_like: 298.74,
		temp_min: number
		temp_max: number
		// pressure: 1015,
		// humidity: 64,
		// sea_level: 1015,
		// grnd_level: 933
	}
	//   visibility: 10000,
	wind: {
		speed: number
		// deg: 349,
		// gust: 1.18
	}
	//   TRain: {
	//     1h: 3.16
	//   },
	//   TClouds: {
	//     all: 100
	//   },
	//   dt: 1661870592,
	//   TSys: {
	//     type: 2,
	//     id: 2075663,
	//     country: IT,
	//     sunrise: 1661834187,
	//     sunset: 1661882248
	//   },
	//   timezone: 7200,
	//   id: 3163858,
	// name: string,
	// cod: number
};

type TCoord = {
	lon: number
	lat: number
};

type TWeatherItem = {
	id: number
	main: string
	description: string
	icon: string
};

type TMain = {
	temp: number
	feels_like: number
	temp_min: number
	temp_max: number
	pressure: number
	humidity: number
	sea_level: number
	grnd_level: number
};

type TWind = {
	speed: number
	deg: number
	gust: number
};

type TRain = {
	'1h': number
};

type TClouds = {
	all: number
};

type TSys = {
	type: number
	id: number
	country: string
	sunrise: number
	sunset: number
};
