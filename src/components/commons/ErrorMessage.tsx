import { type ReactNode } from "react";

type ErrorMessageProps = {
	children: ReactNode;
};

export function ErrorMessage({ children }: ErrorMessageProps) {
	return (
		<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-4">
			<span className="block sm:inline">{children}</span>
		</div>
	);
}
