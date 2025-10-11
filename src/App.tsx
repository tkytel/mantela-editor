import { Provider, useAtomValue } from "jotai";
import { useEffect } from "react";
import Nav from "./components/Nav";
import Editor from "./components/Editor";
import Footer from "./components/Footer";
import { ResolvedThemeAtom } from "./helpers/Theme";

function App() {
	return (
		<Provider>
			<ThemeProvider>
				<div className="container mx-auto flex h-screen flex-col bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
					<Nav />
					<Editor />
					<Footer />
				</div>
			</ThemeProvider>
		</Provider>
	);
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
	const resolvedTheme = useAtomValue(ResolvedThemeAtom);

	useEffect(() => {
		const { documentElement } = document;
		if (resolvedTheme === "dark") {
			documentElement.classList.add("dark");
		} else {
			documentElement.classList.remove("dark");
		}
	}, [resolvedTheme]);

	return <>{children}</>;
}

export default App;
