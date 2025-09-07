import { useImmerAtom } from "jotai-immer";
import { BodyAtom } from "../../helpers/Jotai";
import { CheckboxField } from "../commons";

export default function Unavailable() {
	const [json, setJson] = useImmerAtom(BodyAtom);

	return (
		<CheckboxField
			checked={json.data.aboutMe.unavailable ?? false}
			description="交換局が（一時的に）利用できないとき、有効にしてください。"
			id="aboutMe-unavailable"
			label="利用不可"
			onChange={(checked) => {
				setJson((draft) => {
					draft.data.aboutMe.unavailable = checked;
				});
			}}
		/>
	);
}
