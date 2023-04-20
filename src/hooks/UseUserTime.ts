import dayjs, { type Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';

export const useUserTime = () => {
	const [userTime, setUserTime] = useState<Dayjs | null>(null);

	useEffect(() => {
		const getTimeLink = setInterval(() => {
			setUserTime(dayjs(new Date()));
		}, 1000);

		return () => {
			clearInterval(getTimeLink);
		};
	}, []);

	return userTime;
};
