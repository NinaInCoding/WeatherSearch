import { type TCity, type TWeatherByLocation } from '../../services/_types';

export interface IWeatherInfo {
	location: TCity
	weather: TWeatherByLocation
}
