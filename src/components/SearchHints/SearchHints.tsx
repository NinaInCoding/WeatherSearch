import { type FC } from 'react';
import { type ISearchHints } from './_types';

export const SearchHints: FC<ISearchHints> = ({ options, onChooseOption }) => (
	<ul className='search__options
					my-2'>
		{options?.map(({ name, country, latitude, longitude }, optionIndex) => {
			const label = `${name}${country ? ', ' + country : ''}`;
			return (
				<li key={`${label}${typeof latitude === 'number' ? ('_' + latitude?.toString()) : ''}${typeof longitude === 'number' ? ('_' + longitude?.toString()) : ''}`}
					className='search__option
								cursor-pointer
								pl-2
								even:bg-slate-50
								hover:bg-slate-100'
					onClick={() => { onChooseOption(optionIndex); }}>
					{label}
					{
						(latitude ?? longitude) && (<span className='italic text-xs ml-2'>
							{ latitude && <span>{` latitude: ${latitude};`}</span> }
							{ longitude && <span>{` longitude: ${longitude}`}</span> }
						</span>)
					}
				</li>
			);
		})}
	</ul>
);
