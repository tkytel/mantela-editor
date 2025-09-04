import { useImmerAtom } from "jotai-immer";
import { BodyAtom } from "../../helpers/Jotai";

export default function DeprecatedSip() {
	const [json, setJson] = useImmerAtom(BodyAtom);

	return (
		<details className="mb-3">
			<summary className="mb-2">非推奨機能 (sipUsername etc.)</summary>
			<div className="mb-5">
				<label htmlFor="aboutMe.sipUsername" className="block mb-2 text-sm font-medium text-gray-900">
					SIP ユーザー名
				</label>
				<div className="relative w-full">
					<input
						type="text"
						id="aboutMe.sipUsername"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						onChange={(e) => {
							setJson((draft) => {
								draft.data.aboutMe.sipUsername = e.target.value;
							});
						}}
						value={json.data.aboutMe.sipUsername}
					/>
				</div>
			</div>
			<div className="mb-5">
				<label htmlFor="aboutMe.sipPassword" className="block mb-2 text-sm font-medium text-gray-900">
					SIP パスワード
				</label>
				<div className="relative w-full">
					<input
						type="text"
						id="aboutMe.sipPassword"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						onChange={(e) => {
							setJson((draft) => {
								draft.data.aboutMe.sipPassword = e.target.value;
							});
						}}
						value={json.data.aboutMe.sipPassword}
					/>
				</div>
			</div>
			<div className="mb-5">
				<label htmlFor="aboutMe.sipServer" className="block mb-2 text-sm font-medium text-gray-900">
					SIP サーバー
				</label>
				<div className="relative w-full">
					<input
						type="text"
						id="aboutMe.sipServer"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						onChange={(e) => {
							setJson((draft) => {
								draft.data.aboutMe.sipServer = e.target.value;
							});
						}}
						value={json.data.aboutMe.sipServer}
					/>
				</div>
			</div>
		</details>
	);
}
