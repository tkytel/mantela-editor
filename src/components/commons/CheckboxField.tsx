type CheckboxFieldProps = {
	checked: boolean;
	description?: string;
	id: string;
	label: string;
	onChange?: (checked: boolean) => void;
};

export function CheckboxField({ checked, description, id, label, onChange }: CheckboxFieldProps) {
	return (
		<div aria-labelledby={`${id}-label`} className="mb-3 flex" role="group">
			<div className="flex h-5 items-center">
				<input
					aria-describedby={description ? `${id}-text` : undefined}
					checked={checked}
					className="h-4 w-4 rounded-xs border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:focus:ring-blue-600"
					id={id}
					onChange={(e) => {
						onChange?.(e.target.checked);
					}}
					type="checkbox"
				/>
			</div>
			<div className="ms-2 text-sm">
				<label className="font-medium text-gray-900 dark:text-gray-100" htmlFor={id} id={`${id}-label`}>
					{label}
				</label>
				{description && (
					<p className="text-xs font-normal text-gray-500 dark:text-gray-400" id={`${id}-text`} role="note">
						{description}
					</p>
				)}
			</div>
		</div>
	);
}
