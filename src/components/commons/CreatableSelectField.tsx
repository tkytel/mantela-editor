import { useAtomValue } from "jotai";
import Creatable from "react-select/creatable";
import { useCallback } from "react";
import { type Theme } from "react-select";
import { ResolvedThemeAtom } from "../../helpers/Theme";

type CreatableSelectFieldProps = {
	id: string;
	isDisabled?: boolean;
	isMulti?: boolean;
	onChange?: (value: Array<{ label: string; value: string }>) => void;
	placeholder?: string;
	value: Array<{ label: string; value: string }>;
};

export function CreatableSelectField({
	id,
	isDisabled = false,
	isMulti = true,
	onChange,
	placeholder = "",
	value,
}: CreatableSelectFieldProps) {
	const resolvedTheme = useAtomValue(ResolvedThemeAtom);
	const isDark = resolvedTheme === "dark";
	const theme = useCallback(
		(originalTheme: Theme) => {
			return {
				...originalTheme,
				colors: {
					...originalTheme.colors,
					neutral0: isDark ? "rgb(31 41 55)" : "rgb(249 250 251)", // Control background
					neutral10: isDark ? "rgb(55 65 81)" : "rgb(229 231 235)", // Multi-value background
					neutral20: isDark ? "rgb(75 85 99)" : "rgb(209 213 219)", // Control border
					neutral30: isDark ? "rgb(107 114 128)" : "rgb(156 163 175)", // Control border hover
					neutral40: isDark ? "rgb(156 163 175)" : "rgb(107 114 128)", // No options text
					neutral5: isDark ? "rgb(55 65 81)" : "rgb(243 244 246)", // Menu background
					neutral50: isDark ? "rgb(156 163 175)" : "rgb(107 114 128)", // Placeholder
					neutral60: isDark ? "rgb(209 213 219)" : "rgb(75 85 99)", // Indicators
					neutral70: isDark ? "rgb(229 231 235)" : "rgb(55 65 81)", // Indicators hover
					neutral80: isDark ? "rgb(243 244 246)" : "rgb(17 24 39)", // Input text
					neutral90: isDark ? "rgb(249 250 251)" : "rgb(31 41 55)", // Option text
					primary: "rgb(59 130 246)", // Focused border and selected option
					primary25: isDark ? "rgb(55 65 81)" : "rgb(243 244 246)", // Option hover
					primary50: "rgb(147 197 253)", // Option selected
					primary75: "rgb(96 165 250)", // Option active
				},
			};
		},
		[isDark],
	);

	return (
		<div className="relative w-full">
			<Creatable
				className="text-sm"
				classNamePrefix="react-select"
				id={id}
				isDisabled={isDisabled}
				isMulti={isMulti}
				onChange={(newValue) => {
					onChange?.(newValue as Array<{ label: string; value: string }>);
				}}
				placeholder={placeholder}
				theme={theme}
				value={value}
			/>
		</div>
	);
}
