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
		<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
			<div className="relative bg-white rounded-lg shadow-lg max-w-md w-full m-4">
				<div className="flex items-center justify-between p-4 border-b">
					<h3 className="text-lg font-semibold text-gray-900">{title}</h3>
					<button
						className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
						onClick={onClose}
						type="button"
					>
						<Icon variant="cancel" />
					</button>
				</div>
				<div className="p-6 space-y-4">{children}</div>
				{footer && <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">{footer}</div>}
			</div>
		</div>
	);
}
