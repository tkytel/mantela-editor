export default function Footer() {
	return (
		<footer className="bg-white rounded-lg shadow-sm m-4">
			<div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
				<span className="text-sm text-gray-500 sm:text-center">
					&copy; 2025 yude &lt;i@yude.jp&gt;, by courtesy of Tokyo Wide Area Telephony Network.
				</span>
				<ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 sm:mt-0">
					<li>
						<a href="https://tkytel.github.io/" className="hover:underline me-4 md:me-6">
							東京広域電話網
						</a>
					</li>
					<li>
						<a href="https://github.com/tkytel/mantela-editor" className="hover:underline me-4 md:me-6">
							GitHub リポジトリ
						</a>
					</li>
					<li>
						<a href="https://tkytel.github.io/mantela" className="hover:underline me-4 md:me-6">
							Mantela
						</a>
					</li>
					<li>
						<a href="https://tkytel.github.io/mantela-viewer" className="hover:underline me-4 md:me-6">
							Mantela Viewer
						</a>
					</li>
					<li>
						<a href="https://tkytel.github.io/mantela-router" className="hover:underline me-4 md:me-6">
							Mantela Router
						</a>
					</li>
				</ul>
			</div>
		</footer>
	);
}
