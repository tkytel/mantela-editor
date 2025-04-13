import { BodyAtom } from "../helpers/Jotai";
import { useImmerAtom } from "jotai-immer";

import Identifier from "./items/Identifier";
import Name from "./items/Name";
import PreferredPrefix from "./items/PreferredPrefix";
import Extensions from "./items/Extensions";

export default function EditorUI() {
    const [json] = useImmerAtom(BodyAtom);
    
    if (json.isLoading) {
        return <p>Loading...</p>
    } else {
    return !(json.isLoading) && json.data && (
        <div className="overflow-y-auto">
            <div className="max-h-[50rem] max-w-[95%]">
                <p className="text-xl mb-2">局について</p>
                <Identifier />
                <Name />
                <PreferredPrefix />
                <p className="text-xl mb-2">局番について</p>
                <Extensions />
            </div>
        </div>
    )}
}