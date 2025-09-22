import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

type Theme = "dark" | "light" | undefined;

export const ThemeAtom = atomWithStorage<Theme>("theme", undefined);

export const SystemThemeAtom = atom<"dark" | "light">(() => {
	if (globalThis.window?.matchMedia) {
		return globalThis.window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
	}

	return "light";
});

export const ResolvedThemeAtom = atom<"dark" | "light">((get) => {
	const theme = get(ThemeAtom);
	const systemTheme = get(SystemThemeAtom);

	if (!theme) {
		return systemTheme;
	}

	return theme;
});

export const ToggleThemeAtom = atom(null, (get, set) => {
	const currentTheme = get(ThemeAtom);
	const systemTheme = get(SystemThemeAtom);
	if (currentTheme === "dark") {
		set(ThemeAtom, "light");
	} else if (currentTheme === "light") {
		set(ThemeAtom, "dark");
	} else {
		set(ThemeAtom, systemTheme === "dark" ? "light" : "dark");
	}
});
