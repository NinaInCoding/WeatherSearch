import { type EWeatherId, type TWeatherItemParsed } from '../services/_types';

export const getWeatherIdList = (weather: TWeatherItemParsed[]): EWeatherId[] => {
	return weather.reduce<EWeatherId[]>((ids, weatherItem) => {
		if (weatherItem?.weatherId) ids.push(weatherItem.weatherId);
		return ids;
	}, []);
};
