type SectionHeaderProps = {
	level: 2 | 3;
	text: string;
};

export function SectionHeader({ level, text }: SectionHeaderProps) {
	return (
		<div
			aria-level={level}
			className={`${level === 2 ? "mt-2 mb-2 text-xl" : "mt-5 mb-3 text-sm"} font-medium text-gray-900 dark:text-gray-100`}
			role="heading"
		>
			{text}
		</div>
	);
}
