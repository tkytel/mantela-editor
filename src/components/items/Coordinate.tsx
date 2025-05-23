import { useImmerAtom } from "jotai-immer";
import { BodyAtom } from "../../helpers/Jotai";
import { useEffect, useState } from "react";

export default function Coordinates() {
    const [json, setJson] = useImmerAtom(BodyAtom);
    const [isSetCoord, setIsSetCoord] = useState(false);

    useEffect(() => {
        if (isSetCoord) {
            if (!json.data.aboutMe.geolocationCoordinates) {
                setJson(draft => {
                    draft.data.aboutMe.geolocationCoordinates = {
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
        if (json.data.aboutMe.geolocationCoordinates) {
            setIsSetCoord(true)
        }
    }, [json.data.aboutMe.geolocationCoordinates])
    
    return (
        <>
            <div className="flex mb-3">
                <div className="flex items-center h-5">
                    <input
                    id="helper-checkbox"
                    aria-describedby="helper-checkbox-text"
                    type="checkbox"
                    checked={isSetCoord}
                    onChange={(e) => setIsSetCoord(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2"
                    />
                </div>
                <div className="ms-2 text-sm">
                    <label
                    htmlFor="helper-checkbox"
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
            <p className="text-sm mb-2">これらの値は、<a href="https://tkytel.github.io/CocoKano" className="underline">CocoKano</a> で取得できます</p>

            <label
                htmlFor="aboutMe.geolocationCoordinates"
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
                    onChange={
                        (e) => setJson(draft => {
                            if (draft.data.aboutMe.geolocationCoordinates) {
                                draft.data.aboutMe.geolocationCoordinates.latitude = parseFloat(e.target.value)
                            }
                        })
                    }
                    value={json.data.aboutMe.geolocationCoordinates?.latitude ?? ""}
                />
            </div>

            <label
                htmlFor="aboutMe.geolocationCoordinates"
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
                    onChange={
                        (e) => setJson(draft => {
                            if (draft.data.aboutMe.geolocationCoordinates) {
                                draft.data.aboutMe.geolocationCoordinates.longitude = parseFloat(e.target.value)
                            }
                        })
                    }
                    value={json.data.aboutMe.geolocationCoordinates?.longitude ?? ""}
                />
            </div>

            <label
                htmlFor="aboutMe.geolocationCoordinates"
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
                    onChange={
                        (e) => setJson(draft => {
                            if (draft.data.aboutMe.geolocationCoordinates) {
                                draft.data.aboutMe.geolocationCoordinates.altitude = parseFloat(e.target.value)
                            }
                        })
                    }
                    value={json.data.aboutMe.geolocationCoordinates?.altitude ?? ""}
                />
            </div>

            <label
                htmlFor="aboutMe.geolocationCoordinates"
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
                    onChange={
                        (e) => setJson(draft => {
                            if (draft.data.aboutMe.geolocationCoordinates) {
                                draft.data.aboutMe.geolocationCoordinates.altitude = parseFloat(e.target.value)
                            }
                        })
                    }
                    value={json.data.aboutMe.geolocationCoordinates?.accuracy ?? ""}
                />
            </div>

            <label
                htmlFor="aboutMe.geolocationCoordinates"
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
                    onChange={
                        (e) => setJson(draft => {
                            if (draft.data.aboutMe.geolocationCoordinates) {
                                draft.data.aboutMe.geolocationCoordinates.altitudeAccuracy = parseFloat(e.target.value)
                            }
                        })
                    }
                    value={json.data.aboutMe.geolocationCoordinates?.altitudeAccuracy ?? ""}
                />
            </div>
            </>
            )}
            </>
    )
}