import { type EWeatherId, type TSys, type TCoord } from '../../services/_types';

export interface IVisualEffects {
	coord: TCoord | undefined
	sys: TSys | undefined
	weather: EWeatherId[] | undefined
};

export enum ETimePeriod {
	DAY = 'DAY',
	NIGHT = 'NIGHT',
};
