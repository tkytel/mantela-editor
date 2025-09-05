type CheckboxFieldProps = {
	id: string;
	label: string;
	description?: string;
	checked: boolean;
	onChange?: (checked: boolean) => void;
};

export function CheckboxField({ id, label, description, checked, onChange }: CheckboxFieldProps) {
	return (
		<div className="flex mb-3">
			<div className="flex items-center h-5">
				<input
					id={id}
					aria-describedby={description ? `${id}-text` : undefined}
					type="checkbox"
					checked={checked}
					onChange={(e) => {
						onChange?.(e.target.checked);
					}}
					className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2"
				/>
			</div>
			<div className="ms-2 text-sm">
				<label htmlFor={id} className="font-medium text-gray-900">
					{label}
				</label>
				{description && (
					<p id={`${id}-text`} className="text-xs font-normal text-gray-500">
						{description}
					</p>
				)}
			</div>
		</div>
	);
}
