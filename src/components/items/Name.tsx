import { useImmerAtom } from "jotai-immer";
import { BodyAtom } from "../../helpers/Jotai";

export default function Name() {
    const [json, setJson] = useImmerAtom(BodyAtom);
    
    return (
        <div className="mb-5">
            <label
                htmlFor="aboutMe.name"
                className="block mb-2 text-sm font-medium text-gray-900"
            >
                名前 <span className="text-pink-500">*</span>
            </label>
            <div className="relative w-full">
                <input
                    type="text"
                    id="aboutMe.name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    onChange={
                        (e) => setJson(draft => {
                            draft.data.aboutMe.name = e.target.value
                        })
                    }
                    value={json.data.aboutMe.name}
                />
            </div>
        </div>
    )
}
