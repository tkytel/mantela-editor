export default function Footer() {
	return (
		<footer className="my-4 rounded-lg bg-white shadow-xs dark:bg-gray-800">
			<div className="mx-auto w-full max-w-(--breakpoint-xl) p-4 md:flex md:items-center md:justify-between">
				<span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
					&copy; 2025 yude &lt;i@yude.jp&gt;, by courtesy of Tokyo Wide Area Telephony Network.
				</span>
				<ul className="mt-3 flex flex-wrap items-center text-sm font-medium text-gray-500 sm:mt-0 dark:text-gray-400">
					<li>
						<a
							className="me-4 hover:text-gray-700 hover:underline md:me-6 dark:hover:text-gray-300"
							href="https://tkytel.github.io/"
						>
							東京広域電話網
						</a>
					</li>
					<li>
						<a
							className="me-4 hover:text-gray-700 hover:underline md:me-6 dark:hover:text-gray-300"
							href="https://github.com/tkytel/mantela-editor"
						>
							GitHub リポジトリ
						</a>
					</li>
					<li>
						<a
							className="me-4 hover:text-gray-700 hover:underline md:me-6 dark:hover:text-gray-300"
							href="https://github.com/tkytel/mantela/wiki"
						>
							Mantela
						</a>
					</li>
					<li>
						<a
							className="me-4 hover:text-gray-700 hover:underline md:me-6 dark:hover:text-gray-300"
							href="https://tkytel.github.io/mantela-viewer"
						>
							Mantela Viewer
						</a>
					</li>
					<li>
						<a
							className="me-4 hover:text-gray-700 hover:underline md:me-6 dark:hover:text-gray-300"
							href="https://tkytel.github.io/mantela-router"
						>
							Mantela Router
						</a>
					</li>
				</ul>
			</div>
		</footer>
	);
}
