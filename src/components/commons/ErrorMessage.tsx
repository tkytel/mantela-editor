import { type ReactNode } from "react";

type ErrorMessageProps = {
	children: ReactNode;
};

export function ErrorMessage({ children }: ErrorMessageProps) {
	return (
		<div
			className="relative mb-4 rounded border border-red-200 bg-red-50 px-4 py-3 text-red-700 dark:border-red-700 dark:bg-red-900 dark:text-red-200"
			role="alert"
		>
			<span className="block sm:inline">{children}</span>
		</div>
	);
}
