import { BodyAtom } from "../helper/Jotai";
import { useImmerAtom } from "jotai-immer";

export default function EditorUI() {
    const [json, setJson] = useImmerAtom(BodyAtom);
    
    if (json.isLoading) {
        return <p>Loading...</p>
    } else {
    return !(json.isLoading) && json.data && (
        
            <div>
                <form className="max-w-sm mx-auto">
                    <div className="mb-5">
                        <label
                            htmlFor="aboutMe.identifier"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Your identifier
                        </label>
                        <input
                            type="text"
                            id="aboutMe.identifier"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            onChange={
                                (e) => setJson(draft => {
                                    draft.data.aboutMe.identifier = e.target.value
                                    console.log(e.target.value)
                                })}
                            value={json.data.aboutMe.identifier}
                        />
                    </div>
                </form>
            </div>
        )
    }
}