import { useImmerAtom } from "jotai-immer";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import { AlertAtom, BodyAtom } from "../../helpers/Jotai";
import { FormFieldWithButton, Icon } from "../commons";

export default function Identifier() {
	const [json, setJson] = useImmerAtom(BodyAtom);
	const [_alerts, setAlerts] = useImmerAtom(AlertAtom);

	useEffect(() => {
		const { identifier } = json.data.aboutMe;
		if (identifier && /^[\u0021-\u007E]+$/.test(identifier)) {
			setJson((draft) => {
				draft.data.aboutMe.identifier = identifier;
			});
			setAlerts((draft) => {
				delete draft.alerts["aboutMe.identifier"];
			});
		} else if (identifier === "") {
			setAlerts((draft) => {
				delete draft.alerts["aboutMe.identifier"];
			});
		} else {
			setAlerts((draft) => {
				draft.alerts["aboutMe.identifier"] =
					"局の識別子は半角英数字と記号 (!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~) のみを使用してください。";
			});
		}
	}, [json.data.aboutMe.identifier, setJson, setAlerts]);

	return (
		<FormFieldWithButton
			buttonContent={<Icon variant="refresh" />}
			id="aboutMe.identifier"
			label="識別子"
			onButtonClick={() => {
				setJson((draft) => {
					draft.data.aboutMe.identifier = uuidv4();
				});
			}}
			onChange={(value) => {
				setJson((draft) => {
					draft.data.aboutMe.identifier = value;
				});
			}}
			required
			value={json.data.aboutMe.identifier}
		/>
	);
}
