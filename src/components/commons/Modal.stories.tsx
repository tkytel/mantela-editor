import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, fn } from "storybook/test";
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
		id: "default",
		isOpen: true,
		onClose: fn(),
		title: "サンプルモーダル",
	},
	async play({ args, canvas, userEvent }) {
		// バックドロップの存在確認
		const backdrop = canvas.getByRole("presentation");
		await expect(backdrop).toBeInTheDocument();
		await expect(backdrop).toHaveClass("bg-gray-500/50");
		await expect(backdrop).toHaveClass("dark:bg-gray-900/75");

		// モーダルの存在確認
		const modal = canvas.getByRole("dialog");
		await expect(modal).toBeInTheDocument();
		await expect(modal).toHaveAccessibleName();

		// タイトルの確認
		const title = canvas.getByText("サンプルモーダル");
		await expect(title).toBeInTheDocument();

		// コンテンツの確認
		const content = canvas.getByText("これはモーダルの内容です。ここに任意のコンテンツを表示できます。");
		await expect(content).toBeInTheDocument();

		// 閉じるボタンの確認とクリック
		const closeButton = canvas.getByRole("button", { name: "Close modal" });
		await expect(closeButton).toBeInTheDocument();
		await expect(closeButton).toHaveClass("text-gray-400");
		await expect(closeButton).toHaveClass("hover:text-gray-900");

		await userEvent.click(closeButton);
		await expect(args.onClose).toHaveBeenCalled();
	},
};

export const WithFooter: Story = {
	args: {
		children: "この操作を実行してもよろしいですか？",
		footer: (
			<div className="flex gap-2">
				<button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700" type="button">
					OK
				</button>
				<button className="rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-700" type="button">
					キャンセル
				</button>
			</div>
		),
		id: "with-footer",
		isOpen: true,
		title: "確認ダイアログ",
	},
	async play({ canvas }) {
		// フッターの存在確認
		const footer = canvas.getByText("OK").parentElement;
		await expect(footer).toBeInTheDocument();
		await expect(footer).toHaveClass("flex");
		await expect(footer).toHaveClass("gap-2");

		// OKボタンの確認
		const okButton = canvas.getByRole("button", { name: "OK" });
		await expect(okButton).toBeInTheDocument();
		await expect(okButton).toHaveClass("bg-blue-500");
		await expect(okButton).toHaveClass("hover:bg-blue-700");

		// キャンセルボタンの確認
		const cancelButton = canvas.getByRole("button", { name: "キャンセル" });
		await expect(cancelButton).toBeInTheDocument();
		await expect(cancelButton).toHaveClass("bg-gray-500");
		await expect(cancelButton).toHaveClass("hover:bg-gray-700");
	},
};

export const LargeContent: Story = {
	args: {
		children: (
			<div>
				<p className="mb-4">これは長いコンテンツを含むモーダルの例です。</p>
				<p className="mb-4">複数の段落や要素を含む場合のレイアウトを確認できます。</p>
				<div className="rounded bg-gray-100 p-4">
					<h4 className="mb-2 font-semibold">サブセクション</h4>
					<p>追加の情報やフォームなどを含めることができます。</p>
				</div>
			</div>
		),
		id: "large-content",
		isOpen: true,
		title: "大きなコンテンツ",
	},
	async play({ canvas }) {
		// コンテンツの存在確認
		const content = canvas.getByText("これは長いコンテンツを含むモーダルの例です。");
		await expect(content).toBeInTheDocument();

		const subsection = canvas.getByText("サブセクション");
		await expect(subsection).toBeInTheDocument();
		await expect(subsection).toHaveClass("font-semibold");
	},
};

export const Interactive: Story = {
	args: {
		id: "interactive",
	},
	async play({ canvas, userEvent }) {
		// モーダルを開くボタンの確認とクリック
		const openButton = canvas.getByRole("button", { name: "モーダルを開く" });
		await expect(openButton).toBeInTheDocument();
		await expect(openButton).toHaveClass("bg-blue-500");
		await expect(openButton).toHaveClass("hover:bg-blue-700");

		await userEvent.click(openButton);

		// モーダルの存在確認
		const modal = canvas.getByRole("dialog");
		await expect(modal).toBeInTheDocument();

		// 閉じるボタンの確認とクリック
		const closeButton = canvas.getByRole("button", { name: "Close modal" });
		await expect(closeButton).toBeInTheDocument();
		await expect(closeButton).toHaveClass("text-gray-400");
		await expect(closeButton).toHaveClass("hover:text-gray-900");

		await userEvent.click(closeButton);
		await expect(modal).not.toBeInTheDocument();
	},
	render(args) {
		const [isOpen, setIsOpen] = useState(false);

		return (
			<div className="p-8">
				<button
					className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
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
							className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
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
