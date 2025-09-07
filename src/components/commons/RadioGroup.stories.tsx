import type { Meta, StoryObj } from "@storybook/react-vite";
import { RadioGroup } from "./RadioGroup";

const meta: Meta<typeof RadioGroup> = {
	argTypes: {
		label: {
			control: "text",
		},
		value: {
			control: "text",
		},
	},
	component: RadioGroup,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: "選択してください",
		name: "sample-radio",
		options: [
			{ label: "オプション1", value: "option1" },
			{ label: "オプション2", value: "option2" },
			{ label: "オプション3", value: "option3" },
		],
		value: "option1",
	},
};

export const NoSelection: Story = {
	args: {
		label: "未選択状態",
		name: "no-selection",
		options: [
			{ label: "はい", value: "yes" },
			{ label: "いいえ", value: "no" },
		],
		value: "",
	},
};

export const YesNoChoice: Story = {
	args: {
		label: "確認",
		name: "yes-no",
		options: [
			{ label: "はい", value: "yes" },
			{ label: "いいえ", value: "no" },
		],
		value: "yes",
	},
};

export const SizeOptions: Story = {
	args: {
		label: "サイズを選択",
		name: "size",
		options: [
			{ label: "S", value: "small" },
			{ label: "M", value: "medium" },
			{ label: "L", value: "large" },
			{ label: "XL", value: "xlarge" },
		],
		value: "medium",
	},
};

export const WithComplexLabels: Story = {
	args: {
		label: "プランを選択",
		name: "plan",
		options: [
			{
				label: (
					<div>
						<div className="font-semibold">ベーシック</div>
						<div className="text-xs text-gray-500">月額 ¥1,000</div>
					</div>
				),
				value: "basic",
			},
			{
				label: (
					<div>
						<div className="font-semibold">プレミアム</div>
						<div className="text-xs text-gray-500">月額 ¥2,000</div>
					</div>
				),
				value: "premium",
			},
			{
				label: (
					<div>
						<div className="font-semibold">エンタープライズ</div>
						<div className="text-xs text-gray-500">お問い合わせ</div>
					</div>
				),
				value: "enterprise",
			},
		],
		value: "basic",
	},
};
