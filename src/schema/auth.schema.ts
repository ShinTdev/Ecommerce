import * as yup from "yup";

function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
	const { price_min, price_max } = this.parent as {
		price_min: string;
		price_max: string;
	};
	if (price_min !== "" && price_max !== "") {
		return Number(price_max) >= Number(price_min);
	}

	return price_min !== "" || price_max !== "";
}

export const schema = yup.object({
	email: yup
		.string()
		.email("Invalid email")
		.required("Email is required")
		.min(5, "Độ dài từ 5 - 160 ký tự")
		.max(160, "Độ dài từ 5 - 160 ký tự"),
	password: yup
		.string()
		.min(6, "At least 6 characters")
		.max(160, "Độ dài từ 6 - 160 ký tự")
		.required("Password is required"),
	confirm_password: yup
		.string()
		.required("Nhập lại password là bắt buộc")
		.min(6, "Độ dài từ 6 - 160 ký tự")
		.max(160, "Độ dài từ 6 - 160 ký tự")
		.oneOf([yup.ref("password")], "Nhập lại password không khớp"),

	price_min: yup.string().default("").defined().test({
		name: "price-not-allowed",
		message: "Giá không phù hợp",
		test: testPriceMinMax,
	}),
	price_max: yup.string().default("").defined().test({
		name: "price-not-allowed",
		message: "Giá không phù hợp",
		test: testPriceMinMax,
	}),
	name: yup.string().trim().required(""),
});

export type Schema = yup.InferType<typeof schema>;

/**
 *  .defined()
 *   Nói với TypeScript: “Field này luôn tồn tại, không bao giờ là undefined”
 */
