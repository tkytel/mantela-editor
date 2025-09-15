type CheckboxFieldProps = {
	checked: boolean;
	description?: string;
	id: string;
	label: string;
	onChange?: (checked: boolean) => void;
};

export function CheckboxField({ checked, description, id, label, onChange }: CheckboxFieldProps) {
	return (
		<div className="flex mb-3">
			<div className="flex items-center h-5">
				<input
					aria-describedby={description ? `${id}-text` : undefined}
					checked={checked}
					className="w-4 h-4 text-blue-600 bg-gray-100 dark:bg-gray-600 border-gray-300 dark:border-gray-500 rounded-sm focus:ring-blue-500 focus:ring-2 dark:focus:ring-blue-600"
					id={id}
					onChange={(e) => {
						onChange?.(e.target.checked);
					}}
					type="checkbox"
				/>
			</div>
			<div className="ms-2 text-sm">
				<label className="font-medium text-gray-900 dark:text-gray-100" htmlFor={id}>
					{label}
				</label>
				{description && (
					<p className="text-xs font-normal text-gray-500 dark:text-gray-400" id={`${id}-text`}>
						{description}
					</p>
				)}
			</div>
		</div>
	);
}
