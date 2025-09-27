import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { FormFieldWithButton } from "./FormFieldWithButton";

const meta: Meta<typeof FormFieldWithButton> = {
	component: FormFieldWithButton,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		buttonContent: "実行",
		id: "field-with-button",
		label: "ボタン付きフィールド",
		onButtonClick: fn(),
		onChange: fn(),
		placeholder: "テキストを入力してください",
		required: false,
		type: "text",
		value: "",
	},
	async play({ args, canvas, userEvent }) {
		// フィールドの存在確認
		const inputField = canvas.getByRole("textbox", { name: "ボタン付きフィールド" });
		await expect(inputField).toBeInTheDocument();
		await expect(inputField).toHaveAttribute("type", "text");

		// ボタンの存在確認
		const button = canvas.getByRole("button", { name: "実行" });
		await expect(button).toBeInTheDocument();
		await expect(button).toHaveClass("bg-blue-700");

		// 入力フィールドの動作確認
		await userEvent.type(inputField, "テスト入力");
		await expect(args.onChange).toHaveBeenCalled();

		// ボタンクリックの動作確認
		await userEvent.click(button);
		await expect(args.onButtonClick).toHaveBeenCalled();
	},
};

export const GenerateId: Story = {
	args: {
		buttonContent: (
			<svg className="h-4 w-4" fill="currentColor" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
				<path d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160 352 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l111.5 0c0 0 0 0 0 0l.4 0c17.7 0 32-14.3 32-32l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 35.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1L16 432c0 17.7 14.3 32 32 32s32-14.3 32-32l0-35.1 17.6 17.5c0 0 0 0 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.8c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352l34.4 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L48.4 288c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z" />
			</svg>
		),
		id: "generate-id",
		label: "識別子",
		onButtonClick: fn(),
		onChange: fn(),
		placeholder: "識別子を入力またはボタンで生成",
		required: false,
		type: "text",
		value: "AUTO_GEN_123456",
	},
	async play({ args, canvas, userEvent }) {
		// フィールドの存在確認
		const inputField = canvas.getByRole("textbox", { name: "識別子" });
		await expect(inputField).toBeInTheDocument();
		await expect(inputField).toHaveAttribute("type", "text");

		// ボタンの存在確認
		const button = canvas.getByRole("button");
		await expect(button).toBeInTheDocument();
		await expect(button).toHaveClass("bg-blue-700");

		// 入力フィールドの動作確認
		await userEvent.clear(inputField);
		await userEvent.type(inputField, "AAA-BBB-CCC");
		await expect(args.onChange).toHaveBeenCalled();

		// ボタンクリックの動作確認
		await userEvent.click(button);
		await expect(args.onButtonClick).toHaveBeenCalled();
	},
};

export const SearchField: Story = {
	args: {
		buttonContent: (
			<svg
				className="h-4 w-4"
				fill="none"
				stroke="currentColor"
				strokeWidth={1.5}
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		),
		id: "search-field",
		label: "検索",
		onButtonClick: fn(),
		onChange: fn(),
		placeholder: "検索キーワードを入力",
		required: false,
		type: "text",
		value: "React コンポーネント",
	},
	async play({ args, canvas, userEvent }) {
		// フィールドの存在確認
		const inputField = canvas.getByRole("textbox", { name: "検索" });
		await expect(inputField).toBeInTheDocument();
		await expect(inputField).toHaveAttribute("type", "text");

		// ボタンの存在確認
		const button = canvas.getByRole("button");
		await expect(button).toBeInTheDocument();
		await expect(button).toHaveClass("bg-blue-700");

		// 入力フィールドの動作確認
		await userEvent.clear(inputField);
		await userEvent.type(inputField, "新しいキーワード");
		await expect(args.onChange).toHaveBeenCalled();

		// ボタンクリックの動作確認
		await userEvent.click(button);
		await expect(args.onButtonClick).toHaveBeenCalled();
	},
};

export const URLFetch: Story = {
	args: {
		buttonContent: "取得",
		id: "url-fetch",
		label: "URL取得",
		onButtonClick: fn(),
		onChange: fn(),
		placeholder: "URLを入力してください",
		required: true,
		type: "url",
		value: "https://api.example.com/data",
	},
	async play({ args, canvas, userEvent }) {
		// フィールドの存在確認
		const inputField = canvas.getByRole("textbox", { name: "URL取得 *" });
		await expect(inputField).toBeInTheDocument();
		await expect(inputField).toHaveAttribute("type", "url");

		// ボタンの存在確認
		const button = canvas.getByRole("button", { name: "取得" });
		await expect(button).toBeInTheDocument();
		await expect(button).toHaveClass("bg-blue-700");

		// 入力フィールドの動作確認
		await userEvent.clear(inputField);
		await userEvent.type(inputField, "https://newapi.example.com/info");
		await expect(args.onChange).toHaveBeenCalled();

		// ボタンクリックの動作確認
		await userEvent.click(button);
		await expect(args.onButtonClick).toHaveBeenCalled();
	},
};

export const Required: Story = {
	args: {
		buttonContent: "送信",
		id: "required-field",
		label: "必須フィールド",
		onButtonClick: fn(),
		onChange: fn(),
		placeholder: "必須項目を入力してください",
		required: true,
		type: "text",
		value: "",
	},
	async play({ args, canvas, userEvent }) {
		// フィールドの存在確認
		const inputField = canvas.getByRole("textbox", { name: "必須フィールド *" });
		await expect(inputField).toBeInTheDocument();
		await expect(inputField).toHaveAttribute("type", "text");

		// ボタンの存在確認
		const button = canvas.getByRole("button", { name: "送信" });
		await expect(button).toBeInTheDocument();
		await expect(button).toHaveClass("bg-blue-700");

		// 入力フィールドの動作確認
		await userEvent.type(inputField, "必須項目の入力");
		await expect(args.onChange).toHaveBeenCalled();

		// ボタンクリックの動作確認
		await userEvent.click(button);
		await expect(args.onButtonClick).toHaveBeenCalled();
	},
};
