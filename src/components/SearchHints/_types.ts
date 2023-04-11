import { type TCity } from '../../services/_types';

export interface ISearchHints {
	options: TCity[] | undefined
	onChooseOption: (optionIndex: number) => void
};
