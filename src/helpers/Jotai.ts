import { atomWithImmer } from "jotai-immer";
import type { Mantela } from "../types/mantela";

export const defaultMantelaSchemaUrl = "https://tkytel.github.io/mantela/0.1.x/mantela.schema.json";

export const getInitialMantela = (): Mantela => ({
	$schema: defaultMantelaSchemaUrl,
	aboutMe: {
		identifier: "",
		name: "",
		preferredPrefix: [],
		unavailable: false,
	},
	extensions: [],
	providers: [],
	version: "0.1.x",
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
