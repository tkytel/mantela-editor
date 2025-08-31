import { BodyAtom } from "../helpers/Jotai";
import { useImmerAtom } from "jotai-immer";

import Identifier from "./items/Identifier";
import Name from "./items/Name";
import PreferredPrefix from "./items/PreferredPrefix";
import Extensions from "./items/Extensions";
import Providers from "./items/Providers";
import Sip from "./items/Sip";
import Coordinates from "./items/Coordinates";
import Unavailable from "./items/Unavailable";
import Image from "./items/Image";

export default function EditorUI() {
    const [json] = useImmerAtom(BodyAtom);
    
    if (json.isLoading) {
        return <p>Loading...</p>
    } else {
    return !(json.isLoading) && json.data && (
        <>
            <div className="overflow-y-auto">
                <p className="text-right">
                    <span className="text-pink-500">*</span>
                    と表示されている項目は、必須です。
                </p>
                <div className="max-h-[70vh] max-w-[95%]">
                    <p className="text-xl mb-2">局</p>
                    <Identifier />
                    <Name />
                    <PreferredPrefix />
                    <Sip />
                    <Coordinates />
                    <Unavailable />
                    <Image />

                    <hr />

                    <p className="text-xl mb-2 mt-2">内線番号</p>
                    <Extensions />

                    <hr />

                    <p className="text-xl mb-2 mt-2">外線</p>
                    <Providers />
                </div>
            </div>
        </>
    )}
}
