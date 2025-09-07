import { useImmerAtom } from "jotai-immer";
import { useEffect, useState } from "react";
import { AlertAtom, BodyAtom } from "../../helpers/Jotai";
import { CheckboxField, NumberField, SectionHeader } from "../commons";

export default function Coordinates() {
	const [json, setJson] = useImmerAtom(BodyAtom);
	const [_, setAlerts] = useImmerAtom(AlertAtom);

	const [isSetCoord, setIsSetCoord] = useState(false);

	useEffect(() => {
		if (isSetCoord && !json.data.aboutMe.geolocationCoordinates) {
			setJson((draft) => {
				draft.data.aboutMe.geolocationCoordinates = {
					accuracy: 0,
					altitude: 0,
					altitudeAccuracy: 0,
					latitude: 0,
					longitude: 0,
				};
			});
		}
	}, [isSetCoord, setJson, json.data.aboutMe.geolocationCoordinates]);

	useEffect(() => {
		if (json.data.aboutMe.geolocationCoordinates) {
			setIsSetCoord(true);
		}
	}, [json.data.aboutMe.geolocationCoordinates]);

	const [latitude, setLatitude] = useState("");
	const [longitude, setLongitude] = useState("");
	const [altitude, setAltitude] = useState("");
	const [accuracy, setAccuracy] = useState("");
	const [altitudeAccuracy, setAltitudeAccuracy] = useState("");

	useEffect(() => {
		const num = Number(latitude);
		if (!Number.isNaN(num) && latitude !== "" && num > -90 && num < 90) {
			setJson((draft) => {
				if (draft.data.aboutMe.geolocationCoordinates) {
					draft.data.aboutMe.geolocationCoordinates.latitude = num;
				}
			});
			setAlerts((draft) => {
				delete draft.alerts["aboutMe.geolocationCoordinates.latitude"];
			});
		} else if (latitude === "") {
			setAlerts((draft) => {
				delete draft.alerts["aboutMe.geolocationCoordinates.latitude"];
			});
		} else {
			setAlerts((draft) => {
				draft.alerts["aboutMe.geolocationCoordinates.latitude"] = "緯度は -90 から 90 の間の数値である必要があります。";
			});
		}
	}, [latitude, setAlerts, setJson]);

	useEffect(() => {
		const num = Number(longitude);
		if (!Number.isNaN(num) && longitude !== "" && num > -180 && num < 180) {
			setJson((draft) => {
				if (draft.data.aboutMe.geolocationCoordinates) {
					draft.data.aboutMe.geolocationCoordinates.longitude = num;
				}
			});
			setAlerts((draft) => {
				delete draft.alerts["aboutMe.geolocationCoordinates.longitude"];
			});
		} else if (longitude === "") {
			setAlerts((draft) => {
				delete draft.alerts["aboutMe.geolocationCoordinates.longitude"];
			});
		} else {
			setAlerts((draft) => {
				draft.alerts["aboutMe.geolocationCoordinates.longitude"] =
					"経度は -180 から 180 の間の数値である必要があります。";
			});
		}
	}, [longitude, setAlerts, setJson]);

	useEffect(() => {
		const num = Number(altitude);
		if (!Number.isNaN(num) && altitude !== "") {
			setJson((draft) => {
				if (draft.data.aboutMe.geolocationCoordinates) {
					draft.data.aboutMe.geolocationCoordinates.altitude = num;
				}
			});
			setAlerts((draft) => {
				delete draft.alerts["aboutMe.geolocationCoordinates.altitude"];
			});
		} else if (altitude === "") {
			setAlerts((draft) => {
				delete draft.alerts["aboutMe.geolocationCoordinates.altitude"];
			});
		} else {
			setAlerts((draft) => {
				draft.alerts["aboutMe.geolocationCoordinates.altitude"] = "高度は 0 以上の数値でなければなりません。";
			});
		}
	}, [altitude, setAlerts, setJson]);

	useEffect(() => {
		const num = Number(accuracy);
		if (!Number.isNaN(num) && accuracy !== "" && num > 0) {
			setJson((draft) => {
				if (draft.data.aboutMe.geolocationCoordinates) {
					draft.data.aboutMe.geolocationCoordinates.accuracy = num;
				}
			});
			setAlerts((draft) => {
				delete draft.alerts["aboutMe.geolocationCoordinates.accuracy"];
			});
		} else if (accuracy === "") {
			setAlerts((draft) => {
				delete draft.alerts["aboutMe.geolocationCoordinates.accuracy"];
			});
		} else {
			setAlerts((draft) => {
				draft.alerts["aboutMe.geolocationCoordinates.accuracy"] = "精度は 0 以上の数値でなければなりません。";
			});
		}
	}, [accuracy, setAlerts, setJson]);

	useEffect(() => {
		const num = Number(altitudeAccuracy);
		console.log(altitudeAccuracy);
		if (!Number.isNaN(num) && altitudeAccuracy !== "" && num > 0) {
			setJson((draft) => {
				if (draft.data.aboutMe.geolocationCoordinates) {
					draft.data.aboutMe.geolocationCoordinates.altitudeAccuracy = num;
				}
			});
			setAlerts((draft) => {
				delete draft.alerts["aboutMe.geolocationCoordinates.altitudeAccuracy"];
			});
		} else if (altitudeAccuracy === "") {
			setAlerts((draft) => {
				delete draft.alerts["aboutMe.geolocationCoordinates.altitudeAccuracy"];
			});
		} else {
			setAlerts((draft) => {
				draft.alerts["aboutMe.geolocationCoordinates.altitudeAccuracy"] =
					"高度の精度は 0 以上の数値でなければなりません。";
			});
		}
	}, [altitudeAccuracy, setAlerts, setJson]);

	return (
		<>
			<CheckboxField
				checked={isSetCoord}
				description="この値は明らかに設定する必要がありません！覚悟を持って有効にしてください。"
				id="helper-checkbox"
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
						id="aboutMe.geolocationCoordinates.latitude"
						label="緯度"
						max={90}
						min={-90}
						onChange={setLatitude}
						placeholder="位置の緯度を十進数の角度で指定してください"
						value={latitude}
					/>

					<NumberField
						id="aboutMe.geolocationCoordinates.longitude"
						label="経度"
						max={180}
						min={-180}
						onChange={setLongitude}
						placeholder="位置の経度を十進数の角度で指定してください"
						value={longitude}
					/>

					<NumberField
						id="aboutMe.geolocationCoordinates.altitude"
						label="海抜高度 [m]"
						onChange={setAltitude}
						placeholder="位置の海抜高度をメートル単位で指定してください"
						value={altitude}
					/>

					<NumberField
						id="aboutMe.geolocationCoordinates.accuracy"
						label="経緯度の精度 [m]"
						onChange={setAccuracy}
						placeholder="経緯度の精度をメートル単位で指定してください"
						value={accuracy}
					/>

					<NumberField
						id="aboutMe.geolocationCoordinates.altitudeAccuracy"
						label="海抜高度の精度 [m]"
						onChange={setAltitudeAccuracy}
						placeholder="海抜高度の精度をメートル単位で指定してください"
						value={altitudeAccuracy}
					/>
				</>
			)}
		</>
	);
}
