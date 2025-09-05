import Creatable from "react-select/creatable";

type CreatableSelectFieldProps = {
	id: string;
	value: Array<{ label: string; value: string }>;
	onChange?: (value: Array<{ label: string; value: string }>) => void;
	placeholder?: string;
	isMulti?: boolean;
	isDisabled?: boolean;
};

export function CreatableSelectField({
	id,
	value,
	onChange,
	placeholder = "",
	isMulti = true,
	isDisabled = false,
}: CreatableSelectFieldProps) {
	return (
		<div className="relative w-full">
			<Creatable
				id={id}
				isMulti={isMulti}
				value={value}
				onChange={(newValue) => {
					onChange?.(newValue as Array<{ label: string; value: string }>);
				}}
				placeholder={placeholder}
				isDisabled={isDisabled}
				className="text-sm"
				classNamePrefix="react-select"
			/>
		</div>
	);
}
