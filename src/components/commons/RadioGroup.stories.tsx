import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, within } from "storybook/test";
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
		id: "sample-radio",
		label: "選択してください",
		onChange: fn(),
		options: [
			{ label: "オプション1", value: "option1" },
			{ label: "オプション2", value: "option2" },
			{ label: "オプション3", value: "option3" },
		],
		value: "option1",
	},
	async play({ args, canvas, userEvent }) {
		// RadioGroupの基本構造をテスト
		const radioGroup = canvas.getByRole("radiogroup", { name: "選択してください" });
		await expect(radioGroup).toBeInTheDocument();

		// 各オプションが正しく表示されているかテスト
		const option1 = within(radioGroup).getByRole("radio", { checked: true, name: "オプション1" });
		const option2 = within(radioGroup).getByRole("radio", { checked: false, name: "オプション2" });
		const option3 = within(radioGroup).getByRole("radio", { checked: false, name: "オプション3" });
		await expect(option1).toBeInTheDocument();
		await expect(option2).toBeInTheDocument();
		await expect(option3).toBeInTheDocument();

		// オプションの選択を変更し、onChangeが正しく呼び出されるかテスト
		await userEvent.click(option2);
		await expect(args.onChange).toHaveBeenCalledWith("option2");
		await userEvent.click(option3);
		await expect(args.onChange).toHaveBeenCalledWith("option3");
	},
};

export const NoSelection: Story = {
	args: {
		id: "no-selection",
		label: "未選択状態",
		options: [
			{ label: "はい", value: "yes" },
			{ label: "いいえ", value: "no" },
		],
		value: "",
	},
	async play({ canvas }) {
		// RadioGroupの基本構造をテスト
		const radioGroup = canvas.getByRole("radiogroup", { name: "未選択状態" });
		await expect(radioGroup).toBeInTheDocument();

		// どのオプションも選択されていないことをテスト
		const optionYes = within(radioGroup).getByRole("radio", { checked: false, name: "はい" });
		const optionNo = within(radioGroup).getByRole("radio", { checked: false, name: "いいえ" });
		await expect(optionYes).toBeInTheDocument();
		await expect(optionNo).toBeInTheDocument();
	},
};

export const YesNoChoice: Story = {
	args: {
		id: "yes-no",
		label: "確認",
		options: [
			{ label: "はい", value: "yes" },
			{ label: "いいえ", value: "no" },
		],
		value: "yes",
	},
};

export const SizeOptions: Story = {
	args: {
		id: "size",
		label: "サイズを選択",
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
		id: "plan",
		label: "プランを選択",
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
