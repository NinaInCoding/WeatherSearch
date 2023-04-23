type TLoadingIcon = {
	classes?: string
};

export const LoadingIcon: React.FC<TLoadingIcon> = ({ classes }) => {
	return (
		<svg
			className={classes}
			width="21"
			height="21"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			viewBox="0 0 100 100">
			<circle fill="none" stroke="#344155" strokeWidth="4" cx="50" cy="50" r="44" style={{ opacity: 0.5 }}/>
			<circle fill="#344155" stroke="#344155" strokeWidth="3" cx="8" cy="54" r="6" >
				<animateTransform
					attributeName="transform"
					dur="2s"
					type="rotate"
					from="0 50 48"
					to="360 50 52"
					repeatCount="indefinite" />
			</circle>
		</svg>
	);
};
