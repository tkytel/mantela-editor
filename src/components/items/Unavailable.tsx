import { useImmerAtom } from "jotai-immer";
import { BodyAtom } from "../../helpers/Jotai";

export default function Unavailable() {
	const [json, setJson] = useImmerAtom(BodyAtom);

	return (
		<div className="flex mb-3">
			<div className="flex items-center h-5">
				<input
					id="aboutMe-unavailable"
					aria-describedby="aboutMe-unavailable-text"
					type="checkbox"
					checked={json.data.aboutMe.unavailable}
					onChange={(e) => {
						setJson((draft) => {
							draft.data.aboutMe.unavailable = e.target.checked;
						});
					}}
					className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2"
				/>
			</div>
			<div className="ms-2 text-sm">
				<label htmlFor="aboutMe-unavailable" className="font-medium text-gray-900">
					利用不可
				</label>
				<p id="aboutMe-unavailable-text" className="text-xs font-normal text-gray-500">
					交換局が（一時的に）利用できないとき、有効にしてください。
				</p>
			</div>
		</div>
	);
}
