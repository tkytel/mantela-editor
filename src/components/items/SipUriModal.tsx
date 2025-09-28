import { useCallback, useMemo, useState } from "react";
import { ErrorMessage, FormField, Modal, RadioGroup, SelectField } from "../commons";

type SipUriData = {
	host: string;
	password: string;
	port: string;
	scheme: "sip" | "sips";
	transport: "sctp" | "tcp" | "tls" | "udp" | undefined;
	usernameOrTelNumber: string;
};
const initialSipData: SipUriData = {
	host: "",
	password: "",
	port: "",
	scheme: "sip",
	transport: undefined,
	usernameOrTelNumber: "",
	// TODO: 必要なら対応する
	// user
	// method
	// ttl
	// maddr
	// lr
	// headers
};

export type SipUriModalProps = {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: (sipUri: string) => void;
};

export default function SipUriModal({ isOpen, onClose, onConfirm }: SipUriModalProps) {
	const [sipFormData, setSipFormData] = useState({ ...initialSipData });
	const [error, setError] = useState<string>("");

	const sipUri = useMemo(() => {
		const { host, password, port, scheme, transport, usernameOrTelNumber } = sipFormData;

		const userInfo = usernameOrTelNumber ? `${usernameOrTelNumber}${password ? `:${password}` : ""}@` : "";
		const hostport = port ? `${host}:${port}` : host;
		const uriParameters = [
			transport ? `transport=${transport}` : "",
			// TODO: 必要なら対応する
			// user
			// method
			// ttl
			// maddr
			// lr
			// headers
		]
			.filter(Boolean)
			.join(";");

		return `${scheme}:${userInfo}${hostport}${uriParameters ? `;${uriParameters}` : ""}`;
	}, [sipFormData]);

	const handleConfirm = useCallback(() => {
		const { host } = sipFormData;

		if (!host) {
			setError("ホスト名は必須です。");
			return;
		}

		setError("");
		onConfirm(sipUri);
		setSipFormData({ ...initialSipData });
	}, [sipFormData, onConfirm]);

	const handleClose = useCallback(() => {
		setSipFormData({ ...initialSipData });
		setError("");
		onClose();
	}, [onClose]);

	if (!isOpen) return null;

	return (
		<Modal
			footer={
				<>
					<button
						className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-3 focus:ring-blue-300 focus:outline-hidden dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						onClick={handleConfirm}
						type="button"
					>
						追加
					</button>
					<button
						className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:ring-3 focus:ring-blue-300 focus:outline-hidden dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-100 dark:focus:ring-blue-800"
						onClick={handleClose}
						type="button"
					>
						キャンセル
					</button>
				</>
			}
			id="sip-uri-config"
			isOpen={isOpen}
			onClose={handleClose}
			title="SIP設定"
		>
			{error && <ErrorMessage>{error}</ErrorMessage>}

			<RadioGroup
				id="sipScheme"
				label="プロトコル"
				onChange={(value) => {
					setSipFormData((prev) => ({ ...prev, scheme: value as "sip" | "sips" }));
				}}
				options={[
					{ label: "SIP (非暗号化)", value: "sip" },
					{ label: "SIPS (暗号化)", value: "sips" },
				]}
				value={sipFormData.scheme}
			/>

			<FormField
				id="sipUsernameOrTelNumber"
				label="ユーザー名/電話番号"
				onChange={(value) => {
					setSipFormData((prev) => ({ ...prev, usernameOrTelNumber: value }));
				}}
				placeholder="SIP-TRUNK-ABCD1234 / 1234"
				value={sipFormData.usernameOrTelNumber}
			/>

			<FormField
				id="sipUriModal.password"
				label="パスワード"
				onChange={(value) => {
					setSipFormData((prev) => ({ ...prev, password: value }));
				}}
				placeholder="P4ssw0rd"
				value={sipFormData.password}
			/>

			<FormField
				id="sipUriModal.host"
				label="ホスト名"
				onChange={(value) => {
					setSipFormData((prev) => ({ ...prev, host: value }));
				}}
				placeholder="example.tail0000.ts.net / 192.0.2.0"
				required
				value={sipFormData.host}
			/>

			<FormField
				id="sipPort"
				label="ポート"
				onChange={(value) => {
					setSipFormData((prev) => ({ ...prev, port: value }));
				}}
				placeholder="5060"
				type="number"
				value={sipFormData.port}
			/>

			<SelectField
				id="sipTransport"
				label="トランスポート"
				onChange={(value) => {
					setSipFormData((prev) => ({ ...prev, transport: value as SipUriData["transport"] }));
				}}
				options={[
					{ label: "UDP (User Datagram Protocol)", value: "udp" },
					{ label: "TCP (Transmission Control Protocol)", value: "tcp" },
					{ label: "SCTP (Stream Control Transmission Protocol)", value: "sctp" },
					{ label: "TLS (Transport Layer Security)", value: "tls" },
				]}
				placeholder="選択しない"
				value={sipFormData.transport ?? ""}
			/>

			<FormField
				disabled
				id="sipUriPreview"
				label="追加される SIP URI"
				type="text"
				value={sipFormData.host ? sipUri : "ホスト名を入力してください..."}
			/>
		</Modal>
	);
}
