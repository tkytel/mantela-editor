import { BodyAtom } from "../helpers/Jotai";
import { useImmerAtom } from "jotai-immer";

import Identifier from "./items/Identifier";
import Name from "./items/Name";
import PreferredPrefix from "./items/PreferredPrefix";

export default function EditorUI() {
    const [json] = useImmerAtom(BodyAtom);
    
    if (json.isLoading) {
        return <p>Loading...</p>
    } else {
    return !(json.isLoading) && json.data && (
        <div>
            <p className="text-xl mb-2">あなたの局について</p>
            <Identifier />
            <Name />
            <PreferredPrefix />
        </div>
    )}
}