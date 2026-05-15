import axios, { AxiosError } from "axios";
import HttpStatusCode from "../constants/httpStatus.enum";

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
	return axios.isAxiosError(error);
}

export function isUnprocessableEntityError<T>(error: unknown): error is AxiosError<T> {
	return (
		isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
	);
}

/** Format Number as Currency */

export function formatCurrency(currency: number) {
	return new Intl.NumberFormat("de-DE").format(currency);
}

// format number thành ký tự
export function formatCurrencyToSocialStyle(value: number) {
	return new Intl.NumberFormat("en", {
		maximumFractionDigits: 1,
		notation: "compact",
	})
		.format(value)
		.replace(".", ",")
		.toLowerCase();
}

// function tính giảm giá
export const rateSale = (orginial: number, sale: number) =>
	Math.round(((orginial - sale) / orginial) * 100) + "%";

// function xoá các ký tự đặc biệt
const removeSpecialCharacter = (str: string) =>
	// eslint-disable-next-line no-useless-escape
	str.replace(
		// eslint-disable-next-line no-useless-escape
		/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
		""
	);

// function nối name vs id lại tạo url trong productDetail
export const generateNameId = ({ name, id }: { name: string; id: string }) => {
	return removeSpecialCharacter(name).replace(/\s/g, "-") + `-i-${id}`;
};

// function lấy ra Id từ NameId
export const getIdFromNameId = (nameId: string) => {
	const arr = nameId.split("-i-");
	return arr[arr.length - 1];
};
