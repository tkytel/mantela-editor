import Alert from "../components/Alert";
import EditorUI from "./EditorUI";
import Json from "./Json";

export default function Editor() {
	return (
		<div className="relative mt-3 grid h-full grid-cols-1 gap-4 overflow-hidden md:grid-cols-2">
			<div className="flex h-full flex-col overflow-auto">
				<EditorUI />
				<Alert />
			</div>
			<div className="flex h-full flex-col overflow-auto">
				<Json />
			</div>
		</div>
	);
}
