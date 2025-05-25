import type { MantelaExtension } from "../../types/mantela";

import { generateExtensionIdentifier } from "../../helpers/Randomness";
import Select, { MultiValue } from 'react-select';
import Creatable from "react-select/creatable";

import { useImmerAtom } from "jotai-immer";
import { AlertAtom, BodyAtom } from "../../helpers/Jotai";
import { useEffect, useState } from "react";

type Option = { value: string; label: string; }

export default function Extension({ extension, idx }: {extension: MantelaExtension, idx: number}) {
    const [json, setJson] = useImmerAtom(BodyAtom);
    
    const typeOptions = [
            { value: "alias", label: "単一の端末に対する転送番号" },
            { value: "application", label: "対話的な機能を有する自動応答端末" },
            { value: "cellphone", label: "スマホでない携帯電話機" },
            { value: "dialphone", label: "ダイヤルパルスを用いる固定電話機" },
            { value: "fax", label: "ファクシミリ機" },
            { value: "information", label: "音声による情報提供を目的とした自動応答端末" },
            { value: "conference", label: "会議室" },
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

    const handleTypeChange = (selected: any) => {
        setJson((draft) => {
            draft.data.extensions[idx].type = selected?.value;
        });
    };

    // JSON 側から更新された prefix を、react-select/creatable でハンドルできる型に変換する
    const selectedPrefixesIdentifier: Option[] = (extension.transferTo || []).map((value: string) => ({
        value,
        label: value,
    }));

    // UI 側から更新された prefix を、react-select/creatable の要素を排除して JSON 側に反映させる
    const handleChange = (selected: MultiValue<Option>) => {
        const values = selected ? selected.map((opt: any) => opt.value) : [];
        setJson((draft) => {
            draft.data.extensions[idx].transferTo = values;
        })
    }

    const [isSetCoord, setIsSetCoord] = useState(false);
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [altitude, setAltitude] = useState("");
    const [accuracy, setAccuracy] = useState("");
    const [altitudeAccuracy, setAltitudeAccuracy] = useState("");
    const [_, setAlerts] = useImmerAtom(AlertAtom);

    useEffect(() => {
        const num = parseFloat(latitude)
        if (!isNaN(num) && latitude !== "" && num > -90 && num < 90) {
            setJson(draft => {
                if (draft.data.extensions[idx].geolocationCoordinates) {
                    draft.data.extensions[idx].geolocationCoordinates.latitude = num
                }
            })
            setAlerts(draft => {
                delete draft.alerts["aboutMe.extensions[" + idx + "].geolocationCoordinates.latitude"]
            })
        } else if (latitude == ""){
            setAlerts(draft => {
                delete draft.alerts["aboutMe.extensions[" + idx + "].geolocationCoordinates.latitude"]
            })
        } else {
            setAlerts(draft => {
                draft.alerts["aboutMe.extensions[" + idx + "].geolocationCoordinates.latitude"] = "緯度は -90 から 90 の間の数値である必要があります。"
            })
        }
    }, [latitude])

    useEffect(() => {
        const num = parseFloat(longitude)
        if (!isNaN(num) && longitude !== "" && num > -180 && num < 180) {
            setJson(draft => {
                if (draft.data.extensions[idx].geolocationCoordinates) {
                    draft.data.extensions[idx].geolocationCoordinates.longitude = num
                }
            })
            setAlerts(draft => {
                delete draft.alerts["aboutMe.extensions[" + idx + "].geolocationCoordinates.longitude"]
            })
        } else if (longitude == ""){
            setAlerts(draft => {
                delete draft.alerts["aboutMe.extensions[" + idx + "].geolocationCoordinates.longitude"]
            })
        } else {
            setAlerts(draft => {
                draft.alerts["aboutMe.extensions[" + idx + "].geolocationCoordinates.longitude"] = "経度は -180 から 180 の間の数値である必要があります。"
            })
        }
    }, [longitude])

    useEffect(() => {
        const num = parseFloat(altitude)
        if (!isNaN(num) && altitude !== "" && num > 0) {
            setJson(draft => {
                if (draft.data.extensions[idx].geolocationCoordinates) {
                    draft.data.extensions[idx].geolocationCoordinates.altitude = num
                }
            })
            setAlerts(draft => {
                delete draft.alerts["aboutMe.extensions[" + idx + "].geolocationCoordinates.altitude"]
            })
        } else if (longitude == ""){
            setAlerts(draft => {
                delete draft.alerts["aboutMe.extensions[" + idx + "].geolocationCoordinates.altitude"]
            })
        } else {
            setAlerts(draft => {
                draft.alerts["aboutMe.extensions[" + idx + "].geolocationCoordinates.altitude"] = "高度は 0 以上の数値でなければなりません。"
            })
        }
    }, [altitude])

    useEffect(() => {
        const num = parseFloat(accuracy)
        if (!isNaN(num) && accuracy !== "" && num > 0) {
            setJson(draft => {
                if (draft.data.extensions[idx].geolocationCoordinates) {
                    draft.data.extensions[idx].geolocationCoordinates.accuracy = num
                }
            })
            setAlerts(draft => {
                delete draft.alerts["aboutMe.extensions[" + idx + "].geolocationCoordinates.accuracy"]
            })
        } else if (accuracy == ""){
            setAlerts(draft => {
                delete draft.alerts["aboutMe.extensions[" + idx + "].geolocationCoordinates.accuracy"]
            })
        } else {
            setAlerts(draft => {
                draft.alerts["aboutMe.extensions[" + idx + "].geolocationCoordinates.accuracy"] = "精度は 0 以上の数値でなければなりません。"
            })
        }
    }, [accuracy])

    useEffect(() => {
        const num = parseFloat(altitudeAccuracy)
        if (!isNaN(num) && altitudeAccuracy !== "" && num > 0) {
            setJson(draft => {
                if (draft.data.extensions[idx].geolocationCoordinates) {
                    draft.data.extensions[idx].geolocationCoordinates.altitudeAccuracy = num
                }
            })
            setAlerts(draft => {
                delete draft.alerts["aboutMe.extensions[" + idx + "].geolocationCoordinates.altitudeAccuracy"]
            })
        } else if (altitudeAccuracy == ""){
            setAlerts(draft => {
                delete draft.alerts["aboutMe.extensions[" + idx + "].geolocationCoordinates.altitudeAccuracy"]
            })
        } else {
            setAlerts(draft => {
                draft.alerts["aboutMe.extensions[" + idx + "].geolocationCoordinates.altitudeAccuracy"] = "高度の精度は 0 以上の数値でなければなりません。"
            })
        }
    }, [altitudeAccuracy])
    
    useEffect(() => {
        if (isSetCoord) {
            if (!json.data.extensions[idx].geolocationCoordinates) {
                setJson(draft => {
                    draft.data.extensions[idx].geolocationCoordinates = {
                        latitude: 0,
                        longitude: 0,
                        altitude: 0,
                        accuracy: 0,
                        altitudeAccuracy: 0
                    }
                })
            }
        }
    }, [isSetCoord])
    
    useEffect(() => {
        if (json.data.extensions[idx].geolocationCoordinates) {
            setIsSetCoord(true)
        }
    }, [json.data.extensions[idx].geolocationCoordinates])

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
                    htmlFor={"extensions[" + idx + "].name"}
                    className="block mb-2 text-sm font-medium text-gray-900"
                >
                    名前 <span className="text-pink-500">*</span>
                </label>
                <div className="relative w-full">
                    <input
                        type="text"
                        id={"extensions[" + idx + "].name"}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        onChange={
                            (e) => setJson(draft => {
                                draft.data.extensions[idx].name = e.target.value
                            })
                        }
                        value={json.data.extensions[idx].name}
                    />
                </div>
            </div>

            {/* 番号 */}
            <div className="mb-5">
                <label
                    htmlFor={"extensions[" + idx + "].extension"}
                    className="block mb-2 text-sm font-medium text-gray-900"
                >
                    番号 <span className="text-pink-500">*</span>
                </label>
                <div className="relative w-full">
                <input
                    type="text"
                    id={"extensions[" + idx + "].extension"}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    onChange={
                        (e) => setJson(draft => {
                            draft.data.extensions[idx].extension = e.target.value
                        })
                    }
                    value={json.data.extensions[idx].extension}
                />
                </div>
            </div>

            {/* 種別 */}
            <div className="mb-5">
                <label
                    htmlFor={"extensions[" + idx + "].type"}
                    className="block mb-2 text-sm font-medium text-gray-900"
                >
                    種別 <span className="text-pink-500">*</span>
                </label>
                <div className="relative w-full">
                <Select
                    isClearable
                    value={typeOptions.find((option) => option.value === json.data.extensions[idx].type)}
                    onChange={(selected: any) => handleTypeChange(selected)}
                    options={typeOptions}
                />
                </div>
            </div>

            {/* 転送先; transferTo を指定しなければならない場合に入力するフィールド */}
            {
                [
                    "alias",
                    "main",
                    "switchboard"
                ].includes(json.data.extensions[idx].type || "phone") &&
                (
                    <div className="mb-5">
                        <label
                            htmlFor={"extensions[" + idx + "].transferTo"}
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            転送先局番の識別子 <span className="text-pink-500">*</span>
                            <small> (ただし、種別が特定のものである場合のみ)</small>
                        </label>
                        <div className="relative w-full">
                        <Creatable
                            isClearable
                            isMulti
                            onChange={handleChange}
                            value={selectedPrefixesIdentifier}
                            placeholder="識別子を入力して、リターンキーを押してください..."
                        />
                        </div>
                    </div>
                )
            }

            {/* 識別子 */}
            <div className="mb-5">
                <label
                    htmlFor={"extensions[" + idx + "].identifier"}
                    className="block mb-2 text-sm font-medium text-gray-900"
                >
                    識別子
                </label>
                <div className="relative w-full">
                    <input
                        type="text"
                        id={"extensions[" + idx + "].identifier"}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        onChange={
                            (e) => setJson(draft => {
                                draft.data.extensions[idx].identifier = e.target.value
                            })
                        }
                        value={json.data.extensions[idx].identifier}
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

            <div className="flex mb-3">
                <div className="flex items-center h-5">
                    <input
                    id={`helper-checkbox-extension${idx}`}
                    aria-describedby="helper-checkbox-text"
                    type="checkbox"
                    checked={isSetCoord}
                    onChange={(e) => setIsSetCoord(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2"
                    />
                </div>
                <div className="ms-2 text-sm">
                    <label
                    htmlFor={`helper-checkbox-extension${idx}`}
                    className="font-medium text-gray-900"
                    >
                    設置場所を指定する
                    </label>
                    <p
                    id="helper-checkbox-text"
                    className="text-xs font-normal text-gray-500"
                    >
                    この値は明らかに設定する必要がありません！覚悟を持って有効にしてください。
                    </p>
                </div>
            </div>

            { isSetCoord && (
            <>
            <p className="text-xl">設置場所</p>
            <p className="text-sm mb-2">これらの値は、<a href="https://tkytel.github.io/CocoKano/" className="underline">CocoKano</a> で取得できます</p>

            <label
                htmlFor="aboutMe.geolocationCoordinates.latitude"
                className="block mb-2 text-sm font-medium text-gray-900"
            >
                緯度
            </label>
            <div className="relative w-full mb-2">
                <input
                    type="text"
                    placeholder="位置の緯度を十進数の角度で指定してください"
                    id="aboutMe.geolocationCoordinates.latitude"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    onChange={(e) => setLatitude(e.target.value)}
                    value={latitude}
                    min={-90}
                    max={90}
                />
            </div>

            <label
                htmlFor="aboutMe.geolocationCoordinates.longitude"
                className="block mb-2 text-sm font-medium text-gray-900"
            >
                経度
            </label>
            <div className="relative w-full mb-2">
                <input
                    type="text"
                    placeholder="位置の経度を十進数の角度で指定してください"
                    id="aboutMe.geolocationCoordinates.longitude"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    onChange={(e) => setLongitude(e.target.value)}
                    value={longitude}
                    min={-180}
                    max={180}
                />
            </div>

            <label
                htmlFor="aboutMe.geolocationCoordinates.altitude"
                className="block mb-2 text-sm font-medium text-gray-900"
            >
                海抜高度 [m]
            </label>
            <div className="relative w-full mb-2">
                <input
                    type="text"
                    placeholder="位置の海抜高度をメートル単位で指定してください"
                    id="aboutMe.geolocationCoordinates.altitude"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    onChange={(e) => setAltitude(e.target.value)}
                    value={altitude}
                />
            </div>

            <label
                htmlFor="aboutMe.geolocationCoordinates.accuracy"
                className="block mb-2 text-sm font-medium text-gray-900"
            >
                経緯度の精度 [m]
            </label>
            <div className="relative w-full mb-2">
                <input
                    type="text"
                    placeholder="経緯度の精度をメートル単位で指定してください"
                    id="aboutMe.geolocationCoordinates.accuracy"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    onChange={(e) => setAccuracy(e.target.value)}
                    value={accuracy}
                />
            </div>

            <label
                htmlFor="aboutMe.geolocationCoordinates.altitudeAccuracy"
                className="block mb-2 text-sm font-medium text-gray-900"
            >
                海抜高度の精度 [m]
            </label>
            <div className="relative w-full mb-2">
                <input
                    type="text"
                    placeholder="海抜高度の精度をメートル単位で指定してください"
                    id="aboutMe.geolocationCoordinates.altitudeAccuracy"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    onChange={(e) => setAltitudeAccuracy(e.target.value)}
                    value={altitudeAccuracy}
                />
            </div>
            </>
            )}
        </div>
    )}
