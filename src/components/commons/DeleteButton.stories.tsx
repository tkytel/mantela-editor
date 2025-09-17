import type { Meta, StoryObj } from "@storybook/react-vite";
import { DeleteButton } from "./DeleteButton";

const meta: Meta<typeof DeleteButton> = {
	component: DeleteButton,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		onDelete() {
			/* eslint-disable-next-line no-alert */
			alert("削除ボタンがクリックされました！");
		},
	},
};

export const InCard: Story = {
	args: {
		onDelete() {
			/* eslint-disable-next-line no-alert */
			alert("カード内の削除ボタンがクリックされました！");
		},
	},
	decorators: [
		(Story) => (
			<div className="relative w-80 rounded-lg border border-gray-200 bg-white p-6 shadow-xs">
				<h3 className="mb-2 text-lg font-medium text-gray-900">サンプルカード</h3>
				<p className="mb-4 text-gray-600">これは削除可能なカードです。右上の×ボタンで削除できます。</p>
				<Story />
			</div>
		),
	],
};

export const MultipleCards: Story = {
	args: {
		onDelete() {
			/* eslint-disable-next-line no-alert */
			alert("削除ボタンがクリックされました！");
		},
	},
	decorators: [
		(Story) => (
			<div className="space-y-4">
				{[1, 2, 3].map((i) => (
					<div className="relative w-80 rounded-lg border border-gray-200 bg-white p-6 shadow-xs" key={i}>
						<h3 className="mb-2 text-lg font-medium text-gray-900">カード {i}</h3>
						<p className="mb-4 text-gray-600">これは削除可能なカード{i}です。</p>
						<Story />
					</div>
				))}
			</div>
		),
	],
};
