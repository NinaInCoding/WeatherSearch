import { parseUnix } from '../helpers/Time';
import { type TWeatherItem, type TCityRaw, type TCity, type TWeatherByLocationRaw, type TWeatherByLocation, type TWeatherItemParsed, EWeatherId } from './_types';

export const parseCitySuggestions = (data: TCityRaw[]): TCity[] => {
	return data.map(city => ({
		name: city.name,
		latitude: city.latitude,
		longitude: city.longitude,
		country: city.country
	}));
};

export const parseWeatherByLocation = (data: TWeatherByLocationRaw): TWeatherByLocation => {
	return {
		coord: {
			lon: data.coord.lon,
			lat: data.coord.lat
		},
		weather: parseWeather(data.weather),
		main: {
			temp: data.main.temp,
			pressure: data.main.pressure,
			humidity: data.main.humidity
		},
		wind: {
			speed: data.wind.speed
		},
		sys: {
			sunrise: parseUnix(data.sys.sunrise),
			sunset: parseUnix(data.sys.sunset)
		},
		timezone: data.timezone
	};
};

function parseWeather(weather: TWeatherItem[]): TWeatherItemParsed[] {
	return weather.map(weatherItem => {
		return {
			id: weatherItem.id,
			weatherId: normalizeWeatherId(weatherItem.id),
			main: weatherItem.main,
			description: weatherItem.description
		};
	});
}

function normalizeWeatherId(id: number): EWeatherId | undefined {
	const idString = id.toString();
	const eWeatherIdKeys = Object.keys(EWeatherId);

	for (let eWeatherIdKeyIndex = 0; eWeatherIdKeyIndex < eWeatherIdKeys.length; eWeatherIdKeyIndex++) {
		const eWeatherIdKey = eWeatherIdKeys[eWeatherIdKeyIndex] as keyof typeof EWeatherId;
		const eWeatherIdValue = EWeatherId[eWeatherIdKey];
		for (let idStringCharIndex = 0; idStringCharIndex < idString.length; idStringCharIndex++) {
			if (Number(idString.slice(0, idStringCharIndex + 1)) === eWeatherIdValue) {
				return eWeatherIdValue;
			}
		}
	}
	return undefined;
}
