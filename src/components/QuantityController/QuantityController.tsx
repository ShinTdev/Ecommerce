import React, { useState } from "react";
import InputNumber, { type InputNumberProps } from "../InputNumber";

interface Props extends InputNumberProps {
	max?: number;
	onIncrease?: (value: number) => void;
	onDecrease?: (value: number) => void;
	onType?: (value: number) => void;
	classNameWrapper?: string;
}

export default function QuantityController({
	max,
	onIncrease /** Tăng */,
	onDecrease /** Giảm */,
	onType /** thay onChange khỏi bị trùng */,
	classNameWrapper = "mt-3",
	value,
	...rest
}: Props) {
	const [localValue, setLocalValue] = useState<number>(Number(value || 1));

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		let _value = Number(event.target.value);
		if (max !== undefined && _value > max) {
			_value = max;
		} else if (_value < 1) {
			_value = 1;
		}

		onType && onType(_value);
		setLocalValue(_value);
	};

	const Increase = () => {
		let _value = Number(value || localValue) + 1;
		if (max !== undefined && _value > max) {
			_value = max;
		}

		onIncrease && onIncrease(_value);
		setLocalValue(_value);
	};

	const Decrease = () => {
		let _value = Number(value || localValue) - 1;
		if (_value < 1) {
			_value = 1;
		}

		onDecrease && onDecrease(_value);
		setLocalValue(_value);
	};

	return (
		<div className={"flex items-center " + classNameWrapper}>
			<button
				className="border border-custom rounded-tl-sm rounded-bl-sm p-2 h-[40px] font-18 cursor-pointer "
				onClick={Decrease}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={18}
					height={18}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth={2}
					strokeLinecap="round"
					strokeLinejoin="round"
					className="lucide lucide-minus-icon lucide-minus"
				>
					<path d="M5 12h14" />
				</svg>
			</button>
			<InputNumber
				classNameInput="border border-custom p-2 h-[40px] text-center w-[100px] rounded-0 mx-1 outline-none text-md"
				classNameError="hidden"
				value={value || localValue}
				onChange={handleChange}
				{...rest}
			/>
			<button
				className="border border-custom rounded-tr-sm rounded-br-sm p-2 h-[40px] font-18 cursor-pointer"
				onClick={Increase}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={18}
					height={18}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth={2}
					strokeLinecap="round"
					strokeLinejoin="round"
					className="lucide lucide-plus-icon lucide-plus"
				>
					<path d="M5 12h14" />
					<path d="M12 5v14" />
				</svg>
			</button>
		</div>
	);
}
