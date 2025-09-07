import { type ReactNode } from "react";

type RadioGroupProps = {
	label: ReactNode;
	name: string;
	onChange?: (value: string) => void;
	options: RadioOption[];
	value: string;
};

type RadioOption = {
	label: ReactNode;
	value: string;
};

export function RadioGroup({ label, name, onChange, options, value }: RadioGroupProps) {
	return (
		<div className="mb-4">
			<label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
			<div className="flex space-x-4">
				{options.map((option) => (
					<label className="flex items-center" key={option.value}>
						<input
							checked={value === option.value}
							className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
							name={name}
							onChange={(e) => {
								onChange?.(e.target.value);
							}}
							type="radio"
							value={option.value}
						/>
						<span className="ml-2 text-sm font-medium text-gray-900">{option.label}</span>
					</label>
				))}
			</div>
		</div>
	);
}
