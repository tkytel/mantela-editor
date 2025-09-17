import { useImmerAtom } from "jotai-immer";
import { useCallback, useEffect, useMemo, useState } from "react";
import type z from "zod";
import { AlertAtom, BodyAtom } from "../../helpers/Jotai";
import { CheckboxField, NumberField, SectionHeader } from "../commons";
import { type geolocationCoordinatesSchema } from "../../types/mantela";

type CoordinatesField = keyof z.infer<typeof geolocationCoordinatesSchema>;

type CoordinatesProps =
	| {
			extensionIndex: number;
			mode: "extension";
	  }
	| {
			extensionIndex?: never;
			mode: "aboutMe";
	  };

export default function Coordinates({ extensionIndex, mode }: CoordinatesProps) {
	const [json, setJson] = useImmerAtom(BodyAtom);
	const [_, setAlerts] = useImmerAtom(AlertAtom);

	const [isSetCoord, setIsSetCoord] = useState(false);

	const targetPath = useMemo(
		() =>
			mode === "aboutMe" ? "aboutMe.geolocationCoordinates" : `extensions[${extensionIndex}].geolocationCoordinates`,
		[mode, extensionIndex],
	);
	const targetObject = useMemo(
		() =>
			mode === "aboutMe"
				? json.data.aboutMe.geolocationCoordinates
				: json.data.extensions[extensionIndex]?.geolocationCoordinates,
		[mode, extensionIndex, json.data.aboutMe.geolocationCoordinates, json.data.extensions],
	);

	const handleChange = useCallback(
		(field: CoordinatesField, value: string) => {
			setJson((draft) => {
				if (mode === "aboutMe") {
					draft.data.aboutMe.geolocationCoordinates ??= {};
				} else if (
					!draft.data.extensions[extensionIndex]?.geolocationCoordinates &&
					draft.data.extensions[extensionIndex]
				) {
					draft.data.extensions[extensionIndex].geolocationCoordinates = {};
				}

				const num = Number(value);
				if (!Number.isNaN(num)) {
					if (mode === "aboutMe") {
						draft.data.aboutMe.geolocationCoordinates![field] = num;
					} else {
						draft.data.extensions[extensionIndex].geolocationCoordinates![field] = num;
					}
				}

				const errorMessage = validateCoordinateField(field, num);
				if (errorMessage) {
					setAlerts((draft) => {
						draft.alerts[`${targetPath}.${field}`] = errorMessage;
					});
				} else if (value === "") {
					setAlerts((draft) => {
						delete draft.alerts[`${targetPath}.${field}`];
					});
				}
			});
		},
		[setAlerts, setJson, mode, extensionIndex],
	);

	useEffect(() => {
		if (isSetCoord && !targetObject) {
			setJson((draft) => {
				const coordData = {
					accuracy: 0,
					altitude: 0,
					altitudeAccuracy: 0,
					latitude: 0,
					longitude: 0,
				};

				if (mode === "aboutMe") {
					draft.data.aboutMe.geolocationCoordinates = coordData;
				} else if (draft.data.extensions[extensionIndex]) {
					draft.data.extensions[extensionIndex].geolocationCoordinates = coordData;
				}
			});
		}
	}, [isSetCoord, setJson, mode, extensionIndex, targetObject]);

	useEffect(() => {
		if (targetObject) {
			setIsSetCoord(true);
		}
	}, [mode, extensionIndex, targetObject]);

	return (
		<>
			<CheckboxField
				checked={isSetCoord}
				description="この値は明らかに設定する必要がありません！覚悟を持って有効にしてください。"
				id={mode === "aboutMe" ? "helper-checkbox-aboutMe" : `helper-checkbox-extension-${extensionIndex}`}
				label="設置場所を指定する"
				onChange={(checked) => {
					setIsSetCoord(checked);
				}}
			/>
			{isSetCoord && (
				<>
					<SectionHeader>設置場所</SectionHeader>
					<p className="mb-2 text-sm">
						これらの値は、
						<a className="underline" href="https://tkytel.github.io/cocokano/">
							CocoKano
						</a>
						で取得できます。
					</p>

					<NumberField
						id={`${targetPath}.latitude`}
						label="緯度"
						max={90}
						min={-90}
						onChange={(value) => {
							handleChange("latitude", value);
						}}
						placeholder="位置の緯度を十進数の角度で指定してください"
						value={targetObject?.latitude?.toString() ?? ""}
					/>

					<NumberField
						id={`${targetPath}.longitude`}
						label="経度"
						max={180}
						min={-180}
						onChange={(value) => {
							handleChange("longitude", value);
						}}
						placeholder="位置の経度を十進数の角度で指定してください"
						value={targetObject?.longitude?.toString() ?? ""}
					/>

					<NumberField
						id={`${targetPath}.altitude`}
						label="海抜高度 [m]"
						onChange={(value) => {
							handleChange("altitude", value);
						}}
						placeholder="位置の海抜高度をメートル単位で指定してください"
						value={targetObject?.altitude?.toString() ?? ""}
					/>

					<NumberField
						id={`${targetPath}.accuracy`}
						label="経緯度の精度 [m]"
						onChange={(value) => {
							handleChange("accuracy", value);
						}}
						placeholder="経緯度の精度をメートル単位で指定してください"
						value={targetObject?.accuracy?.toString() ?? ""}
					/>

					<NumberField
						id={`${targetPath}.altitudeAccuracy`}
						label="海抜高度の精度 [m]"
						onChange={(value) => {
							handleChange("altitudeAccuracy", value);
						}}
						placeholder="海抜高度の精度をメートル単位で指定してください"
						value={targetObject?.altitudeAccuracy?.toString() ?? ""}
					/>
				</>
			)}
		</>
	);
}

function validateCoordinateField(field: CoordinatesField, num: number): string | undefined {
	switch (field) {
		case "accuracy": {
			return !Number.isNaN(num) && num >= 0 ? undefined : "精度は 0 以上の数値でなければなりません。";
		}

		case "altitude": {
			return !Number.isNaN(num) && num >= 0 ? undefined : "高度は 0 以上の数値でなければなりません。";
		}

		case "altitudeAccuracy": {
			return !Number.isNaN(num) && num >= 0 ? undefined : "高度の精度は 0 以上の数値でなければなりません。";
		}

		case "latitude": {
			return !Number.isNaN(num) && num > -90 && num < 90
				? undefined
				: "緯度は -90 から 90 の間の数値である必要があります。";
		}

		case "longitude": {
			return !Number.isNaN(num) && num > -180 && num < 180
				? undefined
				: "経度は -180 から 180 の間の数値である必要があります。";
		}
	}
}
