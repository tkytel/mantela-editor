import type { Meta, StoryObj } from "@storybook/react-vite";
import { CardContainer } from "./CardContainer";

const meta: Meta<typeof CardContainer> = {
	component: CardContainer,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: (
			<div>
				<h3 className="text-lg font-medium text-gray-900 mb-2">カードタイトル</h3>
				<p className="text-gray-600">これはカードコンテナの中身です。様々なコンテンツを配置できます。</p>
			</div>
		),
	},
};

export const WithForm: Story = {
	args: {
		children: (
			<div>
				<h3 className="text-lg font-medium text-gray-900 mb-4">フォームカード</h3>
				<div className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
							名前 <span className="text-red-500">*</span>
						</label>
						<input
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-hidden focus:ring-2 focus:ring-blue-500"
							id="name"
							placeholder="名前を入力してください"
							type="text"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
							メールアドレス
						</label>
						<input
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-hidden focus:ring-2 focus:ring-blue-500"
							id="email"
							placeholder="email@example.com"
							type="email"
						/>
					</div>
				</div>
			</div>
		),
	},
};

export const WithList: Story = {
	args: {
		children: (
			<div>
				<h3 className="text-lg font-medium text-gray-900 mb-4">リストカード</h3>
				<ul className="space-y-2">
					<li className="flex items-center space-x-2">
						<span className="w-2 h-2 bg-blue-500 rounded-full"></span>
						<span>アイテム 1</span>
					</li>
					<li className="flex items-center space-x-2">
						<span className="w-2 h-2 bg-green-500 rounded-full"></span>
						<span>アイテム 2</span>
					</li>
					<li className="flex items-center space-x-2">
						<span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
						<span>アイテム 3</span>
					</li>
				</ul>
			</div>
		),
	},
};
