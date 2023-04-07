import { useState, useEffect, type FC, useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import classNames from 'classnames';
import { type ISearch, type ISearchForm } from './_type';
import { Debouncer } from '../../helpers/Debouncer';
import { TCity } from '../../services/_types';
import { CityContext } from '../context/context';
import { GlassIcon } from '../lib/GlassIcon';
import { LoadingIcon } from '../lib/LoadingIcon';

export const Search: FC<ISearch> = ({
	location, setLocation,
}) => {
	const LOCATION_INPUT_PATTERN = /^([a-zA-Z\d\u0080-\u024F]+(?:., |-| |'))*[a-zA-Z\d\u0080-\u024F]*$/;
	const cityManager = useContext(CityContext);
	const [locationTyped, setLocationTyped] = useState<string>('');
	const [locationOtions, setLocationOtions] = useState<TCity[] | undefined>([
		{
			name: "Dublin",
			"latitude": 53.3425,
			"longitude": -6.2658,
			"country": "IE"
		},
		{
			"name": "Dublin",
			"latitude": 37.7161,
			"longitude": -121.896,
			"country": "US"
		},
		{
			"name": "Dublin",
			"latitude": 40.1112,
			"longitude": -83.1454,
			"country": "US"
		},
		{
			"name": "Upper Dublin",
			"latitude": 40.1502,
			"longitude": -75.1813,
			"country": "US"
		},
		{
			"name": "Dublin",
			"latitude": 32.5359,
			"longitude": -82.928,
			"country": "US"
		}
	]);
	const [locationOtionsLoading, setLocationOtionsLoading] = useState<boolean>(false);
	const debouncer = new Debouncer(1000);
	const { register, handleSubmit, formState: { errors } } = useForm<ISearchForm>();

	const parseCityString = (typed: string) => {
		const dataTyped = typed.split(',').map(word => word.trim());
		const [ name, country ] = dataTyped;
		return { name, country };
	}
	const clearInputs = () => {
		setLocationTyped('');
		setLocationOtions(undefined);
	}

	useEffect(() => {
		debouncer.action(async() => {
			if (locationTyped) {
				try {
					setLocationOtionsLoading(true);
					const { name, country } = parseCityString(locationTyped);
					// const citySuggestions = await cityManager?.getCitySuggestions(name, country);
					// console.log(citySuggestions);
					// setLocationOtions(citySuggestions)
				} catch (error) {
					console.error(error);
				} finally {
					setTimeout(() => {
						setLocationOtionsLoading(false);
					}, 1000);
					// setLocationOtionsLoading(false);
				}
			} else {
				// setLocationOtions(undefined);
			}
		});
	}, [locationTyped]);

	useEffect(() => {
		if (errors?.locationInput) {
			setLocationOtions(undefined);
		}
	}, [errors?.locationInput]);

	const onChangeTypingArea = (event: React.FormEvent<HTMLInputElement>): void => {
		const locationTyped = (event?.target as HTMLInputElement)?.value || '';
		setLocationTyped(locationTyped);
	}
	const onChooseOption = (event: React.MouseEvent<HTMLElement>, optionIndex: number) => {
		setLocation(locationOtions?.[optionIndex]);
		clearInputs();
	};
	const onSubmit: SubmitHandler<ISearchForm> = () => {
		setLocation(parseCityString(locationTyped));
		clearInputs();
	};

	return (
		<div className='search
						absolute
						left-1/2
						top-1/2
						-translate-x-1/2
						-translate-y-1/2
						p-2
						w-11/12
						sm:w-8/12
						transition-all'>
			<form onSubmit={handleSubmit(onSubmit)}
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
						'opacity-0': locationOtionsLoading,
						})} />
					<LoadingIcon classes={classNames('search__loading-icon absolute left-1 top-1/2 -translate-y-1/2', {
							'opacity-0': !locationOtionsLoading,
							'opacity-1': locationOtionsLoading,
						})}/>
					<input {...register('locationInput', {
							pattern: LOCATION_INPUT_PATTERN,
							maxLength: 200
						})}
						placeholder='Type location like this: City<, CountryCode>'
						value={locationTyped}
						onChange={onChangeTypingArea}
						autoFocus
						className='search__input
									pl-8
									outline-offset-0
									text-xl
									w-full
									bg-transparent'/>
					<input className='search__submit hidden' type='submit'></input>
				</div>
				{
					locationOtions && (
						<ul className='search__options
										my-2'>
							{locationOtions.map((option, optionIndex) => {
								const label = `${option.name}, ${option.country}`
								return (
									<li key={`${label}_${option.latitude},${option.longitude}`}
										className='search__option
													cursor-pointer
													pl-2
													even:bg-slate-50
													hover:bg-slate-100'
										onClick={(e) => { onChooseOption(e, optionIndex); }}>
										{label}
										{
											(option.latitude || option.longitude) && (<span className='italic text-xs ml-2'>
												{ option.latitude && <span>{` latitude: ${option.latitude};`}</span> }
												{ option.longitude && <span>{` longitude: ${option.longitude}`}</span> }
											</span>)
										}
									</li>
								);
							})}
						</ul>
					)
				}
			</form>
			{ errors.locationInput && <p className='mt-2 text-rose-500'>Something went wrong. Please, check typed location.</p> }
		</div>
	);
};
