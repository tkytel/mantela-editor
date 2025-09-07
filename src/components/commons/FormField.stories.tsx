import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormField } from "./FormField";

const meta: Meta<typeof FormField> = {
	argTypes: {
		type: {
			control: { type: "select" },
			options: ["text", "url", "number", "email", "password"],
		},
	},
	component: FormField,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		id: "example-field",
		label: "サンプルフィールド",
		placeholder: "テキストを入力してください",
		required: false,
		type: "text",
		value: "",
	},
};

export const Required: Story = {
	args: {
		id: "required-field",
		label: "必須フィールド",
		placeholder: "必須項目です",
		required: true,
		type: "text",
		value: "",
	},
};

export const WithValue: Story = {
	args: {
		id: "filled-field",
		label: "入力済みフィールド",
		placeholder: "テキストを入力してください",
		required: false,
		type: "text",
		value: "サンプルテキスト",
	},
};

export const URLField: Story = {
	args: {
		id: "url-field",
		label: "URL フィールド",
		placeholder: "URLを入力してください",
		required: false,
		type: "url",
		value: "https://example.com",
	},
};

export const NumberField: Story = {
	args: {
		id: "number-field",
		label: "数値フィールド",
		placeholder: "数値を入力してください",
		required: false,
		type: "number",
		value: "123",
	},
};
