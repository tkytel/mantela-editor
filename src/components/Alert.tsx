import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { AlertAtom } from "../helpers/Jotai";
import { Icon } from "./commons";

export default function Alert() {
	const { alerts } = useAtomValue(AlertAtom);

	const errorMessages = useMemo(
		() =>
			Object.entries(alerts).flatMap(([field, message]) => {
				return message === "" ? null : (
					<li key={field}>
						<span className="font-mono">{field}</span>
						<p className="ml-5">{message}</p>
					</li>
				);
			}),
		[alerts],
	);

	if (Object.entries(alerts).length === 0) {
		return null;
	}

	return (
		<div
			className="absolute top-0 left-1/4 transform -translate-x-1/2 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 max-w-2xl opacity-[.85]"
			id="top-alert-additional-content-5"
			role="alert"
		>
			<div className="flex items-center">
				<Icon variant="info" />
				<span className="sr-only">Info</span>
				<h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
					ごめんなさい！設定内容に間違いがあるようです。
				</h3>
			</div>

			<div className="mt-2 mb-4 text-sm text-gray-800 dark:text-gray-200">
				<ul className="space-y-1 text-gray-500 dark:text-gray-400 list-disc list-inside">{errorMessages}</ul>
			</div>
		</div>
	);
}
