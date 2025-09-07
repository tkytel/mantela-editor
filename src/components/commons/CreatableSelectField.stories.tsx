import type { Meta, StoryObj } from "@storybook/react-vite";
import { CreatableSelectField } from "./CreatableSelectField";

const meta: Meta<typeof CreatableSelectField> = {
	argTypes: {
		isDisabled: {
			control: "boolean",
		},
		isMulti: {
			control: "boolean",
		},
	},
	component: CreatableSelectField,
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
		isDisabled: false,
		isMulti: true,
		placeholder: "オプションを選択または作成してください",
		value: defaultOptions,
	},
};

export const SingleSelect: Story = {
	args: {
		id: "single-select",
		isDisabled: false,
		isMulti: false,
		placeholder: "単一オプションを選択してください",
		value: [defaultOptions[0]],
	},
};

export const Disabled: Story = {
	args: {
		id: "disabled-select",
		isDisabled: true,
		isMulti: true,
		placeholder: "無効化されたフィールド",
		value: defaultOptions,
	},
};

export const Empty: Story = {
	args: {
		id: "empty-select",
		isDisabled: false,
		isMulti: true,
		placeholder: "新しいオプションを作成してください",
		value: [],
	},
};
