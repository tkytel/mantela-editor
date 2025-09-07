import type { Meta, StoryObj } from "@storybook/react-vite";
import { SelectField } from "./SelectField";

const meta: Meta<typeof SelectField> = {
	component: SelectField,
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleOptions = [
	{ label: "オプション 1", value: "option1" },
	{ label: "オプション 2", value: "option2" },
	{ label: "オプション 3", value: "option3" },
	{ label: "オプション 4", value: "option4" },
];

const colorOptions = [
	{ label: "赤", value: "red" },
	{ label: "青", value: "blue" },
	{ label: "緑", value: "green" },
	{ label: "黄", value: "yellow" },
	{ label: "紫", value: "purple" },
];

export const Default: Story = {
	args: {
		id: "select-field",
		label: "セレクトフィールド",
		options: sampleOptions,
		placeholder: "オプションを選択してください",
		value: "",
	},
};

export const WithValue: Story = {
	args: {
		id: "select-with-value",
		label: "選択済みセレクト",
		options: sampleOptions,
		placeholder: "オプションを選択してください",
		value: "option2",
	},
};

export const ColorSelect: Story = {
	args: {
		id: "color-select",
		label: "色を選択",
		options: colorOptions,
		placeholder: "色を選択してください",
		value: "blue",
	},
};

export const ManyOptions: Story = {
	args: {
		id: "many-options",
		label: "多数のオプション",
		options: Array.from({ length: 20 }, (_, i) => ({
			label: `アイテム ${i + 1}`,
			value: `item${i + 1}`,
		})),
		placeholder: "20個のオプションから選択",
		value: "",
	},
};
