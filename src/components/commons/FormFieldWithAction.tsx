import { type ReactNode } from "react";

type FormFieldWithActionProps = {
	id: string;
	label: ReactNode;
	actionButton?: ReactNode;
	children: ReactNode;
};

export function FormFieldWithAction({ id, label, actionButton, children }: FormFieldWithActionProps) {
	return (
		<div className="mb-5">
			<div className="flex items-center justify-between mb-2">
				<label htmlFor={id} className="text-sm font-medium text-gray-900">
					{label}
				</label>
				{actionButton}
			</div>
			{children}
		</div>
	);
}
