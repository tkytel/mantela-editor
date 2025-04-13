import ReactCodeMirror, { basicSetup, EditorView } from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs"
import { jsonParseLinter } from "@codemirror/lang-json"
import { linter } from "@codemirror/lint";
import { BodyAtom } from "../helper/Jotai";
import { SetStateAction, useCallback, useEffect, useState } from "react";
import type { Mantela } from "../types/mantela";
import { MantelaSchema } from "../types/mantela";
import { useImmerAtom } from "jotai-immer";

export default function Editor() {
    const [json, setJson] = useImmerAtom(BodyAtom);
    const [jsonStr, setJsonStr] = useState("");
    const onChange = useCallback((val: SetStateAction<string>) => {
        let newMantela: Mantela = MantelaSchema.parse(JSON.parse(val.toString()))
        setJson(draft => {
            draft.data = newMantela
        });
    }, []);
    useEffect(() => {
        let s = JSON.stringify(json.data, null, 2)
        setJsonStr(s)
    },[json])

    return (
        <ReactCodeMirror
            value={jsonStr}
            onChange={onChange}
            placeholder="ここに mantela.json を入力..."
            height="35rem"
            className="text-lg"
            extensions={[EditorView.lineWrapping, langs.json(), linter(jsonParseLinter())]}
        />
    )
}