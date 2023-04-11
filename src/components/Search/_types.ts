import { type TCity } from '../../services/_types';

export interface ISearch {
	location: TCity | undefined
	setLocation: (location: TCity | undefined) => void
}
