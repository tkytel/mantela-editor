export default function Footer() {
	return (
		<footer className="bg-white rounded-lg shadow-sm m-4">
			<div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
				<span className="text-sm text-gray-500 sm:text-center">
					&copy; 2025 yude &lt;i@yude.jp&gt;, by courtesy of Tokyo Wide Area Telephony Network.
				</span>
				<ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 sm:mt-0">
					<li>
						<a className="hover:underline me-4 md:me-6" href="https://tkytel.github.io/">
							東京広域電話網
						</a>
					</li>
					<li>
						<a className="hover:underline me-4 md:me-6" href="https://github.com/tkytel/mantela-editor">
							GitHub リポジトリ
						</a>
					</li>
					<li>
						<a className="hover:underline me-4 md:me-6" href="https://tkytel.github.io/mantela/MANTELA">
							Mantela
						</a>
					</li>
					<li>
						<a className="hover:underline me-4 md:me-6" href="https://tkytel.github.io/mantela-viewer">
							Mantela Viewer
						</a>
					</li>
					<li>
						<a className="hover:underline me-4 md:me-6" href="https://tkytel.github.io/mantela-router">
							Mantela Router
						</a>
					</li>
				</ul>
			</div>
		</footer>
	);
}
