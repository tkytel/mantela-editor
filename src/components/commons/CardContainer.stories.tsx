import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
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
				<h3 className="mb-2 text-lg font-medium text-gray-900">カードタイトル</h3>
				<p className="text-gray-600">これはカードコンテナの中身です。様々なコンテンツを配置できます。</p>
			</div>
		),
	},
	async play({ canvas }) {
		// CardContainerの基本構造をテスト
		const cardContainer = canvas.getByRole("region");
		await expect(cardContainer).toBeInTheDocument();

		// 必要なCSSクラスが適用されているかテスト
		await expect(cardContainer).toHaveClass("rounded-lg");
		await expect(cardContainer).toHaveClass("border");
		await expect(cardContainer).toHaveClass("bg-white");
		await expect(cardContainer).toHaveClass("p-6");

		// 子要素が正しく表示されているかテスト
		const title = canvas.getByText("カードタイトル");
		await expect(title).toBeInTheDocument();

		const content = canvas.getByText("これはカードコンテナの中身です。様々なコンテンツを配置できます。");
		await expect(content).toBeInTheDocument();
	},
};

export const WithForm: Story = {
	args: {
		children: (
			<div>
				<h3 className="mb-4 text-lg font-medium text-gray-900">フォームカード</h3>
				<div className="space-y-4">
					<div>
						<label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="name">
							名前 <span className="text-red-500">*</span>
						</label>
						<input
							className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
							id="name"
							placeholder="名前を入力してください"
							type="text"
						/>
					</div>
					<div>
						<label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="email">
							メールアドレス
						</label>
						<input
							className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
							id="email"
							placeholder="email@example.com"
							type="email"
						/>
					</div>
				</div>
			</div>
		),
	},
	async play({ canvas, userEvent }) {
		// フォーム要素の存在確認
		const nameInput = canvas.getByLabelText(/名前/);
		const emailInput = canvas.getByLabelText(/メールアドレス/);

		await expect(nameInput).toBeInTheDocument();
		await expect(emailInput).toBeInTheDocument();

		// フォームへの入力テスト
		await userEvent.type(nameInput, "山田太郎");
		await expect(nameInput).toHaveValue("山田太郎");

		await userEvent.type(emailInput, "taro.yamada@example.com");
		await expect(emailInput).toHaveValue("taro.yamada@example.com");
		// 必須フィールドのマークが表示されているかテスト
		const requiredMark = canvas.getByText("*");
		await expect(requiredMark).toBeInTheDocument();
		await expect(requiredMark).toHaveClass("text-red-500");
	},
};

export const WithList: Story = {
	args: {
		children: (
			<div>
				<h3 className="mb-4 text-lg font-medium text-gray-900">リストカード</h3>
				<ul className="space-y-2">
					<li className="flex items-center space-x-2">
						<span className="h-2 w-2 rounded-full bg-blue-500"></span>
						<span>アイテム 1</span>
					</li>
					<li className="flex items-center space-x-2">
						<span className="h-2 w-2 rounded-full bg-green-500"></span>
						<span>アイテム 2</span>
					</li>
					<li className="flex items-center space-x-2">
						<span className="h-2 w-2 rounded-full bg-yellow-500"></span>
						<span>アイテム 3</span>
					</li>
				</ul>
			</div>
		),
	},
	async play({ canvas }) {
		// リストの存在確認
		const itemList = canvas.getByRole("list");
		await expect(itemList).toBeInTheDocument();

		// リストアイテムの数をテスト
		const listItems = canvas.getAllByRole("listitem");
		await expect(listItems).toHaveLength(3);

		// 各アイテムのテキストをテスト
		await expect(canvas.getByText("アイテム 1")).toBeInTheDocument();
		await expect(canvas.getByText("アイテム 2")).toBeInTheDocument();
		await expect(canvas.getByText("アイテム 3")).toBeInTheDocument();

		// カラードットの存在とスタイルをテスト
		const blueDot = canvas.getByText("アイテム 1").previousSibling as HTMLElement;
		const greenDot = canvas.getByText("アイテム 2").previousSibling as HTMLElement;
		const yellowDot = canvas.getByText("アイテム 3").previousSibling as HTMLElement;

		await expect(blueDot).toHaveClass("bg-blue-500");
		await expect(greenDot).toHaveClass("bg-green-500");
		await expect(yellowDot).toHaveClass("bg-yellow-500");
	},
};

