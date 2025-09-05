import { type ReactNode } from "react";
import { CreatableSelectField } from "./CreatableSelectField";

type LabeledCreatableSelectProps = {
	id: string;
	label: ReactNode;
	value: Array<{ label: string; value: string }>;
	note?: ReactNode;
	onChange?: (value: Array<{ label: string; value: string }>) => void;
	placeholder?: string;
	required?: boolean;
};

export function LabeledCreatableSelect({
	id,
	label,
	value,
	onChange,
	note,
	placeholder = "",
	required = false,
}: LabeledCreatableSelectProps) {
	return (
		<div className="mb-5">
			<label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 flex items-center gap-1">
				{label}
				{required && <span className="text-pink-500">*</span>}
				{note && <small>{note}</small>}
			</label>
			<CreatableSelectField id={id} value={value} onChange={onChange} placeholder={placeholder} />
		</div>
	);
}
