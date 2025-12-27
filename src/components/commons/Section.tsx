type SectionHeaderProps = {
	children: React.ReactNode;
	text: string;
};

export function Section({ children, text }: SectionHeaderProps) {
	return (
		<details open>
			<summary className="mt-2 mb-2">
				<span aria-level={2} className="mt-2 mb-2 text-xl font-medium text-gray-900 dark:text-gray-100" role="heading">
					{text}
				</span>
			</summary>
			{children}
		</details>
	);
}
