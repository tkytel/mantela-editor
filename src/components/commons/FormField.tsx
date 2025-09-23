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
		<div className="mb-5" role="group">
			<label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-100" htmlFor={id}>
				{label} {required && <span className="text-pink-500">*</span>}
			</label>
			<div className="relative w-full">
				<input
					className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder:text-gray-400 disabled:dark:bg-gray-900"
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
