import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Section } from "./Section";

const meta: Meta<typeof Section> = {
	component: Section,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: <>ああああああああああああああああああああ</>,
		text: "セクションヘッダー",
	},
	async play({ canvas }) {
		// Sectionの基本構造をテスト
		const header = canvas.getByRole("heading", { name: "セクションヘッダー" });
		await expect(header).toBeInTheDocument();

		// 必要なCSSクラスが適用されているかテスト
		await expect(header).toHaveClass("mt-2", "mb-2", "text-xl");
		await expect(header).toHaveAttribute("aria-level", "2");
	},
};
