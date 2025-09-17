import { type ReactNode } from "react";

type FormFieldWithButtonProps = {
	buttonContent: ReactNode;
	id: string;
	label: string;
	onButtonClick?: () => void;
	onChange?: (value: string) => void;
	placeholder?: string;
	required?: boolean;
	type?: "number" | "text" | "url";
	value: string;
};

export function FormFieldWithButton({
	buttonContent,
	id,
	label,
	onButtonClick,
	onChange,
	placeholder,
	required = false,
	type = "text",
	value,
}: FormFieldWithButtonProps) {
	return (
		<div className="mb-5">
			<label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-100" htmlFor={id}>
				{label} {required && <span className="text-pink-500">*</span>}
			</label>
			<div className="relative w-full">
				<input
					className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-400"
					id={id}
					onChange={(e) => {
						onChange?.(e.target.value);
					}}
					placeholder={placeholder}
					type={type}
					value={value}
				/>
				<button
					className="absolute end-0 top-0 h-full rounded-e-lg border border-blue-700 bg-blue-700 p-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:ring-3 focus:ring-blue-300 focus:outline-hidden dark:border-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-400"
					onClick={onButtonClick}
					type="button"
				>
					{buttonContent}
				</button>
			</div>
		</div>
	);
}
