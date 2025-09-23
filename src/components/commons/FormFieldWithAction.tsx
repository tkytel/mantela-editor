import { type ReactNode } from "react";

type FormFieldWithActionProps = {
	actionButton?: ReactNode;
	children: ReactNode;
	id: string;
	label: ReactNode;
};

export function FormFieldWithAction({ actionButton, children, id, label }: FormFieldWithActionProps) {
	return (
		<div className="mb-5" role="group">
			<div className="mb-2 flex items-center justify-between">
				<label className="text-sm font-medium text-gray-900 dark:text-gray-100" htmlFor={id}>
					{label}
				</label>
				{actionButton}
			</div>
			{children}
		</div>
	);
}
