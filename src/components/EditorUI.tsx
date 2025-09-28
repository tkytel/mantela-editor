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
import { SectionHeader } from "./commons";

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
			<p className="text-right text-gray-800 dark:text-gray-200">
				<span className="text-pink-500">*</span>
				と表示されている項目は、必須です。
			</p>
			<div className="max-h-[70vh] max-w-[95%] pl-1">
				<p className="mb-2 text-xl text-gray-900 dark:text-gray-100">局</p>
				<Identifier />
				<Name />
				<PreferredPrefix />
				<SipUri />
				<Coordinates mode="aboutMe" />
				<Unavailable />
				<Image />
				<DeprecatedSip />

				<hr className="border-gray-300 dark:border-gray-600" />

				<SectionHeader level={2} text="内線番号" />
				<Extensions />

				<hr className="border-gray-300 dark:border-gray-600" />

				<SectionHeader level={2} text="外線" />
				<Providers />
			</div>
		</div>
	);
}
