import type { Meta, StoryObj } from "@storybook/react-vite";
import { ErrorMessage } from "./ErrorMessage";

const meta: Meta<typeof ErrorMessage> = {
	component: ErrorMessage,
	argTypes: {
		children: {
			control: "text",
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "エラーが発生しました。入力内容を確認してください。",
	},
};

export const LongMessage: Story = {
	args: {
		children:
			"これは長いエラーメッセージの例です。複数行にわたってエラーの詳細を表示する場合のレイアウトを確認できます。ユーザーにとって分かりやすい説明を心がけましょう。",
	},
};

export const ValidationError: Story = {
	args: {
		children: "必須フィールドが入力されていません。",
	},
};

export const NetworkError: Story = {
	args: {
		children: "ネットワークエラーが発生しました。インターネット接続を確認してください。",
	},
};
