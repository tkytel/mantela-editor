import { ThemeToggle } from "./commons";

export default function Nav() {
	return (
		<div className="mt-2">
			<div className="flex items-start justify-between">
				<div>
					<p className="text-3xl text-gray-900 dark:text-gray-100">☎️ Mantela Editor</p>
					<p className="text-gray-700 dark:text-gray-300">
						Mantela Editor は、
						<a className="text-blue-600 hover:underline dark:text-blue-400" href="https://github.com/tkytel/mantela">
							Mantela
						</a>{" "}
						記述を行うためのヘルパー UI を提供します。
					</p>
				</div>
				<div className="ml-4 shrink-0">
					<ThemeToggle />
				</div>
			</div>
		</div>
	);
}
