import type { Meta, StoryObj } from "@storybook/react-vite";
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
		value: [],
		placeholder: "タグを入力してEnterを押してください",
		required: false,
	},
};

export const WithValues: Story = {
	args: {
		id: "with-values",
		label: "選択済みタグ",
		value: [
			{ value: "react", label: "React" },
			{ value: "typescript", label: "TypeScript" },
			{ value: "storybook", label: "Storybook" },
		],
		placeholder: "新しいタグを追加",
		required: false,
	},
};

export const Required: Story = {
	args: {
		id: "required-select",
		label: "必須セレクト",
		value: [],
		placeholder: "必須項目です",
		required: true,
	},
};

export const PrefixExample: Story = {
	args: {
		id: "prefix-example",
		label: "好ましいプレフィックス",
		value: [
			{ value: "Mr.", label: "Mr." },
			{ value: "Ms.", label: "Ms." },
		],
		placeholder: "プレフィックスを入力してEnterを押してください",
		required: false,
	},
};

export const Technologies: Story = {
	args: {
		id: "technologies",
		label: "使用技術",
		value: [
			{ value: "react", label: "React" },
			{ value: "vue", label: "Vue.js" },
			{ value: "angular", label: "Angular" },
			{ value: "svelte", label: "Svelte" },
		],
		placeholder: "技術名を入力",
		required: false,
	},
};

export const Empty: Story = {
	args: {
		id: "empty-select",
		label: "からの状態",
		value: [],
		placeholder: "何も選択されていません",
		required: false,
	},
};

export const LongLabel: Story = {
	args: {
		id: "long-label",
		label: "とても長いラベルのCreatableSelectフィールドの例",
		value: [
			{ value: "tag1", label: "とても長いタグ名の例その1" },
			{ value: "tag2", label: "とても長いタグ名の例その2" },
		],
		placeholder: "とても長いプレースホルダーテキストの例です",
		required: true,
	},
};
