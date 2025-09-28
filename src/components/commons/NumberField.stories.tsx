import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { NumberField } from "./NumberField";

const meta: Meta<typeof NumberField> = {
	component: NumberField,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		id: "number-default",
		label: "数値入力",
		onChange: fn(),
		placeholder: "数値を入力してください",
		value: "",
	},
	async play({ args, canvas, userEvent }) {
		// フィールドの存在確認
		const numberField = canvas.getByRole("textbox", { name: "数値入力" });
		await expect(numberField).toBeInTheDocument();
		await expect(numberField).toHaveAttribute("type", "text");

		// プレースホルダーの確認
		await expect(numberField).toHaveAttribute("placeholder", "数値を入力してください");

		// 初期値の確認
		await expect(numberField).toHaveValue("");

		// ユーザー入力のシミュレーションと onChange の確認
		await userEvent.type(numberField, "123");
		await expect(args.onChange).toHaveBeenNthCalledWith(1, "1");
		await expect(args.onChange).toHaveBeenNthCalledWith(2, "2");
		await expect(args.onChange).toHaveBeenNthCalledWith(3, "3");
	},
};

export const WithValue: Story = {
	args: {
		id: "number-with-value",
		label: "年齢",
		placeholder: "年齢を入力してください",
		value: "25",
	},
	async play({ canvas }) {
		// フィールドの存在確認
		const numberField = canvas.getByRole("textbox", { name: "年齢" });
		await expect(numberField).toBeInTheDocument();
	},
};

export const WithMinMax: Story = {
	args: {
		id: "number-min-max",
		label: "評価（1-10）",
		max: 10,
		min: 1,
		placeholder: "1から10の評価",
		value: "7",
	},
	async play({ canvas }) {
		// フィールドの存在確認
		const numberField = canvas.getByRole("textbox", { name: "評価（1-10）" });
		await expect(numberField).toBeInTheDocument();

		// Min, max 属性の確認
		await expect(numberField).toHaveAttribute("min", "1");
		await expect(numberField).toHaveAttribute("max", "10");
	},
};

export const Decimal: Story = {
	args: {
		id: "number-decimal",
		label: "価格",
		min: 0,
		placeholder: "価格を入力（例：19.99）",
		value: "19.99",
	},
	async play({ canvas }) {
		// フィールドの存在確認
		const numberField = canvas.getByRole("textbox", { name: "価格" });
		await expect(numberField).toBeInTheDocument();

		// Min 属性の確認
		await expect(numberField).toHaveAttribute("min", "0");
	},
};

export const Latitude: Story = {
	args: {
		id: "latitude",
		label: "緯度",
		max: 90,
		min: -90,
		placeholder: "緯度を十進数で入力",
		value: "35.6762",
	},
	async play({ canvas }) {
		// フィールドの存在確認
		const numberField = canvas.getByRole("textbox", { name: "緯度" });
		await expect(numberField).toBeInTheDocument();

		// Min, max 属性の確認
		await expect(numberField).toHaveAttribute("min", "-90");
		await expect(numberField).toHaveAttribute("max", "90");
	},
};

export const Longitude: Story = {
	args: {
		id: "longitude",
		label: "経度",
		max: 180,
		min: -180,
		placeholder: "経度を十進数で入力",
		value: "139.6503",
	},
	async play({ canvas }) {
		// フィールドの存在確認
		const numberField = canvas.getByRole("textbox", { name: "経度" });
		await expect(numberField).toBeInTheDocument();

		// Min, max 属性の確認
		await expect(numberField).toHaveAttribute("min", "-180");
		await expect(numberField).toHaveAttribute("max", "180");
	},
};

export const Coordinates: Story = {
	decorators: [
		() => (
			<div className="w-80 space-y-4">
				<NumberField id="lat" label="緯度" max={90} min={-90} placeholder="緯度" value="35.6762" />
				<NumberField id="lng" label="経度" max={180} min={-180} placeholder="経度" value="139.6503" />
				<NumberField id="alt" label="海抜高度 [m]" placeholder="高度（メートル）" value="40" />
			</div>
		),
	],
};
