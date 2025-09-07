import type { Meta, StoryObj } from "@storybook/react-vite";
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
			<button className="text-blue-600 hover:text-blue-800 text-sm font-medium" type="button">
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
};

export const WithDeleteButton: Story = {
	args: {
		actionButton: (
			<button className="text-red-600 hover:text-red-800 text-sm font-medium" type="button">
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
};

export const WithMultipleActions: Story = {
	args: {
		actionButton: (
			<div className="flex gap-2">
				<button className="text-blue-600 hover:text-blue-800 text-sm font-medium" type="button">
					編集
				</button>
				<button className="text-red-600 hover:text-red-800 text-sm font-medium" type="button">
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
};
