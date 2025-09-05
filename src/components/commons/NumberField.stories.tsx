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
		value: "",
		placeholder: "数値を入力してください",
	},
};

export const WithValue: Story = {
	args: {
		id: "number-with-value",
		label: "年齢",
		value: "25",
		placeholder: "年齢を入力してください",
	},
};

export const WithMinMax: Story = {
	args: {
		id: "number-min-max",
		label: "評価（1-10）",
		value: "7",
		placeholder: "1から10の評価",
		min: 1,
		max: 10,
	},
};

export const Decimal: Story = {
	args: {
		id: "number-decimal",
		label: "価格",
		value: "19.99",
		placeholder: "価格を入力（例：19.99）",
		min: 0,
	},
};

export const Latitude: Story = {
	args: {
		id: "latitude",
		label: "緯度",
		value: "35.6762",
		placeholder: "緯度を十進数で入力",
		min: -90,
		max: 90,
	},
};

export const Longitude: Story = {
	args: {
		id: "longitude",
		label: "経度",
		value: "139.6503",
		placeholder: "経度を十進数で入力",
		min: -180,
		max: 180,
	},
};

export const Coordinates: Story = {
	decorators: [
		() => (
			<div className="space-y-4 w-80">
				<NumberField id="lat" label="緯度" value="35.6762" placeholder="緯度" min={-90} max={90} />
				<NumberField id="lng" label="経度" value="139.6503" placeholder="経度" min={-180} max={180} />
				<NumberField id="alt" label="海抜高度 [m]" value="40" placeholder="高度（メートル）" />
			</div>
		),
	],
};
