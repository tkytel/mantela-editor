import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useMemo } from "react";
import { ResolvedThemeAtom, ThemeAtom, ToggleThemeAtom } from "../../helpers/Theme";

export default function ThemeToggle() {
	const toggleTheme = useSetAtom(ToggleThemeAtom);
	const [theme, setThemeAtom] = useAtom(ThemeAtom);
	const systemTheme = useAtomValue(ResolvedThemeAtom);
	const resolvedTheme = useAtomValue(ResolvedThemeAtom);

	const themeIcon = useMemo(() => {
		return resolvedTheme === "dark" ? "🌙" : "☀️";
	}, [theme, resolvedTheme]);

	useEffect(() => {
		setThemeAtom(systemTheme);
	}, [setThemeAtom]);

	return (
		<button
			aria-label={resolvedTheme}
			className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-hidden dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 dark:focus:ring-offset-gray-800"
			onClick={toggleTheme}
			type="button"
		>
			<span className="text-lg">{themeIcon}</span>
		</button>
	);
}
