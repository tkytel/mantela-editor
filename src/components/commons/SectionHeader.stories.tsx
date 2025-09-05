import type { Meta, StoryObj } from "@storybook/react-vite";
import { SectionHeader } from "./SectionHeader";

const meta: Meta<typeof SectionHeader> = {
	component: SectionHeader,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "セクションヘッダー",
	},
};

export const PersonalInfo: Story = {
	args: {
		children: "個人情報",
	},
};

export const ContactInfo: Story = {
	args: {
		children: "連絡先情報",
	},
};

export const Settings: Story = {
	args: {
		children: "設定",
	},
};

export const Advanced: Story = {
	args: {
		children: "高度な設定",
	},
};

export const MultipleSections: Story = {
	decorators: [
		() => (
			<div className="space-y-8 w-80">
				<div>
					<SectionHeader>基本情報</SectionHeader>
					<div className="mt-4 space-y-2">
						<div className="h-8 bg-gray-200 rounded"></div>
						<div className="h-8 bg-gray-200 rounded"></div>
					</div>
				</div>

				<div>
					<SectionHeader>詳細設定</SectionHeader>
					<div className="mt-4 space-y-2">
						<div className="h-8 bg-gray-200 rounded"></div>
						<div className="h-8 bg-gray-200 rounded"></div>
						<div className="h-8 bg-gray-200 rounded"></div>
					</div>
				</div>

				<div>
					<SectionHeader>セキュリティ</SectionHeader>
					<div className="mt-4 space-y-2">
						<div className="h-8 bg-gray-200 rounded"></div>
					</div>
				</div>
			</div>
		),
	],
};
