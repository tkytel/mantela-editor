import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
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
		onChange: fn(),
		placeholder: "オプションを選択または作成してください",
		value: defaultOptions,
	},
	async play({ args, canvas, canvasElement, userEvent }) {
		// フィールドの存在確認
		const selectField = canvas.getByRole("group");
		await expect(selectField).toBeInTheDocument();
		await expect(selectField).toHaveTextContent("オプション1オプション2");

		// 活性時 aria-disabled 属性の確認
		const controlElement = canvasElement.querySelector(".react-select__control");
		await expect(controlElement).toBeInTheDocument();
		await expect(controlElement).not.toHaveAttribute("aria-disabled", "true");

		// 現在の value の確認
		await expect(selectField).toHaveTextContent("オプション1オプション2");

		// Combobox に focus した後、type して OnChangeするか確認
		const combobox = canvas.getByRole("combobox");
		await userEvent.click(combobox);
		await userEvent.type(combobox, "New Option{Enter}");
		await expect(args.onChange).toHaveBeenCalledWith(
			expect.arrayContaining([
				...defaultOptions,
				expect.objectContaining({ label: "New Option", value: "New Option" }),
			]),
		);
	},
};

export const SingleSelect: Story = {
	args: {
		id: "single-select",
		isDisabled: false,
		isMulti: false,
		onChange: fn(),
		placeholder: "単一オプションを選択してください",
		value: [defaultOptions[0]],
	},
	async play({ args, canvas, canvasElement, userEvent }) {
		// フィールドの存在確認
		const selectField = canvas.getByRole("group");
		await expect(selectField).toBeInTheDocument();
		await expect(selectField).toHaveTextContent("オプション1");

		// 活性時 aria-disabled 属性の確認
		const controlElement = canvasElement.querySelector(".react-select__control");
		await expect(controlElement).toBeInTheDocument();
		await expect(selectField).not.toHaveAttribute("aria-disabled");

		// Combobox に focus した後、type して OnChangeするか確認
		const combobox = canvas.getByRole("combobox");
		await userEvent.click(combobox);
		await userEvent.type(combobox, "Option 2{Enter}");
		await expect(args.onChange).toHaveBeenCalledWith(expect.objectContaining({ label: "Option 2", value: "Option 2" }));
	},
};

export const Disabled: Story = {
	args: {
		id: "disabled-select",
		isDisabled: true,
		isMulti: true,
		onChange: fn(),
		placeholder: "無効化されたフィールド",
		value: defaultOptions,
	},
	async play({ canvas, canvasElement }) {
		// フィールドの存在確認
		const selectField = canvas.getByRole("group");
		await expect(selectField).toBeInTheDocument();
		await expect(selectField).toHaveTextContent("オプション1オプション2");

		// 非活性時 aria-disabled 属性の確認
		const controlElement = canvasElement.querySelector(".react-select__control");
		await expect(controlElement).toBeInTheDocument();
		await expect(controlElement).toHaveAttribute("aria-disabled", "true");
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
	async play({ canvas, canvasElement }) {
		// フィールドの存在確認
		const selectField = canvas.getByRole("group");
		await expect(selectField).toBeInTheDocument();
		await expect(selectField).toHaveTextContent("新しいオプションを作成してください");

		// 活性時 aria-disabled 属性の確認
		const controlElement = canvasElement.querySelector(".react-select__control");
		await expect(controlElement).toBeInTheDocument();
		await expect(controlElement).not.toHaveAttribute("aria-disabled", "true");
	},
};
