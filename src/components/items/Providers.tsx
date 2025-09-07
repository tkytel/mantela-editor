import { useImmerAtom } from "jotai-immer";
import { BodyAtom } from "../../helpers/Jotai";
import { MantelaSchema } from "../../types/mantela";
import { CardContainer, DeleteButton, FormField, CheckboxField, AddButton, FormFieldWithButton } from "../commons";

export default function Providers() {
	const [json, setJson] = useImmerAtom(BodyAtom);

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
		} catch (error: unknown) {
			/* eslint-disable-next-line no-alert */
			alert(`mantela.jsonの取得に失敗しました。\n${error instanceof Error ? error.message : String(error)}`);
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
							required
							type="text"
							value={val.name}
							onChange={(value) => {
								setJson((draft) => {
									draft.data.providers[idx].name = value;
								});
							}}
						/>

						<FormField
							id={`providers[${idx}].prefix`}
							label="プレフィックス"
							type="text"
							value={val.prefix ?? ""}
							onChange={(value) => {
								setJson((draft) => {
									draft.data.providers[idx].prefix = value;
								});
							}}
						/>

						<FormField
							id={`providers[${idx}].identifier`}
							label="識別子"
							type="text"
							value={val.identifier}
							onChange={(value) => {
								setJson((draft) => {
									draft.data.providers[idx].identifier = value;
								});
							}}
						/>

						<FormFieldWithButton
							id={`providers[${idx}].mantela`}
							label="mantela.json の URL"
							buttonContent="取得"
							onButtonClick={async () => {
								if (val.mantela) {
									await fetchMantelaData(val.mantela, idx);
								}
							}}
							value={val.mantela ?? ""}
						/>

						<CheckboxField
							id={`providers[${idx}].unavailable`}
							label="利用不可"
							description="その交換局との通信が（一時的に）利用できないとき、有効にしてください。"
							checked={val.unavailable ?? false}
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
				variant="primary"
				label="外線を追加する"
				onClick={() => {
					setJson((draft) => {
						draft.data.providers.push({
							name: "",
							prefix: "",
							identifier: "",
							mantela: "",
						});
					});
				}}
			/>
		</>
	);
}
