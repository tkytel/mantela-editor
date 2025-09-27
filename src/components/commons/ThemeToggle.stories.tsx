import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "jotai";
import { expect } from "storybook/test";
import ThemeToggle from "./ThemeToggle";

const meta: Meta<typeof ThemeToggle> = {
	component: ThemeToggle,
	decorators: [
		(Story) => {
			return (
				<Provider>
					<div className="p-4">
						<Story />
					</div>
				</Provider>
			);
		},
	],
	parameters: {
		layout: "centered",
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	async play({ canvas, userEvent }) {
		const systemTheme = globalThis.window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
		const button = canvas.getByRole("button", { name: systemTheme });
		await expect(button).toBeInTheDocument();
		await userEvent.click(button);
		await expect(canvas.getByRole("button", { name: systemTheme === "dark" ? "light" : "dark" })).toBeInTheDocument();
	},
};
