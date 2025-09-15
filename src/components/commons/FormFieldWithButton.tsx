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
			<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100" htmlFor={id}>
				{label} {required && <span className="text-pink-500">*</span>}
			</label>
			<div className="relative w-full">
				<input
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus:ring-blue-400 dark:focus:border-blue-400"
					id={id}
					onChange={(e) => {
						onChange?.(e.target.value);
					}}
					placeholder={placeholder}
					type={type}
					value={value}
				/>
				<button
					className="absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:border-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-400"
					onClick={onButtonClick}
					type="button"
				>
					{buttonContent}
				</button>
			</div>
		</div>
	);
}
