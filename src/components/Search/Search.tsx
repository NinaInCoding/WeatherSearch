import { useState, useEffect, type FC, useContext } from 'react';
import classNames from 'classnames';
import { type ISearch } from './_types';
import { Debouncer } from '../../helpers/Debouncer';
import { type TCity } from '../../services/_types';
import { CityContext } from '../../context/context';
import { GlassIcon } from '../lib/GlassIcon';
import { LoadingIcon } from '../lib/LoadingIcon';
import { SearchHints } from '../SearchHints';
import { FormInput } from '../lib/FormInput/FormInput';

export const Search: FC<ISearch> = ({
	location, setLocation
}) => {
	const SEARCH_INPUT_PROPS = {
		maxLength: 200,
		pattern: /^[^\s][a-zA-Z\s'-]+(?:,\s*[a-zA-Z]{2})?\s*$/,
		placeholder: 'Type location like this: City<, CountryCode>',
		errorMessage: 'Please enter a location in the format \'City, CountryCode\', where CountryCode is a two-letter code'
	};
	const cityManager = useContext(CityContext);
	const [searchDisabled, setSearchDisabled] = useState<boolean>(true);
	const [locationTyped, setLocationTyped] = useState<string>('');
	const [locationOtions, setLocationOtions] = useState<TCity[] | undefined>([
		{
			name: 'Dublin',
			latitude: 53.3425,
			longitude: -6.2658,
			country: 'IE'
		},
		{
			name: 'Dublin',
			latitude: 37.7161,
			longitude: -121.896,
			country: 'US'
		},
		{
			name: 'Dublin',
			latitude: 40.1112,
			longitude: -83.1454,
			country: 'US'
		},
		{
			name: 'Upper Dublin',
			latitude: 40.1502,
			longitude: -75.1813,
			country: 'US'
		},
		{
			name: 'Dublin',
			latitude: 32.5359,
			longitude: -82.928,
			country: 'US'
		}
	]);
	const [locationOtionsLoading, setLocationOtionsLoading] = useState<boolean>(false);
	const debouncer = new Debouncer(1000);

	const parseCityString = (typed: string): TCity => {
		const dataTyped = typed.split(',').map(word => word.trim());
		const [name, country] = dataTyped;
		return { name, country };
	};

	const clearInputs = () => {
		setLocationTyped('');
		setLocationOtions(undefined);
	};

	useEffect(() => {
		debouncer.action(async() => {
			if (locationTyped) {
				try {
					setLocationOtionsLoading(true);
					// const { name, country } = parseCityString(locationTyped);
					// const citySuggestions = await cityManager?.getCitySuggestions(name, country);
					// console.log(citySuggestions);
					// setLocationOtions(citySuggestions)
				} catch (error) {
					console.error(error);
				} finally {
					setLocationOtionsLoading(false);
					// setLocationOtionsLoading(false);
				}
			} else {
				// setLocationOtions(undefined);
			}
		});
		// setSearchDisabled(false);
	}, [locationTyped]);

	const onChangeTypingArea = (event: React.FormEvent<HTMLInputElement>) => {
		const inputValue = (event?.target as HTMLInputElement)?.value;
		setLocationTyped(inputValue?.length ? inputValue : '');
	};

	const onChooseOption = (optionIndex: number) => {
		setLocation(locationOtions?.[optionIndex]);
		clearInputs();
	};

	const onValidityChange = (isValid: boolean) => {
		setSearchDisabled(!isValid);
		if (!isValid) setLocationOtions(undefined);
	};

	const onSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		setLocation(parseCityString(locationTyped));
		clearInputs();
	};

	return (
		<div className='search
						absolute
						top-1/4
						left-1/2
						-translate-x-1/2
						p-2
						w-11/12
						sm:w-8/12
						transition-all'>
			<form onSubmit={onSubmit}
				className='search__form
							flex
							flex-col
							w-full
							rounded-md
							bg-white'>
				<div className='search__input-wrap
								relative
								flex'>
					<GlassIcon classes={classNames('search__glass-icon absolute left-1 top-1/2 -translate-y-1/2', {
						'opacity-0': locationOtionsLoading
					})} />
					<LoadingIcon classes={classNames('search__loading-icon absolute left-1 top-1/2 -translate-y-1/2', {
						'opacity-0': !locationOtionsLoading,
						'opacity-1': locationOtionsLoading
					})}/>
					<FormInput name="locationTyped"
						type='text'
						value={locationTyped}
						handleChange={onChangeTypingArea}
						handleValidityChange={onValidityChange}
						autoFocus
						classes='search__input
								pl-8
								outline-offset-0
								text-xl
								w-full
								bg-transparent'
						errorClasses='absolute
									top-full
									left-1/2
									-translate-x-1/2
									w-full
									px-2.5
									text-center'
						{...SEARCH_INPUT_PROPS}
					/>
					<input className='search__submit hidden' type='submit' disabled={searchDisabled}></input>
				</div>
				{ locationOtions && <SearchHints options={locationOtions} onChooseOption={onChooseOption} /> }
			</form>
		</div>
	);
};
