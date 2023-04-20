import dayjs, { type Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(utc);
dayjs.extend(isBetween);

const DEFAULT_TIME_FORMAT = 'MM/DD/YY h:mm A';

export const getLocalToUnix = (time: Date): number => {
	return dayjs(time).unix();
};

export const parseUnix = (time: number): Dayjs => {
	return dayjs.unix(time);
};

export const formatTime = (time: Dayjs, format?: string): string => {
	return time.format(format ?? DEFAULT_TIME_FORMAT);
};

export const isTimeBetween = (time: Dayjs, startTime: Dayjs, endTime: Dayjs, opUnitType: dayjs.OpUnitType = 'milliseconds', rangeCheckType: '()' | '[]' | '[)' | '(]' = '[]'): boolean => { // '[' means inclusive, '(' exclusive
	return time.isBetween(startTime, endTime, opUnitType, rangeCheckType);
};
