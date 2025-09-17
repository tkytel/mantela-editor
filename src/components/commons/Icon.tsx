type IconProps = {
	variant: "cancel" | "delete" | "info" | "refresh";
};

export function Icon({ variant }: IconProps) {
	switch (variant) {
		case "cancel": {
			return <CancelIcon />;
		}

		case "delete": {
			return <DeleteIcon />;
		}

		case "info": {
			return <InfoIcon />;
		}

		case "refresh": {
			return <RefreshIcon />;
		}
	}
}

function CancelIcon() {
	return (
		<svg aria-hidden="true" className="h-3 w-3" fill="none" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
			<path
				d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
			/>
		</svg>
	);
}

function DeleteIcon() {
	return (
		<svg className="h-7 w-7" fill="currentColor" viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg">
			<path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
		</svg>
	);
}

function InfoIcon() {
	return (
		<svg
			aria-hidden="true"
			className="me-2 h-4 w-4 shrink-0"
			fill="currentColor"
			viewBox="0 0 20 20"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
		</svg>
	);
}

function RefreshIcon() {
	return (
		<svg className="h-4 w-4" fill="currentColor" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
			<path d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160 352 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l111.5 0c0 0 0 0 0 0l.4 0c17.7 0 32-14.3 32-32l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 35.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1L16 432c0 17.7 14.3 32 32 32s32-14.3 32-32l0-35.1 17.6 17.5c0 0 0 0 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.8c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352l34.4 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L48.4 288c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z" />
		</svg>
	);
}
