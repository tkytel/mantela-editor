import { type ReactNode } from "react";

type NumberFieldProps = {
	id: string;
	label: ReactNode;
	max?: number;
	min?: number;
	onChange?: (value: string) => void;
	placeholder?: string;
	value: string;
};

export function NumberField({ id, label, max, min, onChange, placeholder = "", value }: NumberFieldProps) {
	return (
		<div className="mb-2">
			<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100" htmlFor={id}>
				{label}
			</label>
			<div className="relative w-full">
				<input
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:ring-blue-400 dark:focus:border-blue-400"
					id={id}
					max={max}
					min={min}
					onChange={(e) => {
						onChange?.(e.target.value);
					}}
					placeholder={placeholder}
					type="text"
					value={value}
				/>
			</div>
		</div>
	);
}
