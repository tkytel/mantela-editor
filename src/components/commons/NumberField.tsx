import { type ReactNode } from "react";

type NumberFieldProps = {
	id: string;
	label: ReactNode;
	value: string;
	onChange?: (value: string) => void;
	placeholder?: string;
	min?: number;
	max?: number;
};

export function NumberField({ id, label, value, onChange, placeholder = "", min, max }: NumberFieldProps) {
	return (
		<div className="mb-2">
			<label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900">
				{label}
			</label>
			<div className="relative w-full">
				<input
					type="text"
					id={id}
					placeholder={placeholder}
					min={min}
					max={max}
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
					onChange={(e) => {
						onChange?.(e.target.value);
					}}
					value={value}
				/>
			</div>
		</div>
	);
}
