import { useImmerAtom } from "jotai-immer";
import { BodyAtom } from "../../helpers/Jotai";
import { AddButton } from "../commons";
import Extension from "./Extension";

export default function Extensions() {
	const [json, setJson] = useImmerAtom(BodyAtom);

	return (
		<>
			{json.data.extensions.map((val, idx) => {
				return <Extension extension={val} idx={idx} key={idx} />;
			})}
			<AddButton
				label="局番を追加する"
				onClick={() => {
					setJson((draft) => {
						draft.data.extensions.push({
							extension: "",
							identifier: "",
							image: "",
							model: "",
							name: "",
							type: "phone",
						});
					});
				}}
				variant="purple"
			/>
		</>
	);
}
