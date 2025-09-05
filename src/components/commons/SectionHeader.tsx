import { type ReactNode } from "react";

type SectionHeaderProps = {
	children: ReactNode;
};

export function SectionHeader({ children }: SectionHeaderProps) {
	return <div className="mt-5 mb-3 text-sm font-medium text-gray-900">{children}</div>;
}