export const StructureTest: Story = {
	args: {
		children: (
			<div>
				<h3 className="mb-2 text-lg font-medium text-gray-900" data-testid="test-title">
					テストタイトル
				</h3>
				<p className="text-gray-600" data-testid="test-content">
					これはテスト用のコンテンツです。
				</p>
			</div>
		),
	},
	async play({ canvas }) {
		// CardContainerの基本構造をテスト
		const cardContainer = canvas.getByRole("region");
		await expect(cardContainer).toBeInTheDocument();

		// 必要なCSSクラスが適用されているかテスト
		await expect(cardContainer).toHaveClass("rounded-lg");
		await expect(cardContainer).toHaveClass("border");
		await expect(cardContainer).toHaveClass("bg-white");
		await expect(cardContainer).toHaveClass("p-6");

		// 子要素が正しく表示されているかテスト
		const title = canvas.getByTestId("test-title");
		await expect(title).toBeInTheDocument();
		await expect(title).toHaveTextContent("テストタイトル");

		const content = canvas.getByTestId("test-content");
		await expect(content).toBeInTheDocument();
		await expect(content).toHaveTextContent("これはテスト用のコンテンツです。");
	},
};

export const FormInteractionTest: Story = {
	args: {
		children: (
			<div>
				<h3 className="mb-4 text-lg font-medium text-gray-900">フォームテスト</h3>
				<div className="space-y-4">
					<div>
						<label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="test-name">
							名前 <span className="text-red-500">*</span>
						</label>
						<input
							className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
							id="test-name"
							placeholder="名前を入力してください"
							type="text"
						/>
					</div>
					<div>
						<label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="test-email">
							メールアドレス
						</label>
						<input
							className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
							id="test-email"
							placeholder="email@example.com"
							type="email"
						/>
					</div>
				</div>
			</div>
		),
	},
	async play({ canvas, userEvent }) {
		// フォーム要素の存在確認
		const nameInput = canvas.getByLabelText(/名前/);
		const emailInput = canvas.getByLabelText(/メールアドレス/);

		await expect(nameInput).toBeInTheDocument();
		await expect(emailInput).toBeInTheDocument();

		// フォームへの入力テスト
		await userEvent.type(nameInput, "山田太郎");
		await expect(nameInput).toHaveValue("山田太郎");

		await userEvent.type(emailInput, "yamada@example.com");
		await expect(emailInput).toHaveValue("yamada@example.com");

		// 必須フィールドのマークが表示されているかテスト
		const requiredMark = canvas.getByText("*");
		await expect(requiredMark).toBeInTheDocument();
		await expect(requiredMark).toHaveClass("text-red-500");
	},
};

export const ListItemsTest: Story = {
	args: {
		children: (
			<div>
				<h3 className="mb-4 text-lg font-medium text-gray-900">アイテムリスト</h3>
				<ul className="space-y-2" data-testid="item-list">
					<li className="flex items-center space-x-2">
						<span className="h-2 w-2 rounded-full bg-blue-500" data-testid="blue-dot"></span>
						<span>アイテム 1</span>
					</li>
					<li className="flex items-center space-x-2">
						<span className="h-2 w-2 rounded-full bg-green-500" data-testid="green-dot"></span>
						<span>アイテム 2</span>
					</li>
					<li className="flex items-center space-x-2">
						<span className="h-2 w-2 rounded-full bg-yellow-500" data-testid="yellow-dot"></span>
						<span>アイテム 3</span>
					</li>
				</ul>
			</div>
		),
	},
	async play({ canvas }) {
		// リストの存在確認
		const itemList = canvas.getByTestId("item-list");
		await expect(itemList).toBeInTheDocument();

		// リストアイテムの数をテスト
		const listItems = canvas.getAllByRole("listitem");
		await expect(listItems).toHaveLength(3);

		// 各アイテムのテキストをテスト
		await expect(canvas.getByText("アイテム 1")).toBeInTheDocument();
		await expect(canvas.getByText("アイテム 2")).toBeInTheDocument();
		await expect(canvas.getByText("アイテム 3")).toBeInTheDocument();

		// カラードットの存在とスタイルをテスト
		const blueDot = canvas.getByTestId("blue-dot");
		const greenDot = canvas.getByTestId("green-dot");
		const yellowDot = canvas.getByTestId("yellow-dot");

		await expect(blueDot).toHaveClass("bg-blue-500");
		await expect(greenDot).toHaveClass("bg-green-500");
		await expect(yellowDot).toHaveClass("bg-yellow-500");
	},
};
