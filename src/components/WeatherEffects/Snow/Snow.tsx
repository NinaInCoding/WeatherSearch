import './Snow.scss';

export const Snow = () => {
	const SNOWFLAKES_COUNT = 100;

	return (
		<>
			{
				[...Array(SNOWFLAKES_COUNT).keys()].map((_, snowflakeIndex) => (
					<div key={`${snowflakeIndex}`}
						className='snowflake-wrap
									absolute
									y-movement'>
						<div className='x-movement'>
							<div className='snowflake
											w-2.5
											h-2.5
											bg-white
											rounded-full' />
						</div>
					</div>
				))
			}
		</>
	);
};
