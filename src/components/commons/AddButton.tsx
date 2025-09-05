type AddButtonProps = {
	onClick?: () => void;
	label: string;
	variant?: "primary" | "secondary" | "purple";
};

export function AddButton({ onClick, label, variant = "primary" }: AddButtonProps) {
	const variantClasses = {
		primary:
			"text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800",
		secondary: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300",
		purple:
			"text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800",
	};

	return (
		<button
			type="button"
			className={`${variantClasses[variant]} font-medium rounded-lg text-base px-5 py-2.5 text-center me-2 mb-2 w-full`}
			onClick={onClick}
		>
			{label}
		</button>
	);
}
