import type { Meta, StoryObj } from "@storybook/react-vite";
import { AddButton } from "./AddButton";

const meta: Meta<typeof AddButton> = {
	argTypes: {
		onClick: { action: "clicked" },
		variant: {
			control: { type: "select" },
			options: ["primary", "secondary", "purple"],
		},
	},
	component: AddButton,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		label: "追加",
		variant: "primary",
	},
};

export const Secondary: Story = {
	args: {
		label: "セカンダリボタン",
		variant: "secondary",
	},
};

export const Purple: Story = {
	args: {
		label: "パープルボタン",
		variant: "purple",
	},
};

export const LongLabel: Story = {
	args: {
		label: "とても長いラベルのボタン",
		variant: "primary",
	},
};

export const ShortLabel: Story = {
	args: {
		label: "+",
		variant: "primary",
	},
};

export const AllVariants: Story = {
	render: () => (
		<div className="w-64 space-y-4">
			<AddButton label="プライマリ" variant="primary" />
			<AddButton label="セカンダリ" variant="secondary" />
			<AddButton label="パープル" variant="purple" />
		</div>
	),
};
