import { type ReactNode } from "react";

type CardContainerProps = {
	children: ReactNode;
};

export function CardContainer({ children }: CardContainerProps) {
	return (
		<div
			className="relative mb-3 block rounded-lg border border-gray-200 bg-white p-6 shadow-xs dark:border-gray-700 dark:bg-gray-800"
			role="region"
		>
			{children}
		</div>
	);
}
