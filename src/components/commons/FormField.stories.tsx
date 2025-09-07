import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormField } from "./FormField";

const meta: Meta<typeof FormField> = {
	component: FormField,
	argTypes: {
		type: {
			control: { type: "select" },
			options: ["text", "url", "number", "email", "password"],
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		id: "example-field",
		label: "サンプルフィールド",
		type: "text",
		value: "",
		placeholder: "テキストを入力してください",
		required: false,
	},
};

export const Required: Story = {
	args: {
		id: "required-field",
		label: "必須フィールド",
		type: "text",
		value: "",
		placeholder: "必須項目です",
		required: true,
	},
};

export const WithValue: Story = {
	args: {
		id: "filled-field",
		label: "入力済みフィールド",
		type: "text",
		value: "サンプルテキスト",
		placeholder: "テキストを入力してください",
		required: false,
	},
};

export const URLField: Story = {
	args: {
		id: "url-field",
		label: "URL フィールド",
		type: "url",
		value: "https://example.com",
		placeholder: "URLを入力してください",
		required: false,
	},
};

export const NumberField: Story = {
	args: {
		id: "number-field",
		label: "数値フィールド",
		type: "number",
		value: "123",
		placeholder: "数値を入力してください",
		required: false,
	},
};
