import { Icon } from "./Icon";

type DeleteButtonProps = {
	onDelete?: () => void;
};

export function DeleteButton({ onDelete }: DeleteButtonProps) {
	return (
		<button
			className="absolute top-2 right-2 me-2 mb-2 rounded-lg border border-gray-200 bg-white p-1 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-3 focus:ring-gray-100 focus:outline-hidden dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 dark:hover:text-blue-400 dark:focus:ring-gray-700"
			onClick={onDelete}
			type="button"
		>
			<Icon variant="delete" />
		</button>
	);
}
