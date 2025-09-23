import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { FormFieldWithAction } from "./FormFieldWithAction";

const meta: Meta<typeof FormFieldWithAction> = {
	argTypes: {
		children: {
			control: "text",
		},
		label: {
			control: "text",
		},
	},
	component: FormFieldWithAction,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		actionButton: (
			<button className="text-sm font-medium text-blue-600 hover:text-blue-800" type="button">
				追加
			</button>
		),
		children: (
			<input
				className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
				placeholder="テキストを入力してください"
				type="text"
			/>
		),
		id: "field-with-action",
		label: "サンプルフィールド",
	},
	async play({ canvas }) {
		// フィールドの存在確認
		const formField = canvas.getByRole("group");
		await expect(formField).toBeInTheDocument();

		// ラベルの存在確認
		const label = canvas.getByText("サンプルフィールド");
		await expect(label).toBeInTheDocument();

		// 入力欄の存在確認
		const input = canvas.getByRole("textbox");
		await expect(input).toBeInTheDocument();
		await expect(input).toHaveAttribute("placeholder", "テキストを入力してください");
		await expect(input).toHaveValue("");

		// アクションボタンの存在確認
		const actionButton = canvas.getByRole("button", { name: "追加" });
		await expect(actionButton).toBeInTheDocument();
	},
};

export const WithDeleteButton: Story = {
	args: {
		actionButton: (
			<button className="text-sm font-medium text-red-600 hover:text-red-800" type="button">
				削除
			</button>
		),
		children: (
			<input
				className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
				defaultValue="サンプルテキスト"
				placeholder="削除可能なテキスト"
				type="text"
			/>
		),
		id: "delete-action",
		label: "削除可能なフィールド",
	},
	async play({ canvas }) {
		// フィールドの存在確認
		const formField = canvas.getByRole("group");
		await expect(formField).toBeInTheDocument();

		// ラベルの存在確認
		const label = canvas.getByText("削除可能なフィールド");
		await expect(label).toBeInTheDocument();

		// 入力欄の存在確認
		const input = canvas.getByRole("textbox");
		await expect(input).toBeInTheDocument();
		await expect(input).toHaveAttribute("placeholder", "削除可能なテキスト");
		await expect(input).toHaveValue("サンプルテキスト");

		// アクションボタンの存在確認
		const actionButton = canvas.getByRole("button", { name: "削除" });
		await expect(actionButton).toBeInTheDocument();
	},
};

export const WithMultipleActions: Story = {
	args: {
		actionButton: (
			<div className="flex gap-2">
				<button className="text-sm font-medium text-blue-600 hover:text-blue-800" type="button">
					編集
				</button>
				<button className="text-sm font-medium text-red-600 hover:text-red-800" type="button">
					削除
				</button>
			</div>
		),
		children: (
			<textarea
				className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
				placeholder="複数行のテキストを入力してください"
				rows={3}
			/>
		),
		id: "multiple-actions",
		label: "複数アクション",
	},
	async play({ canvas }) {
		// フィールドの存在確認
		const formField = canvas.getByRole("group");
		await expect(formField).toBeInTheDocument();

		// ラベルの存在確認
		const label = canvas.getByText("複数アクション");
		await expect(label).toBeInTheDocument();

		// 入力欄の存在確認
		const input = canvas.getByRole("textbox");
		await expect(input).toBeInTheDocument();
		await expect(input).toHaveAttribute("placeholder", "複数行のテキストを入力してください");

		// アクションボタンの存在確認
		const editButton = canvas.getByRole("button", { name: "編集" });
		await expect(editButton).toBeInTheDocument();

		const deleteButton = canvas.getByRole("button", { name: "削除" });
		await expect(deleteButton).toBeInTheDocument();
	},
};

export const NoAction: Story = {
	args: {
		children: (
			<input
				className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
				placeholder="通常のフィールド"
				type="text"
			/>
		),
		id: "no-action",
		label: "アクションなしフィールド",
	},
	async play({ canvas }) {
		// フィールドの存在確認
		const formField = canvas.getByRole("group");
		await expect(formField).toBeInTheDocument();

		// ラベルの存在確認
		const label = canvas.getByText("アクションなしフィールド");
		await expect(label).toBeInTheDocument();

		// 入力欄の存在確認
		const input = canvas.getByRole("textbox");
		await expect(input).toBeInTheDocument();
		await expect(input).toHaveAttribute("placeholder", "通常のフィールド");

		// アクションボタンが存在しないことを確認
		const actionButton = canvas.queryByRole("button");
		await expect(actionButton).toBeNull();
	},
};
