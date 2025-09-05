import { useCallback, useMemo, useState } from "react";
import { FormField, RadioGroup, SelectField, Modal, ErrorMessage } from "../commons";

type SipUriData = {
	scheme: "sip" | "sips";
	usernameOrTelNumber: string;
	password: string;
	host: string;
	port: string;
	transport: "udp" | "tcp" | "sctp" | "tls" | undefined;
};
const initialSipData: SipUriData = {
	scheme: "sip",
	usernameOrTelNumber: "",
	password: "",
	host: "",
	port: "",
	transport: undefined,
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
		const { scheme, usernameOrTelNumber, password, host, port, transport } = sipFormData;

		const userInfo = usernameOrTelNumber ? `${usernameOrTelNumber}${password ? `:${password}` : ""}@` : "";
		const hostport = port ? `${host}:${port}` : host;
		const uriParameters = [
			transport ? `;transport=${transport}` : "",
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
			isOpen={isOpen}
			onClose={handleClose}
			title="SIP設定"
			footer={
				<>
					<button
						type="button"
						className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
						onClick={handleConfirm}
					>
						追加
					</button>
					<button
						type="button"
						className="bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
						onClick={handleClose}
					>
						キャンセル
					</button>
				</>
			}
		>
			{error && <ErrorMessage>{error}</ErrorMessage>}

			<RadioGroup
				label="プロトコル"
				name="sipScheme"
				value={sipFormData.scheme}
				onChange={(value) => {
					setSipFormData((prev) => ({ ...prev, scheme: value as "sip" | "sips" }));
				}}
				options={[
					{ value: "sip", label: "SIP (非暗号化)" },
					{ value: "sips", label: "SIPS (暗号化)" },
				]}
			/>

			<FormField
				id="sipUsernameOrTelNumber"
				label="ユーザー名/電話番号"
				value={sipFormData.usernameOrTelNumber}
				onChange={(value) => {
					setSipFormData((prev) => ({ ...prev, usernameOrTelNumber: value }));
				}}
				placeholder="SIP-TRUNK-ABCD1234 / 1234"
			/>

			<FormField
				id="sipUriModal.password"
				label="パスワード"
				value={sipFormData.password}
				onChange={(value) => {
					setSipFormData((prev) => ({ ...prev, password: value }));
				}}
				placeholder="P4ssw0rd"
			/>

			<FormField
				id="sipUriModal.host"
				label="ホスト名"
				required
				value={sipFormData.host}
				onChange={(value) => {
					setSipFormData((prev) => ({ ...prev, host: value }));
				}}
				placeholder="example.tail0000.ts.net / 192.0.2.0"
			/>

			<FormField
				id="sipPort"
				label="ポート"
				type="number"
				value={sipFormData.port}
				onChange={(value) => {
					setSipFormData((prev) => ({ ...prev, port: value }));
				}}
				placeholder="5060"
			/>

			<SelectField
				id="sipTransport"
				label="トランスポート"
				value={sipFormData.transport ?? ""}
				onChange={(value) => {
					setSipFormData((prev) => ({ ...prev, transport: value as SipUriData["transport"] }));
				}}
				options={[
					{ value: "udp", label: "UDP (User Datagram Protocol)" },
					{ value: "tcp", label: "TCP (Transmission Control Protocol)" },
					{ value: "sctp", label: "SCTP (Stream Control Transmission Protocol)" },
					{ value: "tls", label: "TLS (Transport Layer Security)" },
				]}
				placeholder="選択しない"
			/>

			<div>
				<label className="block mb-2 text-sm font-medium text-gray-900">追加される SIP URI</label>
				<div className="bg-gray-100 border border-gray-400 text-gray-900 text-sm rounded-lg p-2.5 font-mono break-all">
					{sipFormData.host ? sipUri : <span className="text-gray-500 italic">ホスト名を入力してください...</span>}
				</div>
			</div>
		</Modal>
	);
}
