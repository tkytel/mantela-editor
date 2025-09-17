import { type ReactNode } from "react";
import { Icon } from "./Icon";

type ModalProps = {
	children: ReactNode;
	footer?: ReactNode;
	isOpen: boolean;
	onClose?: () => void;
	title: ReactNode;
};

export function Modal({ children, footer, isOpen, onClose, title }: ModalProps) {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto bg-gray-500/50 dark:bg-gray-900/75">
			<div className="relative m-4 w-full max-w-md rounded-lg bg-white shadow-lg dark:bg-gray-800">
				<div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-600">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
					<button
						className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-gray-100"
						onClick={onClose}
						type="button"
					>
						<Icon variant="cancel" />
					</button>
				</div>
				<div className="space-y-4 p-6 text-gray-900 dark:text-gray-100">{children}</div>
				{footer && (
					<div className="flex items-center space-x-2 rounded-b border-t border-gray-200 p-6 dark:border-gray-600">
						{footer}
					</div>
				)}
			</div>
		</div>
	);
}
