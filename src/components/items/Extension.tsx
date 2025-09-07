import { type MultiValue } from "react-select";
import { useImmerAtom } from "jotai-immer";
import { useEffect, useState } from "react";
import { generateExtensionIdentifier } from "../../helpers/Randomness";
import { AlertAtom, BodyAtom } from "../../helpers/Jotai";
import {
	CardContainer,
	CheckboxField,
	DeleteButton,
	FormField,
	FormFieldWithButton,
	Icon,
	LabeledCreatableSelect,
	NumberField,
	SectionHeader,
	SelectField,
} from "../commons";
import type { MantelaExtension } from "../../types/mantela";

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
					accuracy: 0,
					altitude: 0,
					altitudeAccuracy: 0,
					latitude: 0,
					longitude: 0,
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
					setIdentifier(generateExtensionIdentifier());
				}}
				onChange={(value) => {
					setIdentifier(value);
				}}
				placeholder="識別子を入力してください"
				required={false}
				type="text"
				value={identifier}
			/>{" "}
			<CheckboxField
				checked={isSetCoord}
				description="この値は明らかに設定する必要がありません！覚悟を持って有効にしてください。"
				id={`helper-checkbox-extension${idx}`}
				label="設置場所を指定する"
				onChange={(checked) => {
					setIsSetCoord(checked);
				}}
			/>
			{isSetCoord && (
				<>
					<SectionHeader>設置場所</SectionHeader>
					<p className="text-sm mb-2">
						これらの値は、
						<a className="underline" href="https://tkytel.github.io/cocokano/">
							CocoKano
						</a>{" "}
						で取得できます
					</p>

					<NumberField
						id={`extensions[${idx}].extension.geolocationCoordinates.latitude`}
						label="緯度"
						max={90}
						min={-90}
						onChange={(value) => {
							setLatitude(value);
						}}
						placeholder="位置の緯度を十進数の角度で指定してください"
						value={latitude}
					/>

					<NumberField
						id={`extensions[${idx}].extension.geolocationCoordinates.longitude`}
						label="経度"
						max={180}
						min={-180}
						onChange={(value) => {
							setLongitude(value);
						}}
						placeholder="位置の経度を十進数の角度で指定してください"
						value={longitude}
					/>

					<NumberField
						id={`extensions[${idx}].extension.geolocationCoordinates.altitude`}
						label="海抜高度 [m]"
						onChange={(value) => {
							setAltitude(value);
						}}
						placeholder="位置の海抜高度をメートル単位で指定してください"
						value={altitude}
					/>

					<NumberField
						id={`extensions[${idx}].extension.geolocationCoordinates.accuracy`}
						label="経緯度の精度 [m]"
						onChange={(value) => {
							setAccuracy(value);
						}}
						placeholder="経緯度の精度をメートル単位で指定してください"
						value={accuracy}
					/>

					<NumberField
						id={`extensions[${idx}].extension.geolocationCoordinates.altitudeAccuracy`}
						label="海抜高度の精度 [m]"
						onChange={(value) => {
							setAltitudeAccuracy(value);
						}}
						placeholder="海抜高度の精度をメートル単位で指定してください"
						value={altitudeAccuracy}
					/>
				</>
			)}
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
