import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
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
		disabled: false,
		id: "example-field",
		label: "サンプルフィールド",
		placeholder: "テキストを入力してください",
		required: false,
		type: "text",
		value: "",
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
		await expect(input).toBeEnabled();
		await expect(input).toHaveAttribute("type", "text");
		await expect(input).toHaveAttribute("placeholder", "テキストを入力してください");
		await expect(input).toHaveValue("");
	},
};

export const Required: Story = {
	args: {
		disabled: false,
		id: "required-field",
		label: "必須フィールド",
		placeholder: "必須項目です",
		required: true,
		type: "text",
		value: "",
	},
	async play({ canvas }) {
		// フィールドの存在確認
		const formField = canvas.getByRole("group");
		await expect(formField).toBeInTheDocument();

		// ラベルの存在確認と必須マークの確認
		const label = canvas.getByText("必須フィールド");
		await expect(label).toBeInTheDocument();
		const requiredMark = canvas.getByText("*");
		await expect(requiredMark).toBeInTheDocument();
		await expect(requiredMark).toHaveClass("text-pink-500");

		// 入力欄の存在確認
		const input = canvas.getByRole("textbox");
		await expect(input).toBeInTheDocument();
		await expect(input).toBeEnabled();
		await expect(input).toHaveAttribute("type", "text");
		await expect(input).toHaveAttribute("placeholder", "必須項目です");
		await expect(input).toHaveValue("");
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
		id: "disabled-field",
		label: "無効化されたフィールド",
		placeholder: "このフィールドは無効です",
		required: false,
		type: "text",
		value: "編集できません",
	},
};

export const WithValue: Story = {
	args: {
		disabled: false,
		id: "filled-field",
		label: "入力済みフィールド",
		placeholder: "テキストを入力してください",
		required: false,
		type: "text",
		value: "サンプルテキスト",
	},
	async play({ canvas }) {
		// フィールドの存在確認
		const formField = canvas.getByRole("group");
		await expect(formField).toBeInTheDocument();

		// ラベルの存在確認
		const label = canvas.getByText("入力済みフィールド");
		await expect(label).toBeInTheDocument();

		// 入力欄の存在確認と値の確認
		const input = canvas.getByRole("textbox");
		await expect(input).toBeInTheDocument();
		await expect(input).toBeEnabled();
		await expect(input).toHaveAttribute("type", "text");
		await expect(input).toHaveAttribute("placeholder", "テキストを入力してください");
		await expect(input).toHaveValue("サンプルテキスト");
	},
};

export const URLField: Story = {
	args: {
		disabled: false,
		id: "url-field",
		label: "URL フィールド",
		placeholder: "URLを入力してください",
		required: false,
		type: "url",
		value: "https://example.com",
	},
	async play({ canvas }) {
		// フィールドの存在確認
		const formField = canvas.getByRole("group");
		await expect(formField).toBeInTheDocument();

		// ラベルの存在確認
		const label = canvas.getByText("URL フィールド");
		await expect(label).toBeInTheDocument();

		// 入力欄の存在確認と値の確認
		const input = canvas.getByRole("textbox");
		await expect(input).toBeInTheDocument();
		await expect(input).toBeEnabled();
		await expect(input).toHaveAttribute("type", "url");
		await expect(input).toHaveAttribute("placeholder", "URLを入力してください");
		await expect(input).toHaveValue("https://example.com");
	},
};

export const NumberField: Story = {
	args: {
		disabled: false,
		id: "number-field",
		label: "数値フィールド",
		placeholder: "数値を入力してください",
		required: false,
		type: "number",
		value: "123",
	},
	async play({ canvas }) {
		// フィールドの存在確認
		const formField = canvas.getByRole("group");
		await expect(formField).toBeInTheDocument();

		// ラベルの存在確認
		const label = canvas.getByText("数値フィールド");
		await expect(label).toBeInTheDocument();

		// 入力欄の存在確認と値の確認
		const input = canvas.getByRole("spinbutton");
		await expect(input).toBeInTheDocument();
		await expect(input).toBeEnabled();
		await expect(input).toHaveAttribute("type", "number");
		await expect(input).toHaveAttribute("placeholder", "数値を入力してください");
		await expect(input).toHaveValue(123);
	},
};
