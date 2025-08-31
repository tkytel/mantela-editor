import { useImmerAtom } from "jotai-immer";
import { AlertAtom, BodyAtom } from "../../helpers/Jotai";
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from "react";

export default function Identifier() {
    const [_json, setJson] = useImmerAtom(BodyAtom);
    const [_alerts, setAlerts] = useImmerAtom(AlertAtom);

    const [identifier, setIdentifier] = useState("");

    useEffect(() => {
        if (identifier !== "" && identifier.match("^[\\x21-\\x7E]+$")) {
            setJson(draft => {
                draft.data.aboutMe.identifier = identifier
            })
            setAlerts(draft => {
                delete draft.alerts["aboutMe.identifier"]
            })
        } else if (identifier == "") {
            setAlerts(draft => {
                delete draft.alerts["aboutMe.identifier"]
            })
        } else {
            setAlerts(draft => {
                draft.alerts["aboutMe.identifier"] = "局の識別子は半角英数字と記号 (!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~) のみを使用してください。"
            })
        }
    }, [identifier, setJson, setAlerts])

    return (
        <div className="mb-5">
            <label
                htmlFor="aboutMe.identifier"
                className="block mb-2 text-sm font-medium text-gray-900"
            >
                識別子 <span className="text-pink-500">*</span>
            </label>
            <div className="relative w-full">
                <input
                    type="text"
                    id="aboutMe.identifier"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    onChange={
                        (e) => setIdentifier(e.target.value)
                    }
                    value={identifier}
                />
                <button
                    type="button"
                    className="absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    onClick={() => {setIdentifier(uuidv4())}}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4" fill="currentColor">
                        <path stroke="currentColor" d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160 352 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l111.5 0c0 0 0 0 0 0l.4 0c17.7 0 32-14.3 32-32l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 35.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1L16 432c0 17.7 14.3 32 32 32s32-14.3 32-32l0-35.1 17.6 17.5c0 0 0 0 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.8c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352l34.4 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L48.4 288c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z"/>
                    </svg>
                </button>
            </div>
        </div>
    )
}
