import { useImmerAtom } from "jotai-immer";
import { BodyAtom } from "../../helpers/Jotai";
import { generateExtensionIdentifier } from "../../helpers/Randomness";
import Select from 'react-select';

export default function Extensions() {
    const [json, setJson] = useImmerAtom(BodyAtom);
    const typeOptions = [
        { value: "alias", label: "単一の端末に対する転送番号" },
        { value: "application", label: "対話的な機能を有する自動応答端末" },
        { value: "cellphone", label: "スマホでない携帯電話機" },
        { value: "dialphone", label: "ダイヤルパルスを用いる固定電話機" },
        { value: "fax", label: "ファクシミリ機" },
        { value: "information", label: "音声による情報提供を目的とした自動応答端末" },
        { value: "main", label: "コールキューや複数の端末に対する転送番号" },
        { value: "modem", label: "モデム端末" },
        { value: "music", label: "音声による情報提供を目的としない自動応答端末" },
        { value: "other", label: "その他の端末" },
        { value: "phone", label: "電話機" },
        { value: "pushphone", label: "プッシュトーンを用いる固定電話機" },
        { value: "reserved", label: "予約済の番号" },
        { value: "smartphone", label: "スマートフォン" },
        { value: "switchboard", label: "対話的に転送先を選択できる転送番号" },
        { value: "unknown", label: "種別の不明な端末" },
        { value: "unused", label: "使用されていない番号" },
    ];    
    
    return (
        <>
        {
            json.data.extensions.map((val, idx) => {
                const handleTypeChange = (selected: any, idx: number) => {
                    setJson((draft) => {
                        draft.data.extensions[idx].type = selected?.value;
                    });
                };

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
                                draft.data.extensions.splice(idx, 1)
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
                            htmlFor="aboutMe.identifier"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            名前
                        </label>
                        <div className="relative w-full">
                            <input
                                type="text"
                                id="aboutMe.identifier"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                onChange={
                                    (e) => setJson(draft => {
                                        draft.data.extensions[idx].name = e.target.value
                                    })
                                }
                                value={val.name}
                            />
                        </div>
                    </div>

                    {/* 番号 */}
                    <div className="mb-5">
                        <label
                            htmlFor="aboutMe.identifier"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            番号
                        </label>
                        <div className="relative w-full">
                        <input
                            type="text"
                            id="aboutMe.identifier"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            onChange={
                                (e) => setJson(draft => {
                                    draft.data.extensions[idx].extension = e.target.value
                                })
                            }
                            value={val.extension}
                        />
                        </div>
                    </div>

                    {/* 種別 */}
                    <div className="mb-5">
                        <label
                            htmlFor="aboutMe.identifier"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            種別
                        </label>
                        <div className="relative w-full">
                        <Select
                            isClearable
                            value={typeOptions.find((option) => option.value === val.type)}
                            onChange={(selected: any) => handleTypeChange(selected, idx)}
                            options={typeOptions}
                        />
                        </div>
                    </div>

                    {/* 識別子 */}
                    <div className="mb-5">
                        <label
                            htmlFor="aboutMe.identifier"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            識別子
                        </label>
                        <div className="relative w-full">
                            <input
                                type="text"
                                id="aboutMe.identifier"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                onChange={
                                    (e) => setJson(draft => {
                                        draft.data.extensions[idx].identifier = e.target.value
                                    })
                                }
                                value={val.identifier}
                            />
                            <button
                                type="button"
                                className="absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                                onClick={() => {
                                    setJson(draft => {
                                        draft.data.extensions[idx].identifier = generateExtensionIdentifier();
                                    });
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4" fill="currentColor">
                                    <path stroke="currentColor" d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160 352 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l111.5 0c0 0 0 0 0 0l.4 0c17.7 0 32-14.3 32-32l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 35.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1L16 432c0 17.7 14.3 32 32 32s32-14.3 32-32l0-35.1 17.6 17.5c0 0 0 0 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.8c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352l34.4 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L48.4 288c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                )
            })
        }
        <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-base px-5 py-2.5 text-center me-2 mb-2 w-full"
            onClick={() => {
                setJson(draft => {
                    draft.data.extensions.push(
                        {
                            name: "",
                            extension: "",
                            type: "phone",
                            identifier: "",
                        }
                    )
                });
            }}
        >
            局番を追加する
        </button>
        </>
    )
}