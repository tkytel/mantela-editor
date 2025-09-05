import { type ReactNode } from "react";

type RadioOption = {
	value: string;
	label: ReactNode;
};

type RadioGroupProps = {
	label: ReactNode;
	name: string;
	value: string;
	onChange?: (value: string) => void;
	options: RadioOption[];
};

export function RadioGroup({ label, name, value, onChange, options }: RadioGroupProps) {
	return (
		<div className="mb-4">
			<label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
			<div className="flex space-x-4">
				{options.map((option) => (
					<label key={option.value} className="flex items-center">
						<input
							type="radio"
							name={name}
							value={option.value}
							checked={value === option.value}
							onChange={(e) => {
								onChange?.(e.target.value);
							}}
							className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
						/>
						<span className="ml-2 text-sm font-medium text-gray-900">{option.label}</span>
					</label>
				))}
			</div>
		</div>
	);
}
