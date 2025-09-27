import { useImmerAtom } from "jotai-immer";
import { useCallback, useState } from "react";
import { BodyAtom } from "../../helpers/Jotai";
import { LabeledCreatableSelect } from "../commons";
import SipUriModal, { type SipUriModalProps } from "./SipUriModal";

type Option = { label: string; value: string };

export default function SipUri() {
	const [json, setJson] = useImmerAtom(BodyAtom);
	const [isModalOpen, setIsModalOpen] = useState(false);

	// JSON 側から更新された sipUri を、react-select/creatable でハンドルできる型に変換する
	const { sipUri } = json.data.aboutMe;
	const selectedUris: Option[] = (sipUri ?? []).map((value: string) => ({
		label: value,
		value,
	}));

	const handleChange = useCallback((selected: Array<{ label: string; value: string }>) => {
		const values = selected ? selected.map((opt) => opt.value) : [];
		setJson((draft) => {
			draft.data.aboutMe.sipUri = values;
		});
	}, []);

	const handleSipConfirm = useCallback<SipUriModalProps["onConfirm"]>((sipUri) => {
		setJson((draft) => {
			draft.data.aboutMe.sipUri ??= [];

			draft.data.aboutMe.sipUri.push(sipUri);
		});

		setIsModalOpen(false);
	}, []);

	return (
		<>
			<LabeledCreatableSelect
				actionButton={
					<button
						className="rounded-lg border border-blue-700 px-3 py-0.5 text-center text-sm font-medium text-blue-700 hover:bg-blue-800 hover:text-white focus:ring-3 focus:ring-blue-300 focus:outline-hidden dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-white dark:focus:ring-blue-400"
						onClick={() => {
							setIsModalOpen(true);
						}}
						type="button"
					>
						+ SIP設定
					</button>
				}
				id="aboutMe.sipUri"
				label={
					<>
						SIP URI (
						<a className="underline" href="https://tools.ietf.org/html/rfc3261#section-19.1">
							RFC 3261 セクション19.1
						</a>
						&nbsp;準拠)
					</>
				}
				onChange={handleChange}
				placeholder="SIP URI を入力して、リターンキーを押してください..."
				value={selectedUris}
			/>

			<SipUriModal
				isOpen={isModalOpen}
				onClose={() => {
					setIsModalOpen(false);
				}}
				onConfirm={handleSipConfirm}
			/>
		</>
	);
}
