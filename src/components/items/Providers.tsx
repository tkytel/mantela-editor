import { useImmerAtom } from "jotai-immer";
import { BodyAtom } from "../../helpers/Jotai";

export default function Providers() {
    const [json, setJson] = useImmerAtom(BodyAtom);
    
    return (
        <>
        {
            json.data.providers.map((val, idx) => {
                return (
                    <div
                        className="block p-6 bg-white border border-gray-200 rounded-lg shadow-sm mb-3 relative"
                        key={idx}
                    >
                    
                    {/* 削除 ボタン */}
                    <button
                        type="button"
                        className="absolute right-2 top-2 p-1 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                        onClick={() => {
                            setJson(draft => {
                                draft.data.providers.splice(idx, 1)
                            });
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-7 h-7">
                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                        </svg>
                    </button>
                    
                    {/* 名前 */}
                    <div className="mb-5">
                        <label
                            htmlFor={"providers[" + idx + "].name"}
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            名前 <span className="text-pink-500">*</span>
                        </label>
                        <div className="relative w-full">
                            <input
                                type="text"
                                id={"providers[" + idx + "].name"}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                onChange={
                                    (e) => setJson(draft => {
                                        draft.data.providers[idx].name = e.target.value
                                    })
                                }
                                value={val.name}
                            />
                        </div>
                    </div>

                    {/* プレフィックス */}
                    <div className="mb-5">
                        <label
                            htmlFor={"providers[" + idx + "].prefix"}
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            プレフィックス <span className="text-pink-500">*</span>
                        </label>
                        <div className="relative w-full">
                        <input
                            type="text"
                            id={"providers[" + idx + "].prefix"}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            onChange={
                                (e) => setJson(draft => {
                                    draft.data.providers[idx].prefix = e.target.value
                                })
                            }
                            value={val.prefix ?? ""}
                        />
                        </div>
                    </div>

                    {/* 識別子 */}
                    <div className="mb-5">
                        <label
                            htmlFor={"providers[" + idx + "].identifier"}
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            識別子
                        </label>
                        <div className="relative w-full">
                            <input
                                type="text"
                                id={"providers[" + idx + "].identifier"}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                onChange={
                                    (e) => setJson(draft => {
                                        draft.data.providers[idx].identifier = e.target.value
                                    })
                                }
                                value={val.identifier}
                            />
                        </div>
                    </div>

                    {/* mantela.json */}
                    <div className="mb-5">
                        <label
                            htmlFor={"providers[" + idx + "].mantela"}
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            mantela.json の URL
                        </label>
                        <div className="relative w-full">
                            <input
                                type="url"
                                id={"providers[" + idx + "].mantela"}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                onChange={
                                    (e) => setJson(draft => {
                                        draft.data.providers[idx].mantela = e.target.value
                                    })
                                }
                                value={val.mantela}
                            />
                        </div>
                    </div>

                    {/* 利用不可 */}
                    <div className="flex mb-3">
                        <div className="flex items-center h-5">
                            <input
                                type="checkbox"
                                id={"providers[" + idx + "].unavailable"}
                                aria-describedby={"providers[" + idx + "].unavailable-text"}
                                checked={val.unavailable}
                                onChange={(e) => setJson(draft => {
                                    draft.data.providers[idx].unavailable = e.target.checked
                                })}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2"
                            />
                        </div>
                        <div className="ms-2 text-sm">
                            <label
                                htmlFor={"providers[" + idx + "].unavailable"}
                                className="font-medium text-gray-900"
                            >
                                利用不可
                            </label>
                            <p
                                id={"providers[" + idx + "].unavailable-text"}
                                className="text-xs font-normal text-gray-500"
                            >
                                その交換局との通信が（一時的に）利用できないとき、有効にしてください。
                            </p>
                        </div>
                    </div>
                </div>
                )
            })
        }
        <button
            type="button"
            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-base px-5 py-2.5 text-center me-2 mb-2 w-full"
            onClick={() => {
                setJson(draft => {
                    draft.data.providers.push(
                        {
                            name: "",
                            prefix: "",
                            identifier: "",
                            mantela: "",
                        }
                    )
                });
            }}
        >
            外線を追加する
        </button>
        </>
    )
}
