/**
 * Json-schema-library は JSON の値に対するポインターを提供していないため、
 * 値ノードに対するポインターも含む拡張ポインターマップを生成するようにした。
 */
import { syntaxTree } from "@codemirror/language";
import type { EditorView } from "@codemirror/view";
import type { Diagnostic, LintSource } from "@codemirror/lint";
import { compileSchema, draft07, type JsonError } from "json-schema-library";
import { getJSONSchema } from "codemirror-json-schema";

type SyntaxNode = ReturnType<typeof syntaxTree>["topNode"];

/**
 * トークンタイプの定義
 */
const TOKENS = {
	ARRAY: "Array",
	FALSE: "False",
	NULL: "Null",
	NUMBER: "Number",
	OBJECT: "Object",
	PROPERTY: "Property",
	PROPERTY_NAME: "PropertyName",
	STRING: "String",
	TRUE: "True",
} as const;

const PRIMITIVE_TYPES = [TOKENS.STRING, TOKENS.NUMBER, TOKENS.TRUE, TOKENS.FALSE, TOKENS.NULL] as const;

/**
 * ポインター情報の型定義
 */
type PointerInfo = {
	keyFrom?: number;
	keyTo?: number;
	valueFrom?: number;
	valueTo?: number;
};

/**
 * カスタムJSONスキーマLinter
 */
export function customJsonSchemaLinter(): LintSource {
	return (view: EditorView): Diagnostic[] => {
		const schema = getJSONSchema(view.state);
		if (!schema) {
			return [];
		}

		const validator = compileSchema(schema, { drafts: [draft07] });
		const text = view.state.doc.toString();

		// 空のJSON文字列は無視
		if (!text?.length) return [];

		let json: unknown;
		try {
			json = JSON.parse(text);
		} catch {
			// パースエラーは別のlinterが処理
			return [];
		}

		const { errors, valid } = validator.validate(json);
		if (valid) return [];

		// 拡張されたポインターマップを取得
		const pointers = getEnhancedJsonPointers(view);

		// エラーのマッピング
		const diagnostics: Diagnostic[] = [];
		const positionalErrors = new Set([
			"ForbiddenPropertyError",
			"InvalidPropertyNameError",
			"NoAdditionalPropertiesError",
			"RequiredPropertyError",
			"UndefinedValueError",
		]);

		for (const error of errors) {
			const errorPath = getErrorPath(error);
			const pointer = pointers.get(errorPath);
			const errorString = rewriteError(error);

			// ルートレベルのエラー
			const errorName = error.name as string;
			if (errorName === "MaxPropertiesError" || errorName === "MinPropertiesError" || errorPath === "") {
				diagnostics.push({
					from: 0,
					message: errorString,
					severity: "error",
					to: 0,
				});
				continue;
			}

			// ポインターが見つかった場合
			if (pointer) {
				const isKeyError = positionalErrors.has(errorName);
				const from = isKeyError ? pointer.keyFrom : (pointer.valueFrom ?? pointer.keyFrom);
				const to = isKeyError ? pointer.keyTo : (pointer.valueTo ?? pointer.keyTo);

				// From/toが有効な場合のみ追加
				if (from !== undefined && to !== undefined) {
					diagnostics.push({
						from,
						message: errorString,
						severity: "error",
						to,
					});
				} else {
					// フォールバック: ルートに表示
					diagnostics.push({
						from: 0,
						message: errorString,
						severity: "error",
						to: 0,
					});
				}
			} else {
				// ポインターが見つからない場合はルートに表示
				diagnostics.push({
					from: 0,
					message: errorString,
					severity: "error",
					to: 0,
				});
			}
		}

		return diagnostics;
	};
}

/**
 * 配列内のノードのインデックスを取得
 */
function findNodeIndexInArrayNode(arrayNode: SyntaxNode, targetNode: SyntaxNode): number {
	let index = 0;
	let node = arrayNode.firstChild;
	while (node) {
		if (node === targetNode) {
			return index;
		}

		if (node.name !== "[" && node.name !== "]" && node.name !== ",") {
			index++;
		}

		node = node.nextSibling;
	}

	return -1;
}

/**
 * 拡張されたポインターマップの取得（値ノードも含む）
 */
