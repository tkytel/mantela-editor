import { Icon } from "./Icon";

type DeleteButtonProps = {
	onDelete?: () => void;
};

export function DeleteButton({ onDelete }: DeleteButtonProps) {
	return (
		<button
			className="absolute right-2 top-2 p-1 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:text-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-blue-400 dark:focus:ring-gray-700"
			onClick={onDelete}
			type="button"
		>
			<Icon variant="delete" />
		</button>
	);
}
