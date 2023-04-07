import { useContext, useEffect, useState } from 'react'
import { Search } from './components/Search'
import { Debouncer } from './helpers/Debouncer';
import { WeatherContext } from './components/context/context';
import { TCity, TWeatherByLocation } from './services/_types';

function App(): React.ReactElement {
	const weatherManager = useContext(WeatherContext);
	const [location, setLocation] = useState< TCity| undefined>();
	const [weatherByLocation, setWatherByLocation] = useState<TWeatherByLocation | undefined>({
		main: {
			"temp": 6.03,
			"temp_min": 4.62,
			"temp_max": 7.78
		},
		"wind": {
			"speed": 3.09
		}
	});
	const debouncer = new Debouncer();

	useEffect(() => {
		debouncer.action(async () => {
			console.log(location);
			if (location) {
				try {
					const { name, country} = location;
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
		<div className="app relative h-screen bg-slate-700 font-serif text-base">
			<div className="visual-effects absolute top-0 left-0 w-full h-full"></div>
			<div className='chosed-location'>
				{ location && <h1 className='chosed-location__name'>{`Location: ${location.name}${location.country && (', ' + location.country)}`}</h1> }
				{
					weatherByLocation && (<>
						<p>{`temp: ${weatherByLocation.main.temp}`}</p>
						<p>{`temp max: ${weatherByLocation.main.temp_max}`}</p>
						<p>{`temp min: ${weatherByLocation.main.temp_min}`}</p>
						<p>{`wind speed: ${weatherByLocation.wind.speed}`}</p>
					</>)
				}
			</div>
			<Search
				location={location}
				setLocation={setLocation}
			/>
		</div>
	)
}

export default App
