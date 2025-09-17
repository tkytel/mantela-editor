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
			<label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-100" htmlFor={id}>
				{label}
			</label>
			<select
				className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-400"
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
