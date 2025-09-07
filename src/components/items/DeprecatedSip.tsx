import { useImmerAtom } from "jotai-immer";
import { BodyAtom } from "../../helpers/Jotai";
import { FormField } from "../commons";

export default function DeprecatedSip() {
	const [json, setJson] = useImmerAtom(BodyAtom);

	return (
		<details className="mb-3">
			<summary className="mb-2">非推奨機能 (sipUsername etc.)</summary>
			<FormField
				id="aboutMe.sipUsername"
				label="SIP ユーザー名"
				onChange={(value) => {
					setJson((draft) => {
						draft.data.aboutMe.sipUsername = value;
					});
				}}
				type="text"
				value={json.data.aboutMe.sipUsername}
			/>
			<FormField
				id="aboutMe.sipPassword"
				label="SIP パスワード"
				onChange={(value) => {
					setJson((draft) => {
						draft.data.aboutMe.sipPassword = value;
					});
				}}
				type="text"
				value={json.data.aboutMe.sipPassword}
			/>
			<FormField
				id="aboutMe.sipServer"
				label="SIP サーバー"
				onChange={(value) => {
					setJson((draft) => {
						draft.data.aboutMe.sipServer = value;
					});
				}}
				type="text"
				value={json.data.aboutMe.sipServer}
			/>
		</details>
	);
}
