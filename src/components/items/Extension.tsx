import { type MultiValue } from "react-select";
import { useImmerAtom } from "jotai-immer";
import { useEffect, useState } from "react";
import { generateExtensionIdentifier } from "../../helpers/Randomness";
import { AlertAtom, BodyAtom } from "../../helpers/Jotai";
import {
	SectionHeader,
	CardContainer,
	DeleteButton,
	FormField,
	SelectField,
	NumberField,
	CheckboxField,
	FormFieldWithButton,
	LabeledCreatableSelect,
	Icon,
} from "../commons";
import type { MantelaExtension } from "../../types/mantela";

type Option = { value: string; label: string };
const ExtensionTypeOptions = [
	{ value: "alias", label: "単一の端末に対する転送番号" },
	{ value: "application", label: "対話的な機能を有する自動応答端末" },
	{ value: "cellphone", label: "スマホでない携帯電話機" },
	{ value: "dialphone", label: "ダイヤルパルスを用いる固定電話機" },
	{ value: "fax", label: "ファクシミリ機" },
	{ value: "information", label: "音声による情報提供を目的とした自動応答端末" },
	{ value: "conference", label: "会議室" },
	{ value: "main", label: "コールキューや複数の端末に対する転送番号" },
	{ value: "modem", label: "モデム端末" },
	{ value: "music", label: "音声による情報提供を目的としない自動応答端末" },
	{ value: "other", label: "その他の端末" },
	{ value: "phone", label: "電話機" },
	{ value: "pushphone", label: "プッシュトーンを用いる固定電話機" },
	{ value: "reserved", label: "予約済の番号" },
	{ value: "smartphone", label: "スマートフォン" },
	{ value: "switchboard", label: "対話的に転送先を選択できる転送番号" },
	{ value: "unknown", label: "種別の不明な端末" },
	{ value: "unused", label: "使用されていない番号" },
] as const satisfies Option[];

