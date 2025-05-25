import { useAtomValue } from "jotai";
import { AlertAtom } from "../helpers/Jotai";

export default function Alert() {
     const { alerts } = useAtomValue(AlertAtom);
     
    return (
        <>
        { Object.entries(alerts).length != 0 &&
            <div id="top-alert-additional-content-5" className="absolute top-0 left-1/4 transform -translate-x-1/2 p-4 border border-gray-300 rounded-lg bg-gray-50 max-w-lg" role="alert">
                <div className="flex items-center">
                    <svg className="shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <span className="sr-only">Info</span>
                    <h3 className="text-lg font-medium text-gray-800">ごめんなさい！設定内容に間違いがあるようです。</h3>
                </div>
                
                <div className="mt-2 mb-4 text-sm text-gray-800">
                    <ul className="space-y-1 text-gray-500 list-disc list-inside">
                        {
                            Object.entries(alerts).map(([field, message]) => (
                                message != "" &&
                                <li key={field}>
                                    <span className="font-mono">
                                        {field}
                                    </span>
                                    <p className="ml-5">
                                        {message}
                                    </p>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        }
        </>
    )
}
