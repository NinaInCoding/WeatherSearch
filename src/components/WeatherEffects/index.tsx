import React, { useMemo } from 'react';
import { lazy, useState, type FC, useContext, useEffect, Suspense } from 'react';
import { type IVisualEffects, ETimePeriod } from './_types';
import classNames from 'classnames';
import { EWeatherId } from '../../services/_types';
import { TimeContext } from '../../context/context';
import './WeatherEffects.scss';
import { isTimeBetween } from '../../helpers/Time';

const SunRays = lazy(async() => ({ default: (await import('./SunRays')).SunRays }));
const Rain = lazy(async() => ({ default: (await import('./Rain')).Rain }));
const Snow = lazy(async() => ({ default: (await import('./Snow')).Snow }));

export const WeatherEffects: FC<IVisualEffects> = ({ coord, sys, weather }) => {
	const userTime = useContext(TimeContext);

	const [timePeriod, setTimePeriod] = useState< ETimePeriod | undefined>();

	useEffect(() => {
		if (userTime && sys && weather?.length) {
			setTimePeriod(isTimeBetween(userTime, sys?.sunrise, sys?.sunset)
				? ETimePeriod.DAY
				: ETimePeriod.NIGHT);
		} else {
			setTimePeriod(undefined);
		}
	}, [userTime, weather?.length, sys?.sunrise, sys?.sunset]);

	const getEffectById = (id: EWeatherId): React.ReactElement | null => {
		switch (true) {
		case [EWeatherId.DRIZZLE, EWeatherId.RAIN].includes(id):
			return <Rain />;
		case [EWeatherId.SNOW].includes(id):
			return <Snow />;
		case ![EWeatherId.SNOW, EWeatherId.DRIZZLE, EWeatherId.RAIN, EWeatherId.THUNDERSTORM, EWeatherId.ATMOSPHERE].includes(id):
			return timePeriod === ETimePeriod.DAY ? <SunRays /> : null;
		default:
			return null;
		}
	};

	const effects = useMemo(() => {
		return weather?.map(weatherId => (
			<React.Fragment key={weatherId}>
				{getEffectById(weatherId)}
			</React.Fragment>
		));
	}, [coord?.lat, coord?.lon]);

	return (
		<div className={classNames('visual-effects',
			'pointer-events-none',
			'overflow-hidden',
			'absolute',
			'top-0',
			'left-0',
			'w-full',
			'h-full', {
				'visual-effects__unset': !timePeriod,
				'visual-effects__day': timePeriod === ETimePeriod.DAY,
				'visual-effects__night': timePeriod === ETimePeriod.NIGHT
			})}>
			<div className='sky
							absolute
							top-0
							left-0
							w-full
							h-full
							transition-all'>
				<Suspense fallback={null}>
					{ effects }
				</Suspense>
			</div>
		</div>
	);
};
