import { type ReactNode } from "react";

type SelectOption = {
	value: string;
	label: ReactNode;
};

type SelectFieldProps = {
	id: string;
	label: ReactNode;
	value: string;
	options: SelectOption[];
	onChange?: (value: string) => void;
	placeholder?: string;
};

export function SelectField({
	id,
	label,
	value,
	onChange,
	options,
	placeholder = "選択してください",
}: SelectFieldProps) {
	return (
		<div className="mb-4">
			<label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900">
				{label}
			</label>
			<select
				id={id}
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
				value={value}
				onChange={(e) => {
					onChange?.(e.target.value);
				}}
			>
				{placeholder && <option value="">{placeholder}</option>}
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
}
