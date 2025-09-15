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
			<div className="relative bg-white border border-gray-200 rounded-lg shadow-xs p-6 w-80">
				<h3 className="text-lg font-medium text-gray-900 mb-2">サンプルカード</h3>
				<p className="text-gray-600 mb-4">これは削除可能なカードです。右上の×ボタンで削除できます。</p>
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
					<div className="relative bg-white border border-gray-200 rounded-lg shadow-xs p-6 w-80" key={i}>
						<h3 className="text-lg font-medium text-gray-900 mb-2">カード {i}</h3>
						<p className="text-gray-600 mb-4">これは削除可能なカード{i}です。</p>
						<Story />
					</div>
				))}
			</div>
		),
	],
};
