import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, within } from "storybook/test";
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
		onClick: fn(),
		variant: "primary",
	},
	async play({ args, canvas, userEvent }) {
		const button = canvas.getByRole("button", { name: args.label });
		await expect(button).toBeInTheDocument();

		await expect(button).toHaveClass("from-cyan-500");

		await userEvent.click(button);
		await expect(args.onClick).toHaveBeenCalled();
	},
};

export const Secondary: Story = {
	args: {
		label: "セカンダリボタン",
		onClick: fn(),
		variant: "secondary",
	},
	async play({ args, canvas, userEvent }) {
		const button = canvas.getByRole("button", { name: args.label });
		await expect(button).toBeInTheDocument();

		await expect(button).toHaveClass("bg-blue-700");

		await userEvent.click(button);
		await expect(args.onClick).toHaveBeenCalled();
	},
};

export const Purple: Story = {
	args: {
		label: "パープルボタン",
		onClick: fn(),
		variant: "purple",
	},
	async play({ args, canvas, userEvent }) {
		const button = canvas.getByRole("button", { name: args.label });
		await expect(button).toBeInTheDocument();

		await expect(button).toHaveClass("from-purple-600");

		await userEvent.click(button);
		await expect(args.onClick).toHaveBeenCalled();
	},
};

export const LongLabel: Story = {
	args: {
		label: "とても長いラベルのボタン",
		onClick: fn(),
		variant: "primary",
	},
	async play({ args, canvas, userEvent }) {
		const button = canvas.getByRole("button", { name: args.label });
		await expect(button).toBeInTheDocument();

		await expect(button).toHaveClass("from-cyan-500");

		await userEvent.click(button);
		await expect(args.onClick).toHaveBeenCalled();
	},
};

export const ShortLabel: Story = {
	args: {
		label: "+",
		onClick: fn(),
		variant: "primary",
	},
	async play({ args, canvasElement, userEvent }) {
		const canvas = within(canvasElement);

		const button = canvas.getByRole("button", { name: args.label });
		await expect(button).toBeInTheDocument();

		await expect(button).toHaveClass("from-cyan-500");

		await userEvent.click(button);
		await expect(args.onClick).toHaveBeenCalled();
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
