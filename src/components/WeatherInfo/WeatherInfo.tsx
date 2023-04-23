import { type FC } from 'react';
import { type IWeatherInfo } from './_types';
import { formatTime } from '../../helpers/Time';

import './WeatherInfo.scss';

export const WeatherInfo: FC<IWeatherInfo> = ({ location, weather }) => {
	const sunriseTime = formatTime(weather.sys.sunrise);
	const sunsetTime = formatTime(weather.sys.sunset);

	return (
		<div className='weather-by-location
						w-full
						bg-white
						opacity-75
						rounded-md
						p-8
						text-sky-600
						font-bold
						text-center'>
			<div className='flex
							flex-col
							justify-center
							mb-2.5
							text-xs
							sm:text-sm
							md:text-base
							lg:text-xl'>
				<p className='weather-by-location__tempurature'>
					<span>{`${weather.main.temp}`}</span>&#x2103;
				</p>
				<p className='weather-by-location__wind'>
					<span>{`Wind speed: ${weather.wind.speed} meter/sec`}</span>
				</p>
				<p className='weather-by-location__humidity'>
					<span>{`Humidity: ${weather.main.humidity} %`}</span>
				</p>
				<div className='flex
								justify-between'>
					<p>{`Sunrise: ${sunriseTime}`}</p>
					<p>{`Sunset: ${sunsetTime}`}</p>
				</div>
			</div>

			<h1 className='weather-by-location__title
							text-xl
							sm:text-2xl
							md:text-3xl
							lg:text-4xl'>
				{`${location.name}${location.country ? (', ' + location.country) : ''}`}
			</h1>
		</div>
	);
};
