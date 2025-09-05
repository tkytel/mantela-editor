import { useCallback, useMemo, useState } from "react";

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
		<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
			<div className="relative bg-white rounded-lg shadow-lg max-w-md w-full m-4">
				<div className="flex items-center justify-between p-4 border-b">
					<h3 className="text-lg font-semibold text-gray-900">SIP設定</h3>
					<button
						type="button"
						className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
						onClick={handleClose}
					>
						<svg
							className="w-3 h-3"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 14 14"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
							/>
						</svg>
					</button>
				</div>
				<div className="p-6 space-y-4">
					{error && (
						<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-4">
							<span className="block sm:inline">{error}</span>
						</div>
					)}
					<div>
						<label className="block mb-2 text-sm font-medium text-gray-900">プロトコル</label>
						<div className="flex space-x-4">
							<label className="flex items-center">
								<input
									type="radio"
									name="sipScheme"
									value="sip"
									checked={sipFormData.scheme === "sip"}
									onChange={(e) => {
										setSipFormData((prev) => ({ ...prev, scheme: e.target.value as "sip" | "sips" }));
									}}
									className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
								/>
								<span className="ml-2 text-sm font-medium text-gray-900">SIP (非暗号化)</span>
							</label>
							<label className="flex items-center">
								<input
									type="radio"
									name="sipScheme"
									value="sips"
									checked={sipFormData.scheme === "sips"}
									onChange={(e) => {
										setSipFormData((prev) => ({ ...prev, scheme: e.target.value as "sip" | "sips" }));
									}}
									className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
								/>
								<span className="ml-2 text-sm font-medium text-gray-900">SIPS (暗号化)</span>
							</label>
						</div>
					</div>
					<div>
						<label htmlFor="sipUriModal.usernameOrTelNumber" className="block mb-2 text-sm font-medium text-gray-900">
							ユーザー名/電話番号
						</label>
						<input
							type="text"
							id="sipUsernameOrTelNumber"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
							value={sipFormData.usernameOrTelNumber}
							onChange={(e) => {
								setSipFormData((prev) => ({ ...prev, usernameOrTelNumber: e.target.value }));
							}}
							placeholder="SIP-TRUNK-ABCD1234 / 1234"
						/>
					</div>
					<div>
						<label htmlFor="sipUriModal.password" className="block mb-2 text-sm font-medium text-gray-900">
							パスワード
						</label>
						<input
							type="text"
							id="sipUriModal.password"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
							value={sipFormData.password}
							onChange={(e) => {
								setSipFormData((prev) => ({ ...prev, password: e.target.value }));
							}}
							placeholder="P4ssw0rd"
						/>
					</div>
					<div>
						<label htmlFor="sipUriModal.host" className="block mb-2 text-sm font-medium text-gray-900">
							ホスト名 <span className="text-red-500">*</span>
						</label>
						<input
							type="text"
							id="sipUriModal.host"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
							value={sipFormData.host}
							onChange={(e) => {
								setSipFormData((prev) => ({ ...prev, host: e.target.value }));
							}}
							placeholder="example.tail0000.ts.net / 192.0.2.0"
						/>
					</div>
					<div>
						<label htmlFor="sipPort" className="block mb-2 text-sm font-medium text-gray-900">
							ポート
						</label>
						<input
							type="number"
							id="sipPort"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
							value={sipFormData.port}
							onChange={(e) => {
								setSipFormData((prev) => ({ ...prev, port: e.target.value }));
							}}
							placeholder="5060"
						/>
					</div>

					<div>
						<label className="block mb-2 text-sm font-medium text-gray-900">トランスポート</label>
						<select
							id="sipTransport"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
							value={sipFormData.transport ?? ""}
							onChange={(e) => {
								setSipFormData((prev) => ({ ...prev, transport: e.target.value as SipUriData["transport"] }));
							}}
						>
							<option value="">選択しない</option>
							<option value="udp">UDP (User Datagram Protocol)</option>
							<option value="tcp">TCP (Transmission Control Protocol)</option>
							<option value="sctp">SCTP (Stream Control Transmission Protocol)</option>
							<option value="tls">TLS (Transport Layer Security)</option>
						</select>
					</div>

					<div>
						<label className="block mb-2 text-sm font-medium text-gray-900">追加される SIP URI</label>
						<div className="bg-gray-100 border border-gray-400 text-gray-900 text-sm rounded-lg p-2.5 font-mono break-all">
							{sipFormData.host ? sipUri : <span className="text-gray-500 italic">ホスト名を入力してください...</span>}
						</div>
					</div>
				</div>
				<div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
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
				</div>
			</div>
		</div>
	);
}