const KEY_TOKENS = new Set<string>([TOKENS.OBJECT, TOKENS.PROPERTY_NAME]);
function getEnhancedJsonPointers(view: EditorView): Map<string, PointerInfo> {
	const { state } = view;
	const tree = syntaxTree(state);
	const pointers = new Map<string, PointerInfo>();
	const docText = state.doc.toString();

	tree.iterate({
		enter(type) {
			// プロパティ名とオブジェクトの処理
			if (KEY_TOKENS.has(type.name)) {
				const pointer = getJsonPointerAt(docText, type.node);
				const { from: keyFrom, to: keyTo } = type.node;

				// 値が存在しない場合
				if (!type.node.nextSibling?.node) {
					pointers.set(pointer, { keyFrom, keyTo });
					return true;
				}

				// 値ノードの取得（JSONモード用）
				// PropertyName -> : (colon) -> Value の構造なので、コロンをスキップ
				let valueNode: SyntaxNode | undefined = type.node.nextSibling?.node;

				// コロンをスキップして値を取得
				if (valueNode && valueNode.name === ":") {
					valueNode = valueNode.nextSibling?.node;
				}

				if (!valueNode) {
					pointers.set(pointer, { keyFrom, keyTo });
					return true;
				}

				const { from: valueFrom, to: valueTo } = valueNode;
				pointers.set(pointer, { keyFrom, keyTo, valueFrom, valueTo });
				return true;
			}

			// プリミティブ値ノードと配列の処理
			if ((PRIMITIVE_TYPES as readonly string[]).includes(type.name) || type.name === TOKENS.ARRAY) {
				const pointer = getJsonPointerAt(docText, type.node);
				// すでにポインターが存在しない場合のみ追加
				if (!pointers.has(pointer)) {
					const { from: valueFrom, to: valueTo } = type.node;
					pointers.set(pointer, { valueFrom, valueTo });
				}

				return true;
			}
		},
	});

	return pointers;
}

/**
 * エラーパスの取得
 */
function getErrorPath(error: JsonError): string {
	// ポインターが存在する場合
	if (error?.data?.pointer && error.data.pointer !== "#") {
		return error.data.pointer.slice(1);
	}

	// プロパティが存在する場合
	if (error?.data?.property) {
		return `/${error.data.property as string}`;
	}

	// ルートレベル
	return "";
}

/**
 * JSONポインターの取得
 */
function getJsonPointerAt(docText: string, node: SyntaxNode): string {
	const path: string[] = [];
	for (let n = node; n?.parent; n = n.parent) {
		switch (n.parent.name) {
			case TOKENS.ARRAY: {
				const index = findNodeIndexInArrayNode(n.parent, n);
				if (index >= 0) {
					path.unshift(`${index}`);
				}

				break;
			}

			case TOKENS.PROPERTY: {
				const name = getMatchingChildNode(n.parent, TOKENS.PROPERTY_NAME);
				if (name) {
					const word = getWord(docText, name).replaceAll(/[/~]/g, (v) => (v === "~" ? "~0" : "~1"));
					path.unshift(word);
				}

				break;
			}

			default: {
				break;
			}
		}
	}

	if (path.length === 0) {
		return "";
	}

	return "/" + path.join("/");
}

/**
 * プロパティ名ノードの取得
 */
function getMatchingChildNode(parent: SyntaxNode, tokenType: string): SyntaxNode | undefined {
	let node = parent.firstChild;
	while (node) {
		if (node.name === tokenType) {
			return node;
		}

		node = node.nextSibling;
	}

	return undefined;
}

/**
 * プロパティ名の取得
 */
function getWord(docText: string, node: SyntaxNode): string {
	return docText.slice(node.from, node.to).replaceAll(/^["']|["']$/g, "");
}

/**
 * エラーメッセージの書き換え
 */
function rewriteError(error: JsonError): string {
	const errorData = error.data;
	const { errors } = errorData;

	if (error.code === "one-of-error" && Array.isArray(errors)) {
		const expected = errors.map((e: JsonError) => e.data.expected).join(" or ");
		return `Expected one of ${expected}`;
	}

	if (error.code === "type-error") {
		const expected = Array.isArray(errorData?.expected)
			? errorData.expected.join(" or ")
			: (errorData?.expected as string);
		return `Expected \`${expected}\` but received \`${errorData?.received as string}\``;
	}

	const message = error.message
		.replaceAll("in `#` ", "")
		.replaceAll("at `#`", "")
		.replaceAll("/", ".")
		.replaceAll("#.", "");
	return message;
}
