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
import { linter } from "@codemirror/lint";
import { hoverTooltip } from "@codemirror/view";
import { json as jsonLang, jsonLanguage, jsonParseLinter } from "@codemirror/lang-json";
import { MantelaSchema } from "../types/mantela";
import { BodyAtom, defaultMantelaSchemaUrl } from "../helpers/Jotai";

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
						<svg
							aria-hidden="true"
							className="shrink-0 w-4 h-4 me-2"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
						</svg>
						<span className="sr-only">Info</span>
						<h3 className="text-lg font-medium text-gray-800">不正な mantela.json です</h3>
					</div>
					<div className="mt-2 mb-4 text-sm text-gray-800">
						<div className="block p-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100">
							{parseErr}
						</div>
						<h2 className="mb-2 text-base text-gray-900 mt-3">修正のためのヒント:</h2>
						<ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside ml-2">
							<li>必須なフィールドが存在していること</li>
							<li>JSON として正しい文字列であること</li>
						</ul>
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
				value={jsonStr}
			/>
		</>
	);
}
