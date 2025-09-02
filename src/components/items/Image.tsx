import { useImmerAtom } from "jotai-immer";
import { BodyAtom } from "../../helpers/Jotai";

export default function Image() {
	const [json, setJson] = useImmerAtom(BodyAtom);

	return (
		<div className="mb-5">
			<label htmlFor="aboutMe.image" className="block mb-2 text-sm font-medium text-gray-900">
				交換局に関連する画像の URL
			</label>
			<div className="relative w-full">
				<input
					type="url"
					id="aboutMe.image"
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
					onChange={(e) => {
						setJson((draft) => {
							draft.data.aboutMe.image = e.target.value;
						});
					}}
					value={json.data.aboutMe.image ?? ""}
				/>
			</div>
		</div>
	);
}
