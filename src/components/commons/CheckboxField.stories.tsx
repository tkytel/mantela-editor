import type { Meta, StoryObj } from "@storybook/react-vite";
import { CheckboxField } from "./CheckboxField";

const meta: Meta<typeof CheckboxField> = {
	component: CheckboxField,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		id: "checkbox-default",
		label: "チェックボックス",
		checked: false,
	},
};

export const Checked: Story = {
	args: {
		id: "checkbox-checked",
		label: "チェック済み",
		checked: true,
	},
};

export const WithDescription: Story = {
	args: {
		id: "checkbox-with-desc",
		label: "設定を有効にする",
		description: "この設定を有効にすると、追加機能が利用できるようになります。",
		checked: false,
	},
};

export const LongDescription: Story = {
	args: {
		id: "checkbox-long-desc",
		label: "利用規約に同意する",
		description:
			"このサービスを利用するには、利用規約とプライバシーポリシーに同意していただく必要があります。詳細については、各ドキュメントをご確認ください。",
		checked: false,
	},
};

export const CheckedWithDescription: Story = {
	args: {
		id: "checkbox-checked-desc",
		label: "メール通知を受け取る",
		description: "重要なお知らせやアップデート情報をメールで受け取ります。",
		checked: true,
	},
};

export const MultipleCheckboxes: Story = {
	decorators: [
		() => (
			<div className="space-y-4 w-80">
				<CheckboxField id="option1" label="オプション 1" description="最初のオプションです。" checked={true} />
				<CheckboxField id="option2" label="オプション 2" description="2番目のオプションです。" checked={false} />
				<CheckboxField id="option3" label="オプション 3" checked={false} />
			</div>
		),
	],
};
