import { type ReactNode } from "react";

type CardContainerProps = {
	children: ReactNode;
};

export function CardContainer({ children }: CardContainerProps) {
	return <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow-sm mb-3 relative">{children}</div>;
}
