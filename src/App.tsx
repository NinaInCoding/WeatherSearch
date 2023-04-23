import { useContext, useEffect, useState } from 'react';
import { Search } from './components/Search';
import { WeatherInfo } from './components/WeatherInfo';
import { Debouncer } from './helpers/Debouncer';
import { WeatherContext } from './context/context';
import { type TCity, type TWeatherByLocation } from './services/_types';
import { WeatherEffects } from './components/WeatherEffects';
import { getWeatherIdList } from './helpers/Selectors';
import { ErrorBoundary } from './components/ErrorBoundary';
import { EErrorTypes } from './components/ErrorBoundary/_types';

function App(): React.ReactElement {
	const weatherManager = useContext(WeatherContext);
	const [location, setLocation] = useState<TCity>();
	const [weatherByLocation, setWatherByLocation] = useState<TWeatherByLocation>();

	const debouncer = new Debouncer();

	useEffect(() => {
		debouncer.action(async() => {
			if (location) {
				try {
					const { name, country } = location;
					const weather = await weatherManager?.getWeatherByLocation(name, undefined, country);
					setWatherByLocation(weather);
				} catch (error) {
					console.error(error);
				}
			}
		});
	}, [location]);

	return (
		<ErrorBoundary type={EErrorTypes.FULL_PAGE}>
			<div className="app
							relative
							px-5
							py-5
							flex
							flex-col
							justify-between
							h-screen
							bg-slate-200
							font-serif
							text-base">
				<ErrorBoundary type={EErrorTypes.HIDDEN}>
					<WeatherEffects coord={weatherByLocation?.coord && weatherByLocation.coord}
						sys={weatherByLocation?.sys && weatherByLocation.sys}
						weather={weatherByLocation?.weather && [...new Set(getWeatherIdList(weatherByLocation?.weather))]} />
				</ErrorBoundary>

				<ErrorBoundary type={EErrorTypes.MASSAGE}>
					<Search location={location} setLocation={setLocation} />
				</ErrorBoundary>

				<ErrorBoundary type={EErrorTypes.MASSAGE}>
					{ (location && weatherByLocation) &&
						<WeatherInfo location={location} weather={weatherByLocation} /> }
				</ErrorBoundary>
			</div>
		</ErrorBoundary>
	);
}

export default App;
