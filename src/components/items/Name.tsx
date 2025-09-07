import { useImmerAtom } from "jotai-immer";
import { BodyAtom } from "../../helpers/Jotai";
import { FormField } from "../commons";

export default function Name() {
	const [json, setJson] = useImmerAtom(BodyAtom);

	return (
		<FormField
			id="aboutMe.name"
			label="名前"
			onChange={(value) => {
				setJson((draft) => {
					draft.data.aboutMe.name = value;
				});
			}}
			required
			value={json.data.aboutMe.name}
		/>
	);
}
