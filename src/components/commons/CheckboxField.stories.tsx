import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent } from "storybook/test";
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
		onChange: fn(),
	},
	async play({ args, canvas }) {
		// CheckboxFieldの基本構造をテスト
		const checkbox = canvas.getByRole("checkbox", { checked: false, name: "チェックボックス" });
		await expect(checkbox).toBeInTheDocument();

		// チェックボックスをクリックしてチェック状態を変更
		await userEvent.click(checkbox);
		await expect(args.onChange).toHaveBeenCalled();
	},
};

export const Checked: Story = {
	args: {
		checked: true,
		id: "checkbox-checked",
		label: "チェック済み",
	},
	async play({ canvas }) {
		// チェック済みのCheckboxFieldの基本構造をテスト
		const checkbox = canvas.getByRole("checkbox", { checked: true, name: "チェック済み" });
		await expect(checkbox).toBeInTheDocument();
	},
};

export const WithDescription: Story = {
	args: {
		checked: false,
		description: "この設定を有効にすると、追加機能が利用できるようになります。",
		id: "checkbox-with-desc",
		label: "設定を有効にする",
	},
	async play({ canvas }) {
		// CheckboxField with descriptionの基本構造をテスト
		const checkbox = canvas.getByRole("checkbox", { checked: false, name: "設定を有効にする" });
		await expect(checkbox).toBeInTheDocument();

		// 説明テキストが正しく表示されているかテスト
		const description = canvas.getByText("この設定を有効にすると、追加機能が利用できるようになります。");
		await expect(description).toBeInTheDocument();
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
	async play({ canvas }) {
		// CheckboxField with long descriptionの基本構造をテスト
		const checkbox = canvas.getByRole("checkbox", { checked: false, name: "利用規約に同意する" });
		await expect(checkbox).toBeInTheDocument();

		// 長い説明テキストが正しく表示されているかテスト
		const description = canvas.getByText(
			"このサービスを利用するには、利用規約とプライバシーポリシーに同意していただく必要があります。詳細については、各ドキュメントをご確認ください。",
		);
		await expect(description).toBeInTheDocument();
	},
};

export const CheckedWithDescription: Story = {
	args: {
		checked: true,
		description: "重要なお知らせやアップデート情報をメールで受け取ります。",
		id: "checkbox-checked-desc",
		label: "メール通知を受け取る",
	},
	async play({ canvas }) {
		// Checked CheckboxField with descriptionの基本構造をテスト
		const checkbox = canvas.getByRole("checkbox", { checked: true, name: "メール通知を受け取る" });
		await expect(checkbox).toBeInTheDocument();

		// 説明テキストが正しく表示されているかテスト
		const description = canvas.getByText("重要なお知らせやアップデート情報をメールで受け取ります。");
		await expect(description).toBeInTheDocument();
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
	async play({ canvas }) {
		// 複数のCheckboxFieldの基本構造をテスト
		const checkbox1 = canvas.getByRole("checkbox", { checked: true, name: "オプション 1" });
		const checkbox2 = canvas.getByRole("checkbox", { checked: false, name: "オプション 2" });
		const checkbox3 = canvas.getByRole("checkbox", { checked: false, name: "オプション 3" });
		await expect(checkbox1).toBeInTheDocument();
		await expect(checkbox2).toBeInTheDocument();
		await expect(checkbox3).toBeInTheDocument();
	},
};