export default function Extension({ extension, idx }: { extension: MantelaExtension; idx: number }) {
	const [json, setJson] = useImmerAtom(BodyAtom);

	// JSON 側から更新された prefix を、react-select/creatable でハンドルできる型に変換する
	const selectedPrefixesIdentifier: Option[] = (extension.transferTo ?? []).map((value: string) => ({
		value,
		label: value,
	}));

	// UI 側から更新された prefix を、react-select/creatable の要素を排除して JSON 側に反映させる
	const handleChange = (selected: MultiValue<Option>) => {
		const values = selected ? selected.map(({ value }) => value) : [];
		setJson((draft) => {
			draft.data.extensions[idx].transferTo = values;
		});
	};

	const [isSetCoord, setIsSetCoord] = useState(false);
	const [identifier, setIdentifier] = useState("");
	const [latitude, setLatitude] = useState("");
	const [longitude, setLongitude] = useState("");
	const [altitude, setAltitude] = useState("");
	const [accuracy, setAccuracy] = useState("");
	const [altitudeAccuracy, setAltitudeAccuracy] = useState("");
	const [_, setAlerts] = useImmerAtom(AlertAtom);

	useEffect(() => {
		if (identifier !== "" && /^[\u0021-\u007E]+$/.test(identifier)) {
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
	}, [identifier, idx, setJson, setAlerts]);

	useEffect(() => {
		const num = Number(latitude);
		if (!Number.isNaN(num) && latitude !== "" && num > -90 && num < 90) {
			setJson((draft) => {
				if (draft.data.extensions[idx].geolocationCoordinates) {
					draft.data.extensions[idx].geolocationCoordinates.latitude = num;
				}
			});
			setAlerts((draft) => {
				delete draft.alerts["extensions[" + idx + "].geolocationCoordinates.latitude"];
			});
		} else if (latitude === "") {
			setAlerts((draft) => {
				delete draft.alerts["extensions[" + idx + "].geolocationCoordinates.latitude"];
			});
		} else {
			setAlerts((draft) => {
				draft.alerts["extensions[" + idx + "].geolocationCoordinates.latitude"] =
					"緯度は -90 から 90 の間の数値である必要があります。";
			});
		}
	}, [latitude, idx, setJson, setAlerts]);

	useEffect(() => {
		const num = Number(longitude);
		if (!Number.isNaN(num) && longitude !== "" && num > -180 && num < 180) {
			setJson((draft) => {
				if (draft.data.extensions[idx].geolocationCoordinates) {
					draft.data.extensions[idx].geolocationCoordinates.longitude = num;
				}
			});
			setAlerts((draft) => {
				delete draft.alerts["extensions[" + idx + "].geolocationCoordinates.longitude"];
			});
		} else if (longitude === "") {
			setAlerts((draft) => {
				delete draft.alerts["extensions[" + idx + "].geolocationCoordinates.longitude"];
			});
		} else {
			setAlerts((draft) => {
				draft.alerts["extensions[" + idx + "].geolocationCoordinates.longitude"] =
					"経度は -180 から 180 の間の数値である必要があります。";
			});
		}
	}, [longitude, idx, setJson, setAlerts]);

	useEffect(() => {
		const num = Number(altitude);
		if (!Number.isNaN(num) && altitude !== "") {
			setJson((draft) => {
				if (draft.data.extensions[idx].geolocationCoordinates) {
					draft.data.extensions[idx].geolocationCoordinates.altitude = num;
				}
			});
			setAlerts((draft) => {
				delete draft.alerts["extensions[" + idx + "].geolocationCoordinates.altitude"];
			});
		} else if (altitude === "") {
			setAlerts((draft) => {
				delete draft.alerts["extensions[" + idx + "].geolocationCoordinates.altitude"];
			});
		} else {
			setAlerts((draft) => {
				draft.alerts["extensions[" + idx + "].geolocationCoordinates.altitude"] =
					"高度は 0 以上の数値でなければなりません。";
			});
		}
	}, [altitude, idx, setJson, setAlerts]);

	useEffect(() => {
		const num = Number(accuracy);
		if (!Number.isNaN(num) && accuracy !== "" && num > 0) {
			setJson((draft) => {
				if (draft.data.extensions[idx].geolocationCoordinates) {
					draft.data.extensions[idx].geolocationCoordinates.accuracy = num;
				}
			});
			setAlerts((draft) => {
				delete draft.alerts["extensions[" + idx + "].geolocationCoordinates.accuracy"];
			});
		} else if (accuracy === "") {
			setAlerts((draft) => {
				delete draft.alerts["extensions[" + idx + "].geolocationCoordinates.accuracy"];
			});
		} else {
			setAlerts((draft) => {
				draft.alerts["extensions[" + idx + "].geolocationCoordinates.accuracy"] =
					"精度は 0 以上の数値でなければなりません。";
			});
		}
	}, [accuracy, idx, setJson, setAlerts]);

	useEffect(() => {
		const num = Number(altitudeAccuracy);
		if (!Number.isNaN(num) && altitudeAccuracy !== "" && num > 0) {
			setJson((draft) => {
				if (draft.data.extensions[idx].geolocationCoordinates) {
					draft.data.extensions[idx].geolocationCoordinates.altitudeAccuracy = num;
				}
			});
			setAlerts((draft) => {
				delete draft.alerts["extensions[" + idx + "].geolocationCoordinates.altitudeAccuracy"];
			});
		} else if (altitudeAccuracy === "") {
			setAlerts((draft) => {
				delete draft.alerts["extensions[" + idx + "].geolocationCoordinates.altitudeAccuracy"];
			});
		} else {
			setAlerts((draft) => {
				draft.alerts["extensions[" + idx + "].geolocationCoordinates.altitudeAccuracy"] =
					"高度の精度は 0 以上の数値でなければなりません。";
			});
		}
	}, [altitudeAccuracy, idx, setJson, setAlerts]);

	useEffect(() => {
		if (isSetCoord && !json.data.extensions[idx].geolocationCoordinates) {
			setJson((draft) => {
				draft.data.extensions[idx].geolocationCoordinates = {
					latitude: 0,
					longitude: 0,
					altitude: 0,
					accuracy: 0,
					altitudeAccuracy: 0,
				};
			});
		}
	}, [isSetCoord, idx, json.data.extensions, setJson]);

	useEffect(() => {
		if (json.data.extensions[idx].geolocationCoordinates) {
			setIsSetCoord(true);
		}
	}, [idx, json.data.extensions]);

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
				type="text"
				value={json.data.extensions[idx].name}
				onChange={(value) => {
					setJson((draft) => {
						draft.data.extensions[idx].name = value;
					});
				}}
				placeholder="システムの内部名を記入してください"
				required={true}
			/>
			{/* モデル */}
			<FormField
				id={`extensions[${idx}].model`}
				label="端末のモデル・型式名"
				type="text"
				value={json.data.extensions[idx].model ?? ""}
				onChange={(value) => {
					setJson((draft) => {
						draft.data.extensions[idx].model = value;
					});
				}}
				placeholder="端末のモデル・型式名を記入してください"
				required={false}
			/>
			{/* 番号 */}
			<FormField
				id={`extensions[${idx}].extension`}
				label="番号"
				type="text"
				value={json.data.extensions[idx].extension}
				onChange={(value) => {
					setJson((draft) => {
						draft.data.extensions[idx].extension = value;
					});
				}}
				placeholder="内線番号を入力してください"
				required={true}
			/>
			{/* 種別 */}
			<SelectField
				id={`extensions[${idx}].type`}
				label="種別"
				options={ExtensionTypeOptions}
				value={ExtensionTypeOptions.find((option) => option.value === json.data.extensions[idx].type)?.value ?? ""}
				onChange={(selectedValue) => {
					setJson((draft) => {
						draft.data.extensions[idx].type = selectedValue as typeof extension.type;
					});
				}}
				placeholder="種別を選択してください"
			/>
			{/* 転送先; transferTo を指定しなければならない場合に入力するフィールド */}
			{["alias", "main", "switchboard"].includes(json.data.extensions[idx].type ?? "phone") && (
				<LabeledCreatableSelect
					id={`extensions[${idx}].transferTo`}
					label="転送先局番の識別子"
					value={selectedPrefixesIdentifier}
					onChange={handleChange}
					placeholder="識別子を入力して、リターンキーを押してください..."
					required={true}
					note=" (ただし、種別が特定のものである場合のみ)"
				/>
			)}
			{/* 識別子 */}
			<FormFieldWithButton
				id={`extensions[${idx}].identifier`}
				label="識別子"
				type="text"
				value={identifier}
				onChange={(value) => {
					setIdentifier(value);
				}}
				onButtonClick={() => {
					setIdentifier(generateExtensionIdentifier());
				}}
				buttonContent={<Icon variant="refresh" />}
				placeholder="識別子を入力してください"
				required={false}
			/>{" "}
			<CheckboxField
				id={`helper-checkbox-extension${idx}`}
				label="設置場所を指定する"
				description="この値は明らかに設定する必要がありません！覚悟を持って有効にしてください。"
				checked={isSetCoord}
				onChange={(checked) => {
					setIsSetCoord(checked);
				}}
			/>
			{isSetCoord && (
				<>
					<SectionHeader>設置場所</SectionHeader>
					<p className="text-sm mb-2">
						これらの値は、
						<a href="https://tkytel.github.io/cocokano/" className="underline">
							CocoKano
						</a>{" "}
						で取得できます
					</p>

					<NumberField
						id={`extensions[${idx}].extension.geolocationCoordinates.latitude`}
						label="緯度"
						placeholder="位置の緯度を十進数の角度で指定してください"
						value={latitude}
						onChange={(value) => {
							setLatitude(value);
						}}
						min={-90}
						max={90}
					/>

					<NumberField
						id={`extensions[${idx}].extension.geolocationCoordinates.longitude`}
						label="経度"
						placeholder="位置の経度を十進数の角度で指定してください"
						value={longitude}
						onChange={(value) => {
							setLongitude(value);
						}}
						min={-180}
						max={180}
					/>

					<NumberField
						id={`extensions[${idx}].extension.geolocationCoordinates.altitude`}
						label="海抜高度 [m]"
						placeholder="位置の海抜高度をメートル単位で指定してください"
						value={altitude}
						onChange={(value) => {
							setAltitude(value);
						}}
					/>

					<NumberField
						id={`extensions[${idx}].extension.geolocationCoordinates.accuracy`}
						label="経緯度の精度 [m]"
						placeholder="経緯度の精度をメートル単位で指定してください"
						value={accuracy}
						onChange={(value) => {
							setAccuracy(value);
						}}
					/>

					<NumberField
						id={`extensions[${idx}].extension.geolocationCoordinates.altitudeAccuracy`}
						label="海抜高度の精度 [m]"
						placeholder="海抜高度の精度をメートル単位で指定してください"
						value={altitudeAccuracy}
						onChange={(value) => {
							setAltitudeAccuracy(value);
						}}
					/>
				</>
			)}
			{/* 画像 */}
			<FormField
				id={`extensions[${idx}].image`}
				label="端末に関連する画像の URL"
				type="url"
				value={json.data.extensions[idx].image ?? ""}
				onChange={(value) => {
					setJson((draft) => {
						draft.data.extensions[idx].image = value;
					});
				}}
				placeholder="画像のURLを入力してください"
				required={false}
			/>
		</CardContainer>
	);
}
