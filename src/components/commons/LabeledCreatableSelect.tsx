import { type ReactNode } from "react";
import { CreatableSelectField } from "./CreatableSelectField";

type LabeledCreatableSelectProps = {
	actionButton?: ReactNode;
	id: string;
	label: ReactNode;
	note?: ReactNode;
	onChange?: (value: Array<{ label: string; value: string }>) => void;
	placeholder?: string;
	required?: boolean;
	value: Array<{ label: string; value: string }>;
};

export function LabeledCreatableSelect({
	actionButton,
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
			<div className="mb-2 flex items-center justify-between">
				<label className="flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-gray-100" htmlFor={id}>
					{label}
					{required && <span className="text-pink-500">*</span>}
					{note && <small>{note}</small>}
				</label>
				{actionButton}
			</div>

			<CreatableSelectField id={id} onChange={onChange} placeholder={placeholder} value={value} />
		</div>
	);
}
