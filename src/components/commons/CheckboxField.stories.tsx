import type { Meta, StoryObj } from "@storybook/react-vite";
import { CheckboxField } from "./CheckboxField";

const meta: Meta<typeof CheckboxField> = {
	component: CheckboxField,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		checked: false,
		id: "checkbox-default",
		label: "チェックボックス",
	},
};

export const Checked: Story = {
	args: {
		checked: true,
		id: "checkbox-checked",
		label: "チェック済み",
	},
};

export const WithDescription: Story = {
	args: {
		checked: false,
		description: "この設定を有効にすると、追加機能が利用できるようになります。",
		id: "checkbox-with-desc",
		label: "設定を有効にする",
	},
};

export const LongDescription: Story = {
	args: {
		checked: false,
		description:
			"このサービスを利用するには、利用規約とプライバシーポリシーに同意していただく必要があります。詳細については、各ドキュメントをご確認ください。",
		id: "checkbox-long-desc",
		label: "利用規約に同意する",
	},
};

export const CheckedWithDescription: Story = {
	args: {
		checked: true,
		description: "重要なお知らせやアップデート情報をメールで受け取ります。",
		id: "checkbox-checked-desc",
		label: "メール通知を受け取る",
	},
};

export const MultipleCheckboxes: Story = {
	decorators: [
		() => (
			<div className="w-80 space-y-4">
				<CheckboxField checked={true} description="最初のオプションです。" id="option1" label="オプション 1" />
				<CheckboxField checked={false} description="2番目のオプションです。" id="option2" label="オプション 2" />
				<CheckboxField checked={false} id="option3" label="オプション 3" />
			</div>
		),
	],
};
