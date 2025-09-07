import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "./Icon";

const meta: Meta<typeof Icon> = {
	argTypes: {
		variant: {
			control: { type: "select" },
			options: ["info", "refresh", "delete"],
		},
	},
	component: Icon,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
	args: {
		variant: "info",
	},
};

export const Refresh: Story = {
	args: {
		variant: "refresh",
	},
};

export const Delete: Story = {
	args: {
		variant: "delete",
	},
};

export const Cancel: Story = {
	args: {
		variant: "cancel",
	},
};

export const AllVariants: Story = {
	render: () => (
		<div className="flex items-center gap-6">
			<div className="flex flex-col items-center gap-2">
				<Icon variant="info" />
				<span className="text-sm">Info</span>
			</div>
			<div className="flex flex-col items-center gap-2">
				<Icon variant="refresh" />
				<span className="text-sm">Refresh</span>
			</div>
			<div className="flex flex-col items-center gap-2">
				<Icon variant="delete" />
				<span className="text-sm">Delete</span>
			</div>
			<div className="flex flex-col items-center gap-2">
				<Icon variant="cancel" />
				<span className="text-sm">Cancel</span>
			</div>
		</div>
	),
};

export const InButtons: Story = {
	render: () => (
		<div className="flex gap-2">
			<button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
				<Icon variant="info" />
				情報
			</button>
			<button className="flex items-center gap-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
				<Icon variant="refresh" />
				更新
			</button>
			<button className="flex items-center gap-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
				<Icon variant="delete" />
				削除
			</button>
			<button className="flex items-center gap-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
				<Icon variant="cancel" />
				キャンセル
			</button>
		</div>
	),
};
