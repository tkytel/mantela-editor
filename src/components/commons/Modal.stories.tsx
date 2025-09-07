import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Modal } from "./Modal";

const meta: Meta<typeof Modal> = {
	argTypes: {
		children: {
			control: "text",
		},
		isOpen: {
			control: "boolean",
		},
		title: {
			control: "text",
		},
	},
	component: Modal,
	parameters: {
		layout: "fullscreen",
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "これはモーダルの内容です。ここに任意のコンテンツを表示できます。",
		isOpen: true,
		title: "サンプルモーダル",
	},
};

export const WithFooter: Story = {
	args: {
		children: "この操作を実行してもよろしいですか？",
		footer: (
			<div className="flex gap-2">
				<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button">
					OK
				</button>
				<button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" type="button">
					キャンセル
				</button>
			</div>
		),
		isOpen: true,
		title: "確認ダイアログ",
	},
};

export const LargeContent: Story = {
	args: {
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
		isOpen: true,
		title: "大きなコンテンツ",
	},
};

export const Interactive: Story = {
	args: {},
	render(args) {
		const [isOpen, setIsOpen] = useState(false);

		return (
			<div className="p-8">
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					onClick={() => {
						setIsOpen(true);
					}}
				>
					モーダルを開く
				</button>
				<Modal
					{...args}
					footer={
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
							onClick={() => {
								setIsOpen(false);
							}}
						>
							閉じる
						</button>
					}
					isOpen={isOpen}
					onClose={() => {
						setIsOpen(false);
					}}
					title="インタラクティブモーダル"
				>
					<p>このモーダルはボタンクリックで開閉できます。</p>
					<p>×ボタンやフッターのボタンで閉じることができます。</p>
				</Modal>
			</div>
		);
	},
};
