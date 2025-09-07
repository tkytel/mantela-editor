import { type ReactNode } from "react";

type FormFieldWithActionProps = {
	actionButton?: ReactNode;
	children: ReactNode;
	id: string;
	label: ReactNode;
};

export function FormFieldWithAction({ actionButton, children, id, label }: FormFieldWithActionProps) {
	return (
		<div className="mb-5">
			<div className="flex items-center justify-between mb-2">
				<label className="text-sm font-medium text-gray-900" htmlFor={id}>
					{label}
				</label>
				{actionButton}
			</div>
			{children}
		</div>
	);
}
