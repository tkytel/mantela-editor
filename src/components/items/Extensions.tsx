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
				onClick={() => {
					setJson((draft) => {
						draft.data.extensions.push({
							name: "",
							extension: "",
							model: "",
							type: "phone",
							identifier: "",
							image: "",
						});
					});
				}}
				label="局番を追加する"
				variant="purple"
			/>
		</>
	);
}
