import React, { useState, type InputHTMLAttributes } from "react";
import {
	useController,
	type FieldPath,
	type FieldValues,
	type UseControllerProps,
} from "react-hook-form";

// export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
// 	classNameInput?: string;
// 	classNameError?: string;
// 	errorMessage?: string;
// }

export type InputNumberProps<
	TFieldValues extends FieldValues,
	TName extends FieldPath<TFieldValues>
> = {
	classNameInput?: string;
	classNameError?: string;
	errorMessage?: string;
} & InputHTMLAttributes<HTMLInputElement> &
	UseControllerProps<TFieldValues, TName>;

function InputV2<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(
	props: InputNumberProps<TFieldValues, TName> // or UseControllerProps<TFieldValues, TName> & InputNumberProps
) {
	const {
		type,
		errorMessage,
		classNameInput = "w-full border border-custom py-3 px-4 rounded-full font-14 outline-none",
		classNameError = "text-red-500 text-sm mt-1 pl-3",
		onChange,
		value = "",
		...rest
	} = props;

	const { field } = useController(props);

	const [localValue, setLocalValue] = useState<string>(field.value);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const valueInputForm = event.target.value;
		const numberCondition =
			(type === "number" && /^\d+$/.test(valueInputForm)) || valueInputForm === "";
		// đoạn này kiểm tra input truyền có phải number ko or "" và có onChange truyền vào
		if (numberCondition || type !== "number") {
			// cập nhật localValue state
			setLocalValue(valueInputForm);
			// Gọi field.onChange để cập nhật vào state React Hook Form
			field.onChange(event);
			// Thực thi onChange callback từ bên ngoài truyền vào props
			onChange && onChange(event);
		}
	};
	return (
		<div>
			<input
				className={classNameInput}
				{...rest}
				{...field}
				onChange={handleChange}
				value={value || localValue}
			/>
			{errorMessage && <span className={classNameError}>{errorMessage}</span>}
		</div>
	);
}

export default InputV2;
