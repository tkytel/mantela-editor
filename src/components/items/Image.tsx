import { useImmerAtom } from "jotai-immer";
import { BodyAtom } from "../../helpers/Jotai";
import { FormField } from "../commons";

export default function Image() {
	const [json, setJson] = useImmerAtom(BodyAtom);

	return (
		<FormField
			id="aboutMe.image"
			label="交換局に関連する画像の URL"
			type="url"
			value={json.data.aboutMe.image ?? ""}
			onChange={(value) => {
				setJson((draft) => {
					draft.data.aboutMe.image = value;
				});
			}}
		/>
	);
}
