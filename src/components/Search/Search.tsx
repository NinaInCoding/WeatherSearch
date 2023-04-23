import { useState, useEffect, type FC, useContext } from 'react';
import classNames from 'classnames';
import { type ISearch } from './_types';
import { Debouncer } from '../../helpers/Debouncer';
import { type TCity } from '../../services/_types';
import { CityContext } from '../../context/context';
import { GlassIcon } from '../icons/GlassIcon';
import { LoadingIcon } from '../icons/LoadingIcon';
import { SearchHints } from '../SearchHints';
import { FormInput } from '../FormInput';
import './Search.scss';

export const Search: FC<ISearch> = ({
	setLocation
}) => {
	const SEARCH_INPUT_PROPS = {
		maxLength: 200,
		pattern: /^[^\s][a-zA-Z\s'-]+(?:,\s*[a-zA-Z]{2})?\s*$/,
		placeholder: 'Type: City<, CountryCode>',
		errorMessage: 'Please enter a location in the format \'City, CountryCode\', where CountryCode is a two-letter code'
	};
	const cityManager = useContext(CityContext);
	const [searchDisabled, setSearchDisabled] = useState<boolean>(true);
	const [locationTyped, setLocationTyped] = useState<string>('');
	const [locationOtions, setLocationOtions] = useState<TCity[]>();
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
					const { name, country } = parseCityString(locationTyped);
					const citySuggestions = await cityManager?.getCitySuggestions(name, country);
					setLocationOtions(citySuggestions);
				} catch (error) {
					console.error(error);
				} finally {
					setLocationOtionsLoading(false);
				}
			} else {
				setLocationOtions(undefined);
			}
		});
		setSearchDisabled(false);
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
						mx-auto
						w-full
						transition-all
						opacity-75'>
			<form onSubmit={onSubmit}
				className='search__form
							flex
							flex-col
							items-start
							justify-center
							w-full
							rounded-md
							bg-white'>
				<div className='search__input-wrap
								relative
								w-full'>
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
								text-xs
								md:text-base
								lg:text-xl
								w-full
								bg-transparent'
						errorClasses='absolute
									top-full
									left-0
									w-full
									pt-2.5
									text-left
									italic'
						{...SEARCH_INPUT_PROPS}
					/>
					<input className='search__submit hidden' type='submit' disabled={searchDisabled}></input>
				</div>
				{ locationOtions && <SearchHints options={locationOtions} onChooseOption={onChooseOption} /> }
			</form>
		</div>
	);
};
