import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { LabeledCreatableSelect } from "./LabeledCreatableSelect";

const meta: Meta<typeof LabeledCreatableSelect> = {
	component: LabeledCreatableSelect,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		id: "creatable-select",
		label: "作成可能セレクト",
		onChange: fn(),
		placeholder: "タグを入力してEnterを押してください",
		required: false,
		value: [],
	},
	async play({ args, canvas, userEvent }) {
		// ラベルの存在確認
		const label = canvas.getByText("作成可能セレクト");
		await expect(label).toBeInTheDocument();

		// 必須マークが表示されていないことを確認
		const requiredMark = canvas.queryByText("*");
		await expect(requiredMark).not.toBeInTheDocument();

		// プレースホルダーの存在確認
		const selectField = canvas.getByRole("group");
		await expect(selectField).toBeInTheDocument();
		await expect(selectField).toHaveTextContent("タグを入力してEnterを押してください");

		// Combobox に focus した後、type して OnChangeするか確認
		const combobox = canvas.getByRole("combobox");
		await userEvent.click(combobox);
		await userEvent.type(combobox, "New Option{Enter}");
		await expect(args.onChange).toHaveBeenCalledWith(
			expect.arrayContaining([expect.objectContaining({ label: "New Option", value: "New Option" })]),
		);
	},
};

export const WithValues: Story = {
	args: {
		id: "with-values",
		label: "選択済みタグ",
		onChange: fn(),
		placeholder: "新しいタグを追加",
		required: false,
		value: [
			{ label: "React", value: "react" },
			{ label: "TypeScript", value: "typescript" },
			{ label: "Storybook", value: "storybook" },
		],
	},
	async play({ canvas }) {
		// ラベルの存在確認
		const label = canvas.getByText("選択済みタグ");
		await expect(label).toBeInTheDocument();

		// プレースホルダーの存在確認
		const selectField = canvas.getByRole("group");
		await expect(selectField).toBeInTheDocument();
		await expect(selectField).not.toHaveTextContent("新しいタグを追加");

		// 選択されているタグの存在確認
		await expect(selectField).toBeInTheDocument();
		await expect(selectField).toHaveTextContent("ReactTypeScriptStorybook");
	},
};

export const Required: Story = {
	args: {
		id: "required-select",
		label: "必須セレクト",
		placeholder: "必須項目です",
		required: true,
		value: [],
	},
	async play({ canvas }) {
		// ラベルの存在確認
		const label = canvas.getByText("必須セレクト");
		await expect(label).toBeInTheDocument();

		// 必須マークが表示されていることを確認
		const requiredMark = canvas.getByText("*");
		await expect(requiredMark).toBeInTheDocument();
	},
};

export const Empty: Story = {
	args: {
		id: "empty-select",
		label: "空の状態",
		placeholder: "何も選択されていません",
		required: false,
		value: [],
	},
	async play({ canvas }) {
		// ラベルの存在確認
		const label = canvas.getByText("空の状態");
		await expect(label).toBeInTheDocument();

		// プレースホルダーの存在確認
		const selectField = canvas.getByRole("group");
		await expect(selectField).toBeInTheDocument();
		await expect(selectField).toHaveTextContent("何も選択されていません");

		// 必須マークが表示されていないことを確認
		const requiredMark = canvas.queryByText("*");
		await expect(requiredMark).not.toBeInTheDocument();
	},
};

export const LongLabel: Story = {
	args: {
		id: "long-label",
		label: "とても長いラベルのCreatableSelectフィールドの例",
		placeholder: "とても長いプレースホルダーテキストの例です",
		required: true,
		value: [
			{ label: "とても長いタグ名の例その1", value: "tag1" },
			{ label: "とても長いタグ名の例その2", value: "tag2" },
		],
	},
	async play({ canvas }) {
		// ラベルの存在確認
		const label = canvas.getByText("とても長いラベルのCreatableSelectフィールドの例");
		await expect(label).toBeInTheDocument();

		// 必須マークが表示されていることを確認
		const requiredMark = canvas.getByText("*");
		await expect(requiredMark).toBeInTheDocument();

		// 選択されているタグの存在確認
		const selectField = canvas.getByRole("group");
		await expect(selectField).toBeInTheDocument();
		await expect(selectField).toHaveTextContent("とても長いタグ名の例その1とても長いタグ名の例その2");
	},
};

export const WithActionButton: Story = {
	args: {
		actionButton: (
			<button
				className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none disabled:opacity-50"
				type="button"
			>
				アクション
			</button>
		),
		id: "select-with-action",
		label: "アクションボタン付きセレクト",
		onChange: fn(),
		placeholder: "タグを入力してEnterを押してください",
		required: false,
		value: [],
	},
	async play({ canvas }) {
		// ラベルの存在確認
		const label = canvas.getByText("アクションボタン付きセレクト");
		await expect(label).toBeInTheDocument();

		// アクションボタンの存在確認
		const actionButton = canvas.getByRole("button", { name: "アクション" });
		await expect(actionButton).toBeInTheDocument();
	},
};
