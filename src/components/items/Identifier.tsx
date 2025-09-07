import { useImmerAtom } from "jotai-immer";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { AlertAtom, BodyAtom } from "../../helpers/Jotai";
import { FormFieldWithButton, Icon } from "../commons";

export default function Identifier() {
	const [_json, setJson] = useImmerAtom(BodyAtom);
	const [_alerts, setAlerts] = useImmerAtom(AlertAtom);

	const [identifier, setIdentifier] = useState("");

	useEffect(() => {
		if (identifier !== "" && /^[\u0021-\u007E]+$/.test(identifier)) {
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
	}, [identifier, setJson, setAlerts]);

	return (
		<FormFieldWithButton
			id="aboutMe.identifier"
			label="識別子"
			value={identifier}
			onChange={setIdentifier}
			onButtonClick={() => {
				setIdentifier(uuidv4());
			}}
			buttonContent={<Icon variant="refresh" />}
			required
		/>
	);
}
