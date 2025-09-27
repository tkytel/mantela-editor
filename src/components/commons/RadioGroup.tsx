import { type ReactNode } from "react";

type RadioGroupProps = {
	id: string;
	label: ReactNode;
	onChange?: (value: string) => void;
	options: RadioOption[];
	value: string;
};

type RadioOption = {
	label: ReactNode;
	value: string;
};

export function RadioGroup({ id, label, onChange, options, value }: RadioGroupProps) {
	return (
		<div className="mb-4">
			<label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-100" id={id}>
				{label}
			</label>
			<div aria-labelledby={id} className="flex space-x-4" role="radiogroup">
				{options.map((option) => (
					<div className="flex items-center" key={option.value}>
						<input
							checked={value === option.value}
							className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-blue-400"
							id={`${id}-${option.value}`}
							onChange={(e) => {
								onChange?.(e.target.value);
							}}
							type="radio"
							value={option.value}
						/>
						<label
							className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
							htmlFor={`${id}-${option.value}`}
						>
							{option.label}
						</label>
					</div>
				))}
			</div>
		</div>
	);
}
