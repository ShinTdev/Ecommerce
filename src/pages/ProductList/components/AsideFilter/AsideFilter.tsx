import { PackageSearch, BadgeCheck, BadgeDollarSign, Grid2x2Check } from "lucide-react";
import { createSearchParams, Link, useNavigate } from "react-router-dom";
import type { Category } from "../../../../types/category.type";
import classNames from "classnames";
import InputNumber from "../../../../components/InputNumber";
import { Controller, useForm } from "react-hook-form";
import { schema, type Schema } from "../../../../schema/auth.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import type { NoUndefinedField } from "../../../../types/utils.type";
import RatingStart from "../RatingStart";
import { omit } from "lodash";
import path from "@/constants/path";
import Button from "@/components/Button";
import type { QueryConfig } from "@/hooks/useQueryConfig";
// import InputV2 from "@/components/InputV2";

interface Props {
	categories: Category[];
	queryConfig: QueryConfig;
}

type FormData = NoUndefinedField<Pick<Schema, "price_max" | "price_min">>;

const priceSchema = schema.pick(["price_min", "price_max"]);

export default function AsideFilter({ categories, queryConfig }: Props) {
	const { category } = queryConfig;
	const {
		control,
		// watch,
		handleSubmit,
		trigger,
		formState: { errors },
	} = useForm<FormData>({
		defaultValues: {
			price_max: "",
			price_min: "",
		},
		resolver: yupResolver(priceSchema),
	});

	const navigate = useNavigate();

	const handleSubmitForm = handleSubmit((data) => {
		navigate({
			pathname: path.productList,
			search: createSearchParams({
				...queryConfig,
				price_min: data.price_min,
				price_max: data.price_max,
			}).toString(),
		});
	});

	const handleRemoveAll = () => {
		navigate({
			pathname: path.productList,
			search: createSearchParams(
				omit(queryConfig, ["price_max", "price_min", "rating_filter", "category"])
			).toString(),
		});
	};

	return (
		<div className="px-4">
			<Link
				to={path.productList}
				className={classNames("flex items-center font-bold gap-2 capitalize", {
					"text-bgButton": !category,
				})}
			>
				<PackageSearch />
				Tất Cả Danh Mục
			</Link>
			<div className="bg-gray-300 h-[1px] my-4" />
			<ul>
				{categories.map((categoryItem) => {
					const isActive = categoryItem._id === category;
					return (
						<li
							key={categoryItem._id}
							className={classNames("py-2 pl-2 font-14 capitalize", {
								"text-bgButton font-bold": isActive,
								"color-paragraph": !isActive,
							})}
						>
							<Link
								to={{
									pathname: path.productList,
									search: createSearchParams({
										...queryConfig,
										category: categoryItem._id,
									}).toString(),
								}}
								className="relative px-3"
							>
								{isActive ? (
									<BadgeCheck className="h-4 w-4 absolute top-0 left-[-10px]" />
								) : (
									""
								)}
								{categoryItem.name}
							</Link>
						</li>
					);
				})}
			</ul>
			<div className="bg-gray-300 h-[1px] my-4" />
			<div className="font-bold text-primary flex items-center gap-2 capitalize">
				<BadgeDollarSign />
				Khoảng Giá
			</div>
			<form className="" onSubmit={handleSubmitForm}>
				<div className="flex items-center justify-center grow my-4">
					<Controller
						control={control}
						name="price_min"
						render={({ field }) => {
							return (
								<InputNumber
									type="text"
									classNameInput="px-2 py-3 border border-[#02224d80] rounded-[50px] font-14 w-full outline-none"
									placeholder="$ From"
									{...field}
									onChange={(event) => {
										field.onChange(event);
										trigger("price_max");
									}}
									classNameError="hidden"
								/>
							);
						}}
					/>

					{/* <InputV2
						control={control}
						name="price_min"
						type="number"
						classNameInput="px-2 py-3 border border-[#02224d80] rounded-[50px] font-14 w-full outline-none"
						placeholder="$ From"
						onChange={() => {
							trigger("price_max");
						}}
						classNameError="hidden"
					/> */}

					<div className="mx-2 shrink-0"> - </div>

					<Controller
						control={control}
						name="price_max"
						render={({ field }) => {
							return (
								<InputNumber
									type="text"
									classNameInput="px-2 py-3 border border-[#02224d80] rounded-[50px] font-14 w-full outline-none"
									placeholder="$ To"
									value={field.value}
									ref={field.ref}
									onChange={(event) => {
										field.onChange(event);
										trigger("price_min");
									}}
									classNameError="hidden"
								/>
							);
						}}
					/>
				</div>

				<div className="text-red-500 text-sm mt-1 pl-3 text-center">
					{errors.price_min?.message}
				</div>

				<Button className="w-full mt-4 bg-bgButton opacity-80 text-white text-white-200 px-8 py-2 rounded-full font-bold cursor-pointer">
					Áp Dụng
				</Button>
			</form>

			<div className="bg-gray-300 h-[1px] my-4" />
			<div className="font-bold text-primary flex items-center gap-2 capitalize">
				<Grid2x2Check />
				Đánh Giá
			</div>

			<RatingStart queryConfig={queryConfig} />
			<div className="bg-gray-300 h-[1px] my-4" />
			<Button
				onClick={handleRemoveAll}
				className="w-full bg-bgButton opacity-80 text-white text-white-200 px-8 py-2 rounded-full font-bold cursor-pointer"
			>
				Xoá Tất Cả
			</Button>
		</div>
	);
}
