import Creatable from "react-select/creatable";

type CreatableSelectFieldProps = {
	id: string;
	isDisabled?: boolean;
	isMulti?: boolean;
	onChange?: (value: Array<{ label: string; value: string }>) => void;
	placeholder?: string;
	value: Array<{ label: string; value: string }>;
};

export function CreatableSelectField({
	id,
	isDisabled = false,
	isMulti = true,
	onChange,
	placeholder = "",
	value,
}: CreatableSelectFieldProps) {
	return (
		<div className="relative w-full">
			<Creatable
				className="text-sm"
				classNamePrefix="react-select"
				id={id}
				isDisabled={isDisabled}
				isMulti={isMulti}
				onChange={(newValue) => {
					onChange?.(newValue as Array<{ label: string; value: string }>);
				}}
				placeholder={placeholder}
				value={value}
			/>
		</div>
	);
}
