import './Rain.scss';

export const Rain = () => {
	const RAIN_DROPS_COUNT = 100;
	return (
		<>
			{
				[...Array(RAIN_DROPS_COUNT).keys()].map((_, dropIndex) => (
					<div key={`${dropIndex}`}
						className='raindrop
									absolute'/>
				))
			}
		</>
	);
};
