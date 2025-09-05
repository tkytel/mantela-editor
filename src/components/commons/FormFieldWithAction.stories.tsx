import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormFieldWithAction } from "./FormFieldWithAction";

const meta: Meta<typeof FormFieldWithAction> = {
	component: FormFieldWithAction,
	argTypes: {
		label: {
			control: "text",
		},
		children: {
			control: "text",
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		id: "field-with-action",
		label: "サンプルフィールド",
		actionButton: (
			<button type="button" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
				追加
			</button>
		),
		children: (
			<input
				type="text"
				className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
				placeholder="テキストを入力してください"
			/>
		),
	},
};

export const WithDeleteButton: Story = {
	args: {
		id: "delete-action",
		label: "削除可能なフィールド",
		actionButton: (
			<button type="button" className="text-red-600 hover:text-red-800 text-sm font-medium">
				削除
			</button>
		),
		children: (
			<input
				type="text"
				className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
				placeholder="削除可能なテキスト"
				defaultValue="サンプルテキスト"
			/>
		),
	},
};

export const WithMultipleActions: Story = {
	args: {
		id: "multiple-actions",
		label: "複数アクション",
		actionButton: (
			<div className="flex gap-2">
				<button type="button" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
					編集
				</button>
				<button type="button" className="text-red-600 hover:text-red-800 text-sm font-medium">
					削除
				</button>
			</div>
		),
		children: (
			<textarea
				className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
				rows={3}
				placeholder="複数行のテキストを入力してください"
			/>
		),
	},
};

export const NoAction: Story = {
	args: {
		id: "no-action",
		label: "アクションなしフィールド",
		children: (
			<input
				type="text"
				className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
				placeholder="通常のフィールド"
			/>
		),
	},
};
