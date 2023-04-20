import './SunRays.scss';

export const SunRays = () => {
	const SUN_RAYS_COUNT = 10;

	return (
		<div className='sun
						absolute
						top-1/2
						left-1/2
						-translate-x-1/2
						-translate-y-1/2
						w-12
						h-12
						rounded-full
						bg-amber-200
						opacity-90'>
			{
				[...Array(SUN_RAYS_COUNT).keys()].map((ray, rayIndex) => (
					<div key={`${rayIndex}`}
						className='ray
									absolute' />
				))
			}
		</div>
	);
};
