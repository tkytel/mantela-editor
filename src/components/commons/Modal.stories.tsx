import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Modal } from "./Modal";

const meta: Meta<typeof Modal> = {
	component: Modal,
	parameters: {
		layout: "fullscreen",
	},
	argTypes: {
		isOpen: {
			control: "boolean",
		},
		title: {
			control: "text",
		},
		children: {
			control: "text",
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		isOpen: true,
		title: "サンプルモーダル",
		children: "これはモーダルの内容です。ここに任意のコンテンツを表示できます。",
	},
};

export const WithFooter: Story = {
	args: {
		isOpen: true,
		title: "確認ダイアログ",
		children: "この操作を実行してもよろしいですか？",
		footer: (
			<div className="flex gap-2">
				<button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
					OK
				</button>
				<button type="button" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
					キャンセル
				</button>
			</div>
		),
	},
};

export const LargeContent: Story = {
	args: {
		isOpen: true,
		title: "大きなコンテンツ",
		children: (
			<div>
				<p className="mb-4">これは長いコンテンツを含むモーダルの例です。</p>
				<p className="mb-4">複数の段落や要素を含む場合のレイアウトを確認できます。</p>
				<div className="bg-gray-100 p-4 rounded">
					<h4 className="font-semibold mb-2">サブセクション</h4>
					<p>追加の情報やフォームなどを含めることができます。</p>
				</div>
			</div>
		),
	},
};

export const Interactive: Story = {
	render(args) {
		const [isOpen, setIsOpen] = useState(false);

		return (
			<div className="p-8">
				<button
					onClick={() => {
						setIsOpen(true);
					}}
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				>
					モーダルを開く
				</button>
				<Modal
					{...args}
					isOpen={isOpen}
					onClose={() => {
						setIsOpen(false);
					}}
					title="インタラクティブモーダル"
					footer={
						<button
							onClick={() => {
								setIsOpen(false);
							}}
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						>
							閉じる
						</button>
					}
				>
					<p>このモーダルはボタンクリックで開閉できます。</p>
					<p>×ボタンやフッターのボタンで閉じることができます。</p>
				</Modal>
			</div>
		);
	},
	args: {},
};
