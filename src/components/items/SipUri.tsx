import { useImmerAtom } from "jotai-immer";
import Creatable from "react-select/creatable";
import { type MultiValue } from "react-select";
import { BodyAtom } from "../../helpers/Jotai";

type Option = { value: string; label: string };

export default function SipUri() {
	const [json, setJson] = useImmerAtom(BodyAtom);

	// JSON 側から更新された sipUri を、react-select/creatable でハンドルできる型に変換する
	const { sipUri } = json.data.aboutMe;
	const selectedUris: Option[] = (sipUri ?? []).map((value: string) => ({
		value,
		label: value,
	}));

	// UI 側から更新された sipUri を、react-select/creatable の要素を排除して JSON 側に反映させる
	const handleChange = (selected: MultiValue<Option>) => {
		const values = selected ? selected.map((opt) => opt.value) : [];
		setJson((draft) => {
			draft.data.aboutMe.sipUri = values;
		});
	};

	return (
		<div className="mb-5">
			<label htmlFor="aboutMe.sipUri" className="block mb-2 text-sm font-medium text-gray-900">
				SIP URI (
				<a href="https://tools.ietf.org/html/rfc3261#section-19.1" target="_blank" rel="noopener noreferrer">
					RFC 3261 §19.1 準拠
				</a>
				)
			</label>
			<div className="relative w-full">
				<Creatable
					isClearable
					isMulti
					onChange={handleChange}
					value={selectedUris}
					placeholder="SIP URI を入力して、リターンキーを押してください..."
				/>
			</div>
		</div>
	);
}
