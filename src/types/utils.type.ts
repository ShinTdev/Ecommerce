import type { NonUndefined } from "react-hook-form";

export interface SusscessResponse<Data> {
	message: string;
	data: Data;
}

export interface ErrorResponse<Data> {
	message: string;
	data?: Data;
}

// cú pháp `-?` sẽ loại bỏ undefined key optinal
export type NoUndefinedField<T> = {
	[P in keyof T]-?: NonUndefined<NonNullable<T[P]>>;
};
