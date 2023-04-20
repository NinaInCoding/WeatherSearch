import { type FC } from 'react';
import { WeatherContext, CityContext, TimeContext } from './context';
import { CityAPI } from '../services/CityAPI';
import { WeatherAPI } from '../services/WeatherAPI';
import { useUserTime } from '../hooks/UseUserTime';
import { type TContextContainer } from './_types';

export const ContextProvider: FC<TContextContainer> = ({ children }) => {
	const userTime = useUserTime();

	const cityManager = new CityAPI();
	const weatherManager = new WeatherAPI();

	return (
		<TimeContext.Provider value={userTime}>
			<CityContext.Provider value={cityManager}>
				<WeatherContext.Provider value={weatherManager}>
					{children}
				</WeatherContext.Provider>
			</CityContext.Provider>
		</TimeContext.Provider>
	);
};
