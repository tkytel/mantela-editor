import { type ReactNode } from "react";

type CardContainerProps = {
	children: ReactNode;
};

export function CardContainer({ children }: CardContainerProps) {
	return (
		<div className="block p-6 bg-white border border-gray-200 rounded-lg shadow-xs mb-3 relative dark:bg-gray-800 dark:border-gray-700">
			{children}
		</div>
	);
}
