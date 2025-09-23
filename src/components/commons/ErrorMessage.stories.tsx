import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { ErrorMessage } from "./ErrorMessage";

const meta: Meta<typeof ErrorMessage> = {
	argTypes: {
		children: {
			control: "text",
		},
	},
	component: ErrorMessage,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "エラーが発生しました。入力内容を確認してください。",
	},
	async play({ canvas }) {
		// ErrorMessageの存在確認
		const errorMessage = canvas.getByRole("alert");
		await expect(errorMessage).toBeInTheDocument();

		// 必要なCSSクラスが適用されているかテスト
		await expect(errorMessage).toHaveClass("bg-red-50", "border-red-200", "text-red-700");

		// 子要素が正しく表示されているかテスト
		const content = canvas.getByText("エラーが発生しました。入力内容を確認してください。");
		await expect(content).toBeInTheDocument();
	},
};

export const LongMessage: Story = {
	args: {
		children:
			"これは長いエラーメッセージの例です。複数行にわたってエラーの詳細を表示する場合のレイアウトを確認できます。ユーザーにとって分かりやすい説明を心がけましょう。",
	},
	async play({ canvas }) {
		// ErrorMessageの存在確認
		const errorMessage = canvas.getByRole("alert");
		await expect(errorMessage).toBeInTheDocument();

		// 必要なCSSクラスが適用されているかテスト
		await expect(errorMessage).toHaveClass("bg-red-50", "border-red-200", "text-red-700");

		// 子要素が正しく表示されているかテスト
		const content = canvas.getByText(
			"これは長いエラーメッセージの例です。複数行にわたってエラーの詳細を表示する場合のレイアウトを確認できます。ユーザーにとって分かりやすい説明を心がけましょう。",
		);
		await expect(content).toBeInTheDocument();
	},
};
