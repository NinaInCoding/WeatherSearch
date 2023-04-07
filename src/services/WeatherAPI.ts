import { parseWeatherByLocation } from './parser';
import { TWeatherByLocation, TWeatherByLocationRaw } from './_types';

export class WeatherAPI {
	#OPEN_WEATHER_KEY = 'e9217d509182f5332f7ea59f07bd007f';
	#OPEN_WEATHER_ENDPOINT_BASE = 'https://api.openweathermap.org';
	#OPEN_WEATHER_ENDPOINT_WEATHER = `${this.#OPEN_WEATHER_ENDPOINT_BASE}/data/2.5/weather`;

	public async getWeatherByLocation(cityName: string, stateCode?: string, countryCode?: string): Promise<TWeatherByLocation> {
		const queryParams = `q=${cityName}${stateCode ? (',' + stateCode) : ''},${countryCode ? (',' + countryCode) : ''}&units=metric&appid=${this.#OPEN_WEATHER_KEY}`; // metric Celsius
		const res = await fetch(`${this.#OPEN_WEATHER_ENDPOINT_WEATHER}?${queryParams}`);
		const data = await res.json();
		return parseWeatherByLocation(data as TWeatherByLocationRaw);
	}
}
