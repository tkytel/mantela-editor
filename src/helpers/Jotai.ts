import { atom } from "jotai";
import { atomWithImmer } from 'jotai-immer'

import type { Mantela } from "../types/mantela"

export const getInitialMantela = (): Mantela => ({
    $schema: "https://raw.githubusercontent.com/tkytel/mantela/refs/heads/main/mantela.schema.json",
    version: "0.0.0",
    aboutMe: {
        identifier: "",
        name: "",
        preferredPrefix: [],
    },
    extensions: [],
    providers: []
})

export const BodyAtom = atomWithImmer({
    isLoading: false,
    data: getInitialMantela()
})