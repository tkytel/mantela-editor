import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeInit } from "../.flowbite-react/init.tsx";
import "./index.css";
import App from "./App.tsx";

createRoot(document.querySelector("#root")!).render(
	<StrictMode>
		<ThemeInit />
		<App />
	</StrictMode>,
);
