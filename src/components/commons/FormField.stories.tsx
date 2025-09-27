import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
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
		onChange: fn(),
		placeholder: "テキストを入力してください",
		required: false,
		type: "text",
		value: "",
	},
	async play({ args, canvas, userEvent }) {
		// フィールドの存在確認
		const input = canvas.getByRole("textbox", { name: "サンプルフィールド" });
		await expect(input).toBeInTheDocument();

		// 入力欄の存在確認
		await expect(input).toBeInTheDocument();
		await expect(input).toBeEnabled();
		await expect(input).toHaveAttribute("type", "text");
		await expect(input).toHaveAttribute("placeholder", "テキストを入力してください");
		await expect(input).toHaveValue("");

		// OnChange イベントの確認
		await userEvent.type(input, "Hello");
		await expect(args.onChange).toHaveBeenNthCalledWith(1, "H");
		await expect(args.onChange).toHaveBeenNthCalledWith(2, "e");
		await expect(args.onChange).toHaveBeenNthCalledWith(3, "l");
		await expect(args.onChange).toHaveBeenNthCalledWith(4, "l");
		await expect(args.onChange).toHaveBeenNthCalledWith(5, "o");
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
		const input = canvas.getByRole("textbox", { name: "必須フィールド *" });
		await expect(input).toBeInTheDocument();

		// 必須マークの確認
		const requiredMark = canvas.getByText("*");
		await expect(requiredMark).toBeInTheDocument();
		await expect(requiredMark).toHaveClass("text-pink-500");
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
	async play({ canvas }) {
		// フィールドの存在確認
		const input = canvas.getByRole("textbox", { name: "無効化されたフィールド" });
		await expect(input).toBeInTheDocument();

		// 入力欄が無効化されていることの確認
		await expect(input).toBeDisabled();
		await expect(input).toHaveAttribute("type", "text");
		await expect(input).toHaveAttribute("placeholder", "このフィールドは無効です");
		await expect(input).toHaveValue("編集できません");
		await expect(input).toHaveClass("disabled:bg-gray-200");
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
		const input = canvas.getByRole("textbox", { name: "入力済みフィールド" });
		await expect(input).toBeInTheDocument();

		// 入力欄の存在確認と値の確認
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
		const input = canvas.getByRole("textbox", { name: "URL フィールド" });
		await expect(input).toBeInTheDocument();

		// 入力欄の存在確認と値の確認
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
		const input = canvas.getByRole("spinbutton", { name: "数値フィールド" });
		await expect(input).toBeInTheDocument();

		// 入力欄の存在確認と値の確認
		await expect(input).toBeInTheDocument();
		await expect(input).toBeEnabled();
		await expect(input).toHaveAttribute("type", "number");
		await expect(input).toHaveAttribute("placeholder", "数値を入力してください");
		await expect(input).toHaveValue(123);
	},
};
