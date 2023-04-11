import { parseCitySuggestions } from './parser';
import { type TCityRaw, type TCity } from './_types';

export class CityAPI {
	#API_NINJAS_KEY = 'tJgWu7+DK2+eL5q5lVWsRQ==oz61TQxmwLYJc5PE';
	#API_NINJAS_ENDPOINT_BASE = 'https://api.api-ninjas.com/v1';
	#API_NINJAS_ENDPOINT_CITY = `${this.#API_NINJAS_ENDPOINT_BASE}/city`;

	public async getCitySuggestions(cityName: string, countryCode?: string, limit: number = 5): Promise<TCity[]> {
		const res = await fetch(`${this.#API_NINJAS_ENDPOINT_CITY}?name=${cityName}${countryCode ? ('&country=' + countryCode) : ''}${limit ? ('&limit=' + limit.toString()) : ''}`,
			{
				headers: {
					'X-Api-Key': this.#API_NINJAS_KEY
				}
			});
		const data = await res.json();
		return parseCitySuggestions(data as TCityRaw[]);
	}
}
