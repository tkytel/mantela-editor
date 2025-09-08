import { useImmerAtom } from "jotai-immer";
import { BodyAtom } from "../helpers/Jotai";
import Identifier from "./items/Identifier";
import Name from "./items/Name";
import PreferredPrefix from "./items/PreferredPrefix";
import Extensions from "./items/Extensions";
import Providers from "./items/Providers";
import SipUri from "./items/SipUri";
import Coordinates from "./items/Coordinates";
import Unavailable from "./items/Unavailable";
import Image from "./items/Image";
import DeprecatedSip from "./items/DeprecatedSip";

export default function EditorUI() {
	const [json] = useImmerAtom(BodyAtom);

	if (json.isLoading) {
		return <p>Loading...</p>;
	}

	if (json.isLoading || !json.data) {
		return null;
	}

	return (
		<div className="overflow-y-auto">
			<p className="text-right">
				<span className="text-pink-500">*</span>
				と表示されている項目は、必須です。
			</p>
			<div className="pl-1 max-h-[70vh] max-w-[95%]">
				<p className="text-xl mb-2">局</p>
				<Identifier />
				<Name />
				<PreferredPrefix />
				<SipUri />
				<Coordinates mode="aboutMe" />
				<Unavailable />
				<Image />
				<DeprecatedSip />

				<hr />

				<p className="text-xl mb-2 mt-2">内線番号</p>
				<Extensions />

				<hr />

				<p className="text-xl mb-2 mt-2">外線</p>
				<Providers />
			</div>
		</div>
	);
}
