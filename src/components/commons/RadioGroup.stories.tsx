import type { Meta, StoryObj } from "@storybook/react-vite";
import { RadioGroup } from "./RadioGroup";

const meta: Meta<typeof RadioGroup> = {
	component: RadioGroup,
	argTypes: {
		label: {
			control: "text",
		},
		value: {
			control: "text",
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: "選択してください",
		name: "sample-radio",
		value: "option1",
		options: [
			{ value: "option1", label: "オプション1" },
			{ value: "option2", label: "オプション2" },
			{ value: "option3", label: "オプション3" },
		],
	},
};

export const NoSelection: Story = {
	args: {
		label: "未選択状態",
		name: "no-selection",
		value: "",
		options: [
			{ value: "yes", label: "はい" },
			{ value: "no", label: "いいえ" },
		],
	},
};

export const YesNoChoice: Story = {
	args: {
		label: "確認",
		name: "yes-no",
		value: "yes",
		options: [
			{ value: "yes", label: "はい" },
			{ value: "no", label: "いいえ" },
		],
	},
};

export const SizeOptions: Story = {
	args: {
		label: "サイズを選択",
		name: "size",
		value: "medium",
		options: [
			{ value: "small", label: "S" },
			{ value: "medium", label: "M" },
			{ value: "large", label: "L" },
			{ value: "xlarge", label: "XL" },
		],
	},
};

export const WithComplexLabels: Story = {
	args: {
		label: "プランを選択",
		name: "plan",
		value: "basic",
		options: [
			{
				value: "basic",
				label: (
					<div>
						<div className="font-semibold">ベーシック</div>
						<div className="text-xs text-gray-500">月額 ¥1,000</div>
					</div>
				),
			},
			{
				value: "premium",
				label: (
					<div>
						<div className="font-semibold">プレミアム</div>
						<div className="text-xs text-gray-500">月額 ¥2,000</div>
					</div>
				),
			},
			{
				value: "enterprise",
				label: (
					<div>
						<div className="font-semibold">エンタープライズ</div>
						<div className="text-xs text-gray-500">お問い合わせ</div>
					</div>
				),
			},
		],
	},
};
