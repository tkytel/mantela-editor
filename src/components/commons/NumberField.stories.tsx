import type { Meta, StoryObj } from "@storybook/react-vite";
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
		placeholder: "数値を入力してください",
		value: "",
	},
};

export const WithValue: Story = {
	args: {
		id: "number-with-value",
		label: "年齢",
		placeholder: "年齢を入力してください",
		value: "25",
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
};

export const Decimal: Story = {
	args: {
		id: "number-decimal",
		label: "価格",
		min: 0,
		placeholder: "価格を入力（例：19.99）",
		value: "19.99",
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
