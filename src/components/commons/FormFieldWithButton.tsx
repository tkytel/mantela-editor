import { type ReactNode } from "react";

type FormFieldWithButtonProps = {
	id: string;
	label: string;
	type?: "text" | "url" | "number";
	value: string;
	onChange?: (value: string) => void;
	onButtonClick?: () => void;
	buttonContent: ReactNode;
	placeholder?: string;
	required?: boolean;
};

export function FormFieldWithButton({
	id,
	label,
	type = "text",
	value,
	onChange,
	onButtonClick,
	buttonContent,
	placeholder,
	required = false,
}: FormFieldWithButtonProps) {
	return (
		<div className="mb-5">
			<label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900">
				{label} {required && <span className="text-pink-500">*</span>}
			</label>
			<div className="relative w-full">
				<input
					type={type}
					id={id}
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
					onChange={(e) => {
						onChange?.(e.target.value);
					}}
					value={value}
					placeholder={placeholder}
				/>
				<button
					type="button"
					className="absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
					onClick={onButtonClick}
				>
					{buttonContent}
				</button>
			</div>
		</div>
	);
}
