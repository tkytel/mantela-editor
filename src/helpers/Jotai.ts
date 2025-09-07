import { atomWithImmer } from "jotai-immer";
import type { Mantela } from "../types/mantela";

export const getInitialMantela = (): Mantela => ({
	$schema: "https://tkytel.github.io/mantela/0.1/mantela.schema.json",
	aboutMe: {
		identifier: "",
		name: "",
		preferredPrefix: [],
		unavailable: false,
	},
	extensions: [],
	providers: [],
	version: "0.1.0",
});

export const BodyAtom = atomWithImmer({
	data: getInitialMantela(),
	isLoading: false,
});

type FormErrorState = {
	alerts: Record<string, string>;
};

export const AlertAtom = atomWithImmer<FormErrorState>({
	alerts: {},
});
