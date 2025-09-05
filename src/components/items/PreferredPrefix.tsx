import { useImmerAtom } from "jotai-immer";
import { BodyAtom } from "../../helpers/Jotai";
import { LabeledCreatableSelect } from "../commons";

type Option = { value: string; label: string };

export default function PreferredPrefix() {
	const [json, setJson] = useImmerAtom(BodyAtom);

	// JSON 側から更新された prefix を、react-select/creatable でハンドルできる型に変換する
	const { preferredPrefix } = json.data.aboutMe;
	const selectedPrefixes: Option[] = (Array.isArray(preferredPrefix) ? preferredPrefix : [preferredPrefix]).map(
		(value: string) => ({
			value,
			label: value,
		}),
	);

	// UI 側から更新された prefix を、react-select/creatable の要素を排除して JSON 側に反映させる
	const handleChange = (selected: Array<{ label: string; value: string }>) => {
		const values = selected ? selected.map((opt) => opt.value) : [];
		setJson((draft) => {
			draft.data.aboutMe.preferredPrefix = values;
		});
	};

	return (
		<LabeledCreatableSelect
			id="aboutMe.preferredPrefix"
			label="好ましいプレフィックス"
			value={selectedPrefixes}
			onChange={handleChange}
			placeholder="プレフィックスを入力して、リターンキーを押してください..."
			required
		/>
	);
}
