type AddButtonProps = {
	label: string;
	onClick?: () => void;
	variant?: "primary" | "purple" | "secondary";
};

export function AddButton({ label, onClick, variant = "primary" }: AddButtonProps) {
	const variantClasses = {
		primary:
			"text-white bg-linear-to-r from-cyan-500 to-blue-500 hover:bg-linear-to-bl focus:ring-3 focus:outline-hidden focus:ring-cyan-300 dark:focus:ring-cyan-800",
		purple:
			"text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-3 focus:outline-hidden focus:ring-blue-300 dark:focus:ring-blue-800",
		secondary: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-3 focus:outline-hidden focus:ring-blue-300",
	};

	return (
		<button
			className={`${variantClasses[variant]} font-medium rounded-lg text-base px-5 py-2.5 text-center me-2 mb-2 w-full`}
			onClick={onClick}
			type="button"
		>
			{label}
		</button>
	);
}
