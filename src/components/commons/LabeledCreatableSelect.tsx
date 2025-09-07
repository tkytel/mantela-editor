import { type ReactNode } from "react";
import { CreatableSelectField } from "./CreatableSelectField";

type LabeledCreatableSelectProps = {
	id: string;
	label: ReactNode;
	note?: ReactNode;
	onChange?: (value: Array<{ label: string; value: string }>) => void;
	placeholder?: string;
	required?: boolean;
	value: Array<{ label: string; value: string }>;
};

export function LabeledCreatableSelect({
	id,
	label,
	note,
	onChange,
	placeholder = "",
	required = false,
	value,
}: LabeledCreatableSelectProps) {
	return (
		<div className="mb-5">
			<label className="block mb-2 text-sm font-medium text-gray-900 flex items-center gap-1" htmlFor={id}>
				{label}
				{required && <span className="text-pink-500">*</span>}
				{note && <small>{note}</small>}
			</label>
			<CreatableSelectField id={id} onChange={onChange} placeholder={placeholder} value={value} />
		</div>
	);
}
