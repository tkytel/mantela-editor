import { useImmerAtom } from "jotai-immer";
import { BodyAtom } from "../../helpers/Jotai";
import { FormField } from "../commons";

export default function Name() {
	const [json, setJson] = useImmerAtom(BodyAtom);

	return (
		<FormField
			id="aboutMe.name"
			label="名前"
			value={json.data.aboutMe.name}
			onChange={(value) => {
				setJson((draft) => {
					draft.data.aboutMe.name = value;
				});
			}}
			required
		/>
	);
}
