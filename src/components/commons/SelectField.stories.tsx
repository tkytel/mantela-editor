import type { Meta, StoryObj } from "@storybook/react-vite";
import { SelectField } from "./SelectField";

const meta: Meta<typeof SelectField> = {
	component: SelectField,
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleOptions = [
	{ value: "option1", label: "オプション 1" },
	{ value: "option2", label: "オプション 2" },
	{ value: "option3", label: "オプション 3" },
	{ value: "option4", label: "オプション 4" },
];

const colorOptions = [
	{ value: "red", label: "赤" },
	{ value: "blue", label: "青" },
	{ value: "green", label: "緑" },
	{ value: "yellow", label: "黄" },
	{ value: "purple", label: "紫" },
];

export const Default: Story = {
	args: {
		id: "select-field",
		label: "セレクトフィールド",
		options: sampleOptions,
		value: "",
		placeholder: "オプションを選択してください",
	},
};

export const WithValue: Story = {
	args: {
		id: "select-with-value",
		label: "選択済みセレクト",
		options: sampleOptions,
		value: "option2",
		placeholder: "オプションを選択してください",
	},
};

export const ColorSelect: Story = {
	args: {
		id: "color-select",
		label: "色を選択",
		options: colorOptions,
		value: "blue",
		placeholder: "色を選択してください",
	},
};

export const ManyOptions: Story = {
	args: {
		id: "many-options",
		label: "多数のオプション",
		options: Array.from({ length: 20 }, (_, i) => ({
			value: `item${i + 1}`,
			label: `アイテム ${i + 1}`,
		})),
		value: "",
		placeholder: "20個のオプションから選択",
	},
};
