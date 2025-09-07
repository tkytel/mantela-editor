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
		placeholder: "タグを入力してEnterを押してください",
		required: false,
		value: [],
	},
};

export const WithValues: Story = {
	args: {
		id: "with-values",
		label: "選択済みタグ",
		placeholder: "新しいタグを追加",
		required: false,
		value: [
			{ label: "React", value: "react" },
			{ label: "TypeScript", value: "typescript" },
			{ label: "Storybook", value: "storybook" },
		],
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
};

export const PrefixExample: Story = {
	args: {
		id: "prefix-example",
		label: "好ましいプレフィックス",
		placeholder: "プレフィックスを入力してEnterを押してください",
		required: false,
		value: [
			{ label: "Mr.", value: "Mr." },
			{ label: "Ms.", value: "Ms." },
		],
	},
};

export const Technologies: Story = {
	args: {
		id: "technologies",
		label: "使用技術",
		placeholder: "技術名を入力",
		required: false,
		value: [
			{ label: "React", value: "react" },
			{ label: "Vue.js", value: "vue" },
			{ label: "Angular", value: "angular" },
			{ label: "Svelte", value: "svelte" },
		],
	},
};

export const Empty: Story = {
	args: {
		id: "empty-select",
		label: "からの状態",
		placeholder: "何も選択されていません",
		required: false,
		value: [],
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
};
