import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { SectionHeader } from "./SectionHeader";

const meta: Meta<typeof SectionHeader> = {
	component: SectionHeader,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Level2: Story = {
	args: {
		level: 2,
		text: "セクションヘッダー レベル2",
	},
	async play({ canvas }) {
		// SectionHeaderの基本構造をテスト
		const header = canvas.getByRole("heading", { name: "セクションヘッダー レベル2" });
		await expect(header).toBeInTheDocument();

		// 必要なCSSクラスが適用されているかテスト
		await expect(header).toHaveClass("mt-2", "mb-2", "text-xl");
		await expect(header).toHaveAttribute("aria-level", "2");
	},
};

export const Level3: Story = {
	args: {
		level: 3,
		text: "セクションヘッダー レベル3",
	},
	async play({ canvas }) {
		// SectionHeaderの基本構造をテスト
		const header = canvas.getByRole("heading", { name: "セクションヘッダー レベル3" });
		await expect(header).toBeInTheDocument();

		// 必要なCSSクラスが適用されているかテスト
		await expect(header).toHaveClass("mt-5", "mb-3", "text-sm");
		await expect(header).toHaveAttribute("aria-level", "3");
	},
};
