import { type MultiValue } from "react-select";
import { useImmerAtom } from "jotai-immer";
import { useEffect } from "react";
import { generateExtensionIdentifier } from "../../helpers/Randomness";
import { AlertAtom, BodyAtom } from "../../helpers/Jotai";
import {
	CardContainer,
	DeleteButton,
	FormField,
	FormFieldWithButton,
	Icon,
	LabeledCreatableSelect,
	SelectField,
} from "../commons";
import type { MantelaExtension } from "../../types/mantela";
import Coordinates from "./Coordinates";

type Option = { label: string; value: string };
const ExtensionTypeOptions = [
	{ label: "単一の端末に対する転送番号", value: "alias" },
	{ label: "対話的な機能を有する自動応答端末", value: "application" },
	{ label: "スマホでない携帯電話機", value: "cellphone" },
	{ label: "ダイヤルパルスを用いる固定電話機", value: "dialphone" },
	{ label: "ファクシミリ機", value: "fax" },
	{ label: "音声による情報提供を目的とした自動応答端末", value: "information" },
	{ label: "会議室", value: "conference" },
	{ label: "コールキューや複数の端末に対する転送番号", value: "main" },
	{ label: "モデム端末", value: "modem" },
	{ label: "音声による情報提供を目的としない自動応答端末", value: "music" },
	{ label: "その他の端末", value: "other" },
	{ label: "電話機", value: "phone" },
	{ label: "プッシュトーンを用いる固定電話機", value: "pushphone" },
	{ label: "予約済の番号", value: "reserved" },
	{ label: "スマートフォン", value: "smartphone" },
	{ label: "対話的に転送先を選択できる転送番号", value: "switchboard" },
	{ label: "種別の不明な端末", value: "unknown" },
	{ label: "使用されていない番号", value: "unused" },
] as const satisfies Option[];

export default function Extension({ extension, idx }: { extension: MantelaExtension; idx: number }) {
	const [json, setJson] = useImmerAtom(BodyAtom);

	// JSON 側から更新された prefix を、react-select/creatable でハンドルできる型に変換する
	const selectedPrefixesIdentifier: Option[] = (extension.transferTo ?? []).map((value: string) => ({
		label: value,
		value,
	}));

	// UI 側から更新された prefix を、react-select/creatable の要素を排除して JSON 側に反映させる
	const handleChange = (selected: MultiValue<Option>) => {
		const values = selected ? selected.map(({ value }) => value) : [];
		setJson((draft) => {
			draft.data.extensions[idx].transferTo = values;
		});
	};

	const [_, setAlerts] = useImmerAtom(AlertAtom);

	useEffect(() => {
		const { identifier } = json.data.extensions[idx];
		if (identifier && /^[\u0021-\u007E]+$/.test(identifier)) {
			setJson((draft) => {
				draft.data.extensions[idx].identifier = identifier;
			});
			setAlerts((draft) => {
				delete draft.alerts["extensions[" + idx + "].identifier"];
			});
		} else if (identifier === "") {
			setAlerts((draft) => {
				delete draft.alerts["extensions[" + idx + "].identifier"];
			});
		} else {
			setAlerts((draft) => {
				draft.alerts["extensions[" + idx + "].identifier"] =
					"局の識別子は半角英数字と記号 (!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~) のみを使用してください。";
			});
		}
	}, [json.data.extensions[idx].identifier, idx, setJson, setAlerts]);

	return (
		<CardContainer key={idx}>
			<DeleteButton
				onDelete={() => {
					setJson((draft) => {
						draft.data.extensions.splice(idx, 1);
					});
				}}
			/>
			{/* 名前 */}
			<FormField
				id={`extensions[${idx}].name`}
				label="名前"
				onChange={(value) => {
					setJson((draft) => {
						draft.data.extensions[idx].name = value;
					});
				}}
				placeholder="システムの内部名を記入してください"
				required={true}
				type="text"
				value={json.data.extensions[idx].name}
			/>
			{/* モデル */}
			<FormField
				id={`extensions[${idx}].model`}
				label="端末のモデル・型式名"
				onChange={(value) => {
					setJson((draft) => {
						draft.data.extensions[idx].model = value;
					});
				}}
				placeholder="端末のモデル・型式名を記入してください"
				required={false}
				type="text"
				value={json.data.extensions[idx].model ?? ""}
			/>
			{/* 番号 */}
			<FormField
				id={`extensions[${idx}].extension`}
				label="番号"
				onChange={(value) => {
					setJson((draft) => {
						draft.data.extensions[idx].extension = value;
					});
				}}
				placeholder="内線番号を入力してください"
				required={true}
				type="text"
				value={json.data.extensions[idx].extension}
			/>
			{/* 種別 */}
			<SelectField
				id={`extensions[${idx}].type`}
				label="種別"
				onChange={(selectedValue) => {
					setJson((draft) => {
						draft.data.extensions[idx].type = selectedValue as typeof extension.type;
					});
				}}
				options={ExtensionTypeOptions}
				placeholder="種別を選択してください"
				value={ExtensionTypeOptions.find((option) => option.value === json.data.extensions[idx].type)?.value ?? ""}
			/>
			{/* 転送先; transferTo を指定しなければならない場合に入力するフィールド */}
			{["alias", "main", "switchboard"].includes(json.data.extensions[idx].type ?? "phone") && (
				<LabeledCreatableSelect
					id={`extensions[${idx}].transferTo`}
					label="転送先局番の識別子"
					note=" (ただし、種別が特定のものである場合のみ)"
					onChange={handleChange}
					placeholder="識別子を入力して、リターンキーを押してください..."
					required={true}
					value={selectedPrefixesIdentifier}
				/>
			)}
			{/* 識別子 */}
			<FormFieldWithButton
				buttonContent={<Icon variant="refresh" />}
				id={`extensions[${idx}].identifier`}
				label="識別子"
				onButtonClick={() => {
					setJson((draft) => {
						draft.data.extensions[idx].identifier = generateExtensionIdentifier();
					});
				}}
				onChange={(value) => {
					setJson((draft) => {
						draft.data.extensions[idx].identifier = value;
					});
				}}
				placeholder="識別子を入力してください"
				required={false}
				type="text"
				value={json.data.extensions[idx].identifier ?? ""}
			/>

			{/* 設置場所 */}
			<Coordinates extensionIndex={idx} mode="extension" />

			{/* 画像 */}
			<FormField
				id={`extensions[${idx}].image`}
				label="端末に関連する画像の URL"
				onChange={(value) => {
					setJson((draft) => {
						draft.data.extensions[idx].image = value;
					});
				}}
				placeholder="画像のURLを入力してください"
				required={false}
				type="url"
				value={json.data.extensions[idx].image ?? ""}
			/>
		</CardContainer>
	);
}
