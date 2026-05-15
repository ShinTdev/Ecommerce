import React, { type InputHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface Input extends InputHTMLAttributes<HTMLInputElement> {
	classNameInput?: string;
	classNameError?: string;
	errorMessage?: string;
	register?: UseFormRegisterReturn<string>;
}

export default function Input({
	errorMessage,
	name,
	register,
	classNameInput = "w-full border border-custom py-3 px-4 rounded-full font-14 outline-none",
	classNameError = "text-red-500 text-sm mt-1 pl-3",
	...rest
}: Input) {
	return (
		<div>
			<input id={name} className={classNameInput} {...register} {...rest} />
			{errorMessage && <span className={classNameError}>{errorMessage}</span>}
		</div>
	);
}
