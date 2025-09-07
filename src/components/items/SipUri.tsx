import { useImmerAtom } from "jotai-immer";
import { useCallback, useState } from "react";
import { BodyAtom } from "../../helpers/Jotai";
import { FormFieldWithAction, CreatableSelectField } from "../commons";
import SipUriModal, { type SipUriModalProps } from "./SipUriModal";

type Option = { value: string; label: string };

export default function SipUri() {
	const [json, setJson] = useImmerAtom(BodyAtom);
	const [isModalOpen, setIsModalOpen] = useState(false);

	// JSON 側から更新された sipUri を、react-select/creatable でハンドルできる型に変換する
	const { sipUri } = json.data.aboutMe;
	const selectedUris: Option[] = (sipUri ?? []).map((value: string) => ({
		value,
		label: value,
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
		<FormFieldWithAction
			id="aboutMe.sipUri"
			label={
				<>
					SIP URI (
					<a href="https://tools.ietf.org/html/rfc3261#section-19.1" target="_blank" rel="noopener noreferrer">
						RFC 3261 §19.1 準拠
					</a>
					)
				</>
			}
			actionButton={
				<button
					type="button"
					className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-0.5 text-center"
					onClick={() => {
						setIsModalOpen(true);
					}}
				>
					+ SIP設定
				</button>
			}
		>
			<CreatableSelectField
				id="aboutMe.sipUri"
				value={selectedUris}
				onChange={handleChange}
				placeholder="SIP URI を入力して、リターンキーを押してください..."
			/>

			<SipUriModal
				isOpen={isModalOpen}
				onClose={() => {
					setIsModalOpen(false);
				}}
				onConfirm={handleSipConfirm}
			/>
		</FormFieldWithAction>
	);
}
