import { useContext, useEffect, useState } from 'react';
import { Search } from './components/Search';
import { WeatherInfo } from './components/WeatherInfo';
import { Debouncer } from './helpers/Debouncer';
import { WeatherContext } from './context/context';
import { EWeatherId, type TCity, type TWeatherByLocation } from './services/_types';
import { WeatherEffects } from './components/WeatherEffects';
import { getWeatherIdList } from './helpers/Selectors';
import { ErrorBoundary } from './components/lib/ErrorBoundary';
import { EErrorTypes } from './components/lib/ErrorBoundary/_types';
import dayjs from 'dayjs';

function App(): React.ReactElement {
	const weatherManager = useContext(WeatherContext);
	const [location, setLocation] = useState< TCity | undefined>();
	const [weatherByLocation, setWatherByLocation] = useState<TWeatherByLocation | undefined>({
		coord: {
			lon: 10.99,
			lat: 40.34
		},
		weather: [
			{
				id: 501,
				main: 'Rain',
				description: 'moderate rain',
				weatherId: EWeatherId.RAIN
			}
		],
		main: {
			temp: 6.03,
			pressure: 44,
			humidity: 5
		},
		wind: {
			speed: 3.09
		},
		sys: {
			sunrise: dayjs(new Date()).startOf('hour'),
			sunset: dayjs(new Date()).endOf('hour')
		},
		timezone: 7200
	});
	// console.log(dayjs(new Date()).startOf('hour'), dayjs(new Date()).endOf('hour'));


	const debouncer = new Debouncer();

	useEffect(() => {
		debouncer.action(async() => {
			console.log(location);
			if (location != null) {
				try {
					const { name, country } = location;
					// const weather = await weatherManager?.getWeatherByLocation(name, undefined, country);
					// setWatherByLocation(weather);
					// console.log(weather);
				} catch (error) {
					console.log(error);
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
					<Search location={location}
						setLocation={setLocation} />
				</ErrorBoundary>

				<ErrorBoundary type={EErrorTypes.MASSAGE}>
					{ (location && weatherByLocation) &&
						<WeatherInfo location={location}
							weather={weatherByLocation} /> }
				</ErrorBoundary>
			</div>
		</ErrorBoundary>
	);
}

export default App;
