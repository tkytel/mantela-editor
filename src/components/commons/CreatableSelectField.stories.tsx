import type { Meta, StoryObj } from "@storybook/react-vite";
import { CreatableSelectField } from "./CreatableSelectField";

const meta: Meta<typeof CreatableSelectField> = {
	component: CreatableSelectField,
	argTypes: {
		isMulti: {
			control: "boolean",
		},
		isDisabled: {
			control: "boolean",
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOptions = [
	{ label: "オプション1", value: "option1" },
	{ label: "オプション2", value: "option2" },
];

export const Default: Story = {
	args: {
		id: "creatable-select",
		value: defaultOptions,
		placeholder: "オプションを選択または作成してください",
		isMulti: true,
		isDisabled: false,
	},
};

export const SingleSelect: Story = {
	args: {
		id: "single-select",
		value: [defaultOptions[0]],
		placeholder: "単一オプションを選択してください",
		isMulti: false,
		isDisabled: false,
	},
};

export const Disabled: Story = {
	args: {
		id: "disabled-select",
		value: defaultOptions,
		placeholder: "無効化されたフィールド",
		isMulti: true,
		isDisabled: true,
	},
};

export const Empty: Story = {
	args: {
		id: "empty-select",
		value: [],
		placeholder: "新しいオプションを作成してください",
		isMulti: true,
		isDisabled: false,
	},
};
