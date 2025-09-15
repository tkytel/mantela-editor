import { type ReactNode } from "react";

type FormFieldProps = {
	disabled?: boolean;
	id: string;
	label: ReactNode;
	onChange?: (value: string) => void;
	placeholder?: string;
	required?: boolean;
	type?: string;
	value: string | undefined;
};

export function FormField({
	disabled = false,
	id,
	label,
	onChange,
	placeholder = "",
	required = false,
	type = "text",
	value,
}: FormFieldProps) {
	return (
		<div className="mb-5">
			<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100" htmlFor={id}>
				{label} {required && <span className="text-pink-500">*</span>}
			</label>
			<div className="relative w-full">
				<input
					className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400"
					disabled={disabled}
					id={id}
					onChange={(e) => {
						onChange?.(e.target.value);
					}}
					placeholder={placeholder}
					type={type}
					value={value ?? ""}
				/>
			</div>
		</div>
	);
}
