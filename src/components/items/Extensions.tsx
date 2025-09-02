import { useImmerAtom } from "jotai-immer";
import { BodyAtom } from "../../helpers/Jotai";
import Extension from "./Extension";

export default function Extensions() {
	const [json, setJson] = useImmerAtom(BodyAtom);

	return (
		<>
			{json.data.extensions.map((val, idx) => {
				return <Extension extension={val} idx={idx} key={idx} />;
			})}
			<button
				type="button"
				className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-base px-5 py-2.5 text-center me-2 mb-2 w-full"
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
			>
				局番を追加する
			</button>
		</>
	);
}
