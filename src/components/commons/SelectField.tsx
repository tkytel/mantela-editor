import { type ReactNode } from "react";

type SelectFieldProps = {
	id: string;
	label: ReactNode;
	onChange?: (value: string) => void;
	options: SelectOption[];
	placeholder?: string;
	value: string;
};

type SelectOption = {
	label: ReactNode;
	value: string;
};

export function SelectField({
	id,
	label,
	onChange,
	options,
	placeholder = "選択してください",
	value,
}: SelectFieldProps) {
	return (
		<div className="mb-4">
			<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100" htmlFor={id}>
				{label}
			</label>
			<select
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus:ring-blue-400 dark:focus:border-blue-400"
				id={id}
				onChange={(e) => {
					onChange?.(e.target.value);
				}}
				value={value}
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
