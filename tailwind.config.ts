import flowbiteReact from "flowbite-react/plugin/tailwindcss";

export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", ".flowbite-react/class-list.json"],
	darkMode: "class",
	plugins: [flowbiteReact],
	theme: {
		extend: {},
	},
};
