import CodeMirror, { type ReactCodeMirrorProps, type ReactCodeMirrorRef } from "@uiw/react-codemirror";
import {
	handleRefresh,
	jsonCompletion,
	jsonSchemaHover,
	jsonSchemaLinter,
	stateExtensions,
	updateSchema,
} from "codemirror-json-schema";
import { $RefParser } from "@apidevtools/json-schema-ref-parser";
import { useCallback, useEffect, useRef, useState } from "react";
import { useImmerAtom } from "jotai-immer";
import { useAtomValue } from "jotai";
import { linter } from "@codemirror/lint";
import { hoverTooltip } from "@codemirror/view";
import { json as jsonLang, jsonLanguage, jsonParseLinter } from "@codemirror/lang-json";
import { MantelaSchema } from "../types/mantela";
import { BodyAtom, defaultMantelaSchemaUrl } from "../helpers/Jotai";
import { ResolvedThemeAtom } from "../helpers/Theme";
import { Icon } from "./commons";

// JSONSchema7
type Schema = NonNullable<Parameters<typeof updateSchema>[1]>;

const extensions = [
	jsonLang(),
	linter(jsonParseLinter()),
	linter(jsonSchemaLinter(), {
		needsRefresh: handleRefresh,
	}),
	jsonLanguage.data.of({
		autocomplete: jsonCompletion(),
	}),
	hoverTooltip(jsonSchemaHover()),
	stateExtensions(),
];

export default function Json() {
	const [json, setJson] = useImmerAtom(BodyAtom);
	const [jsonStr, setJsonStr] = useState("");
	const [parseErr, setParseErr] = useState("");
	const [schemaUrl, setSchemaUrl] = useState<string>(defaultMantelaSchemaUrl);
	const resolvedTheme = useAtomValue(ResolvedThemeAtom);

	const editorRef = useRef<ReactCodeMirrorRef>(null);

	const handleChange = useCallback<NonNullable<ReactCodeMirrorProps["onChange"]>>(
		(val) => {
			const newMantela = MantelaSchema.safeParse(JSON.parse(val.toString()));
			if (newMantela.success) {
				const { data } = newMantela;

				if (data.$schema) {
					setSchemaUrl(data.$schema);
				}

				setJson((draft) => {
					draft.data = data;
				});
				setParseErr("");
			} else {
				setParseErr(newMantela.error.message);
			}
		},
		[setJson],
	);

	useEffect(() => {
		setJsonStr(JSON.stringify(json.data, null, 2));
	}, [json]);

	useEffect(() => {
		const fetchSchema = async () => {
			try {
				const parser = new $RefParser();
				const dereferencedSchema = await parser.dereference(schemaUrl, {
					continueOnError: false,
					resolve: {
						external: true,
					},
				});
				const currentView = editorRef?.current?.view;
				if (currentView && dereferencedSchema) {
					updateSchema(currentView, dereferencedSchema as Schema);
				}
			} catch (error) {
				console.error("Failed to fetch or dereference schema:", error);
			}
		};

		(async () => {
			await fetchSchema();
		})();
	}, [schemaUrl]);

	return (
		<>
			{parseErr !== "" && (
				<div className="px-4 pt-3 border border-gray-300 rounded-lg bg-gray-50 mb-2" role="alert">
					<div className="flex items-center">
						<Icon variant="info" />
						<span className="sr-only">Info</span>
						<h3 className="text-lg font-medium text-gray-800">不正な mantela.json です！</h3>
					</div>
					<div className="mt-2 mb-4 text-sm text-gray-800">
						<p className="mt-2">この状態で左側の UI を操作すると、変更が失われることがある点に留意してください。</p>
					</div>
				</div>
			)}

			<CodeMirror
				className="text-base"
				extensions={extensions}
				height="70vh"
				onChange={handleChange}
				placeholder="ここに mantela.json を入力..."
				ref={editorRef}
				theme={resolvedTheme}
				value={jsonStr}
			/>
		</>
	);
}
