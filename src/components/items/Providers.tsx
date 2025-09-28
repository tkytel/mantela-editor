import { useImmerAtom, useSetImmerAtom } from "jotai-immer";
import { AlertAtom, BodyAtom } from "../../helpers/Jotai";
import { MantelaSchema } from "../../types/mantela";
import { AddButton, CardContainer, CheckboxField, DeleteButton, FormField, FormFieldWithButton } from "../commons";

export default function Providers() {
	const [json, setJson] = useImmerAtom(BodyAtom);
	const setAlert = useSetImmerAtom(AlertAtom);

	const fetchMantelaData = async (url: string, idx: number) => {
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error("Failed to fetch mantela.json");
			}

			const validatedData = MantelaSchema.parse(await response.json());

			setJson((draft) => {
				draft.data.providers[idx].name = validatedData.aboutMe.name;
				draft.data.providers[idx].identifier = validatedData.aboutMe.identifier;
			});
			setAlert((draft) => {
				delete draft.alerts[`providers[${idx}].mantela`];
			});
		} catch {
			setAlert((draft) => {
				draft.alerts[`providers[${idx}].mantela`] = "mantela.jsonの取得に失敗しました。URLが正しいか確認してください。";
			});
		}
	};

	return (
		<>
			{json.data.providers.map((val, idx) => {
				return (
					<CardContainer key={idx}>
						<DeleteButton
							onDelete={() => {
								setJson((draft) => {
									draft.data.providers.splice(idx, 1);
								});
							}}
						/>

						<FormField
							id={`providers[${idx}].name`}
							label="名前"
							onChange={(value) => {
								setJson((draft) => {
									draft.data.providers[idx].name = value;
								});
							}}
							required
							type="text"
							value={val.name}
						/>

						<FormField
							id={`providers[${idx}].prefix`}
							label="プレフィックス"
							onChange={(value) => {
								setJson((draft) => {
									draft.data.providers[idx].prefix = value;
								});
							}}
							type="text"
							value={val.prefix ?? ""}
						/>

						<FormField
							id={`providers[${idx}].identifier`}
							label="識別子"
							onChange={(value) => {
								setJson((draft) => {
									draft.data.providers[idx].identifier = value;
								});
							}}
							type="text"
							value={val.identifier}
						/>

						<FormFieldWithButton
							buttonContent="取得"
							id={`providers[${idx}].mantela`}
							label="mantela.json の URL"
							onButtonClick={async () => {
								if (val.mantela) {
									await fetchMantelaData(val.mantela, idx);
								}
							}}
							onChange={(value) => {
								setJson((draft) => {
									draft.data.providers[idx].mantela = value;
								});
							}}
							value={val.mantela ?? ""}
						/>

						<CheckboxField
							checked={val.unavailable ?? false}
							description="その交換局との通信が（一時的に）利用できないとき、有効にしてください。"
							id={`providers[${idx}].unavailable`}
							label="利用不可"
							onChange={(checked) => {
								setJson((draft) => {
									draft.data.providers[idx].unavailable = checked;
								});
							}}
						/>
					</CardContainer>
				);
			})}
			<AddButton
				label="外線を追加する"
				onClick={() => {
					setJson((draft) => {
						draft.data.providers.push({
							identifier: "",
							mantela: "",
							name: "",
							prefix: "",
						});
					});
				}}
				variant="primary"
			/>
		</>
	);
}
