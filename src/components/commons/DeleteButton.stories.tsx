import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, within } from "storybook/test";
import { DeleteButton } from "./DeleteButton";

const meta: Meta<typeof DeleteButton> = {
	component: DeleteButton,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		onDelete: fn(),
	},
	async play({ args, canvas, userEvent }) {
		const button = canvas.getByRole("button");
		await expect(button).toBeInTheDocument();

		await userEvent.click(button);
		await expect(args.onDelete).toHaveBeenCalled();
	},
};

export const InCard: Story = {
	args: {
		onDelete: fn(),
	},
	decorators: [
		(Story) => (
			<div className="relative w-80 rounded-lg border border-gray-200 bg-white p-6 shadow-xs" role="dialog">
				<h3 className="mb-2 text-lg font-medium text-gray-900">サンプルカード</h3>
				<p className="mb-4 text-gray-600">これは削除可能なカードです。右上の×ボタンで削除できます。</p>
				<Story />
			</div>
		),
	],
	async play({ args, canvas, userEvent }) {
		// Card 内にボタンがあることを確認
		const dialog = canvas.getByRole("dialog");
		const button = within(dialog).getByRole("button");
		await expect(button).toBeInTheDocument();

		await userEvent.click(button);
		await expect(args.onDelete).toHaveBeenCalled();
	},
};

export const MultipleCards: Story = {
	args: {
		onDelete: fn(),
	},
	decorators: [
		(Story) => (
			<div className="space-y-4">
				{[1, 2, 3].map((i) => (
					<div className="relative w-80 rounded-lg border border-gray-200 bg-white p-6 shadow-xs" key={i} role="dialog">
						<h3 className="mb-2 text-lg font-medium text-gray-900">カード {i}</h3>
						<p className="mb-4 text-gray-600">これは削除可能なカード{i}です。</p>
						<Story />
					</div>
				))}
			</div>
		),
	],
	async play({ args, canvas, userEvent }) {
		// 複数の Card 内にそれぞれボタンがあることを確認
		const dialogs = canvas.getAllByRole("dialog");
		await expect(dialogs).toHaveLength(3);

		const button1 = within(dialogs[0]).getByRole("button");
		const button2 = within(dialogs[1]).getByRole("button");
		const button3 = within(dialogs[2]).getByRole("button");

		await expect(button1).toBeInTheDocument();
		await expect(button2).toBeInTheDocument();
		await expect(button3).toBeInTheDocument();

		await userEvent.click(button1);
		await userEvent.click(button2);
		await userEvent.click(button3);

		await expect(args.onDelete).toHaveBeenCalledTimes(3);
	},
};
