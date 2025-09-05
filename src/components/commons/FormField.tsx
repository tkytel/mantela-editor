import { type ReactNode } from "react";

type FormFieldProps = {
	id: string;
	label: ReactNode;
	type?: string;
	value: string | undefined;
	onChange?: (value: string) => void;
	placeholder?: string;
	disabled?: boolean;
	required?: boolean;
};

export function FormField({
	id,
	label,
	type = "text",
	value,
	onChange,
	placeholder = "",
	disabled = false,
	required = false,
}: FormFieldProps) {
	return (
		<div className="mb-5">
			<label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900">
				{label} {required && <span className="text-pink-500">*</span>}
			</label>
			<div className="relative w-full">
				<input
					type={type}
					id={id}
					placeholder={placeholder}
					disabled={disabled}
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
					onChange={(e) => {
						onChange?.(e.target.value);
					}}
					value={value ?? ""}
				/>
			</div>
		</div>
	);
}
