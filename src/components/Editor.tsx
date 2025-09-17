import Alert from "../components/Alert";
import Json from "./Json";
import EditorUI from "./EditorUI";

export default function Editor() {
	return (
		<div className="relative mt-3 grid grid-cols-2 gap-4">
			<div>
				<EditorUI />
				<Alert />
			</div>
			<div>
				<Json />
			</div>
		</div>
	);
}
