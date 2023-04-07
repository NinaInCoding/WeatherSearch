import { TCityRaw, TCity, TWeatherByLocationRaw, TWeatherByLocation } from "./_types";

export const parseCitySuggestions = (data: TCityRaw[]): TCity[] => {
	return data.map(city => ({
		name: city.name,
		latitude: city.latitude,
		longitude: city.longitude,
		country: city.country,
	}));
};

export const parseWeatherByLocation = (data: TWeatherByLocationRaw): TWeatherByLocation => {
	return {
		main: {
			temp: data.main.temp,
			temp_min: data.main.temp_min,
			temp_max: data.main.temp_max
		},
		wind: {
			speed: data.wind.speed
		}
	}
};
