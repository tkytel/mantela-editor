import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "jotai";
import ThemeToggle from "./ThemeToggle";

const meta: Meta<typeof ThemeToggle> = {
	component: ThemeToggle,
	decorators: [
		(Story) => (
			<Provider>
				<div className="p-4">
					<Story />
				</div>
			</Provider>
		),
	],
	parameters: {
		layout: "centered",
	},
	title: "Commons/ThemeToggle",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InDarkMode: Story = {
	parameters: {
		backgrounds: { default: "dark" },
	},
};
