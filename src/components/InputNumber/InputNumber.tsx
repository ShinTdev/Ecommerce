import React, { forwardRef, useState, type InputHTMLAttributes } from "react";

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
	classNameInput?: string;
	classNameError?: string;
	errorMessage?: string;
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumber(
	{
		errorMessage,
		classNameInput = "w-full border border-custom py-3 px-4 rounded-full font-14 outline-none",
		classNameError = "text-red-500 text-sm mt-1 pl-3",
		onChange,
		value = "",
		...rest
	},
	ref
) {
	const [localValue, setLocalValue] = useState<string>(value as string);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		// đoạn này kiểm tra input truyền có phải number ko or "" và có onChange truyền vào
		if (/^\d+$/.test(value) || value === "") {
			// Thực thi onChange callback từ bên ngoài truyền vào props
			onChange && onChange(event);
			// cập nhật localValue state
			setLocalValue(value);
		}
	};
	return (
		<div>
			<input
				className={classNameInput}
				onChange={handleChange}
				{...rest}
				ref={ref}
				value={value || localValue}
			/>
			{errorMessage && <span className={classNameError}>{errorMessage}</span>}
		</div>
	);
});

export default InputNumber;
