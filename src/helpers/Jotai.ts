import { atomWithImmer } from "jotai-immer";
import type { Mantela } from "../types/mantela";

export const getInitialMantela = (): Mantela => ({
	$schema: "https://tkytel.github.io/mantela/0.1/mantela.schema.json",
	version: "0.1.0",
	aboutMe: {
		identifier: "",
		name: "",
		preferredPrefix: [],
		unavailable: false,
		image: "",
	},
	extensions: [],
	providers: [],
});

export const BodyAtom = atomWithImmer({
	isLoading: false,
	data: getInitialMantela(),
});

type FormErrorState = {
	alerts: Record<string, string>;
};

export const AlertAtom = atomWithImmer<FormErrorState>({
	alerts: {},
});
