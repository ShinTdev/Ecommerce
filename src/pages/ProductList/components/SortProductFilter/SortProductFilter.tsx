import React from "react";
import { sortBy, order as orderConstants } from "../../../../constants/product";
import classNames from "classnames";
import { createSearchParams, Link, useNavigate } from "react-router-dom";
import { omit } from "lodash";
import type { QueryConfig } from "../../ProductList";
import path from "../../../../constants/path";
import type { ProductListConfig } from "../../../../types/product.type";

interface Props {
	queryConfig: QueryConfig;
	pageSize: number;
}

export default function SortProductFilter({ queryConfig, pageSize }: Props) {
	const page = Number(queryConfig.page);
	const { sort_by = sortBy.createdAt, order } = queryConfig;
	const navigate = useNavigate();

	const isActiveSortBy = (
		sortByValue: Exclude<ProductListConfig["sort_by"], undefined>
	) => {
		return sortByValue === sort_by;
	};

	const handleSort = (sortByValue: Exclude<ProductListConfig["sort_by"], undefined>) => {
		navigate({
			pathname: path.productList,
			search: createSearchParams(
				omit(
					{
						...queryConfig,
						sort_by: sortByValue,
					},
					["order"]
				)
			).toString(),
		});
	};

	const handlePriceOrder = (
		orderByValue: Exclude<ProductListConfig["order"], undefined>
	) => {
		navigate({
			pathname: path.productList,
			search: createSearchParams({
				...queryConfig,
				sort_by: sortBy.price,
				order: orderByValue,
			}).toString(),
		});
	};

	return (
		<div className="flex items-center justify-between py-0">
			<div className="flex items-center justify-start gap-3">
				<span>Sắp xếp theo</span>
				<button
					className={classNames(
						" border border-PurpleText px-5 h-10 rounded-full  cursor-pointer capitalize",
						{
							"bg-bgButton text-white text-white-200 font-bold": isActiveSortBy(
								sortBy.view
							),
							"bg-white text-bgButton hover:bg-bgButton/90 hover:text-white transition-all":
								!isActiveSortBy(sortBy.view),
						}
					)}
					onClick={() => handleSort(sortBy.view)}
				>
					Phổ biến
				</button>
				<button
					className={classNames(
						" border border-PurpleText px-5 h-10 rounded-full cursor-pointer capitalize",
						{
							"bg-bgButton text-white text-white-200 font-bold": isActiveSortBy(
								sortBy.createdAt
							),
							"bg-white text-bgButton hover:bg-bgButton/90 hover:text-white transition-all":
								!isActiveSortBy(sortBy.createdAt),
						}
					)}
					onClick={() => handleSort(sortBy.createdAt)}
				>
					Mới Nhất
				</button>
				<button
					className={classNames(
						" border border-PurpleText px-5 h-10 rounded-full cursor-pointer capitalize",
						{
							"bg-bgButton text-white text-white-200 font-bold": isActiveSortBy(
								sortBy.sold
							),
							"bg-white text-bgButton hover:bg-bgButton/90 hover:text-white transition-all":
								!isActiveSortBy(sortBy.sold),
						}
					)}
					onClick={() => handleSort(sortBy.sold)}
				>
					Bán chạy
				</button>

				<select
					className={classNames(
						" border border-bgButton px-5 h-10 rounded-full cursor-pointer capitalize outline-none ",
						{
							"bg-bgButton text-white text-white-200 font-bold": isActiveSortBy(
								sortBy.price
							),
							"bg-white text-bgButton hover:bg-bgButton/90 hover:text-white transition-all":
								!isActiveSortBy(sortBy.price),
						}
					)}
					onChange={(event) =>
						handlePriceOrder(
							event.target.value as Exclude<ProductListConfig["order"], undefined>
						)
					}
				>
					<option className="bg-white text-bgButton" value={order || ""} disabled>
						Giá
					</option>
					<option
						className="bg-white text-bgButton cursor-pointer"
						value={orderConstants.asc}
					>
						Giá: Thấp Đến Cao
					</option>
					<option
						className="bg-white text-bgButton cursor-pointer"
						value={orderConstants.desc}
					>
						Giá: Cao Đến Thấp
					</option>
				</select>
			</div>
			<div className="flex items-center">
				<div>
					<span className="text-bgButton">{page}</span>
					<span>/{pageSize}</span>
				</div>
				<div className="ml-2 flex">
					{page === 1 ? (
						<span className=" flex items-center justify-center shadow bg-white text-bgButton border border-bgButton px-1 h-10 rounded-tl-sm rounded-bl-sm cursor-not-allowed">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								className="lucide lucide-chevron-left-icon lucide-chevron-left"
							>
								<path d="m15 18-6-6 6-6" />
							</svg>
						</span>
					) : (
						<Link
							to={{
								pathname: path.productList,
								search: createSearchParams({
									...queryConfig,
									page: (page - 1).toString(),
								}).toString(),
							}}
							className=" flex items-center justify-center shadow bg-white text-bgButton border border-bgButton px-1 h-10 cursor-pointer rounded-tl-sm rounded-bl-sm"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								className="lucide lucide-chevron-left-icon lucide-chevron-left"
							>
								<path d="m15 18-6-6 6-6" />
							</svg>
						</Link>
					)}
					{page === pageSize ? (
						<span className="flex items-center justify-center shadow bg-white text-bgButton border border-bgButton px-1 h-10 cursor-not-allowed rounded-tr-sm rounded-br-sm ml-0.5">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width={24}
								height={24}
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth={2}
								strokeLinecap="round"
								strokeLinejoin="round"
								className="lucide lucide-chevron-right-icon lucide-chevron-right"
							>
								<path d="m9 18 6-6-6-6" />
							</svg>
						</span>
					) : (
						<Link
							to={{
								pathname: path.productList,
								search: createSearchParams({
									...queryConfig,
									page: (page + 1).toString(),
								}).toString(),
							}}
							className="flex items-center justify-center shadow bg-white text-bgButton border border-bgButton px-1 h-10 cursor-pointer rounded-tr-sm rounded-br-sm ml-0.5"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width={24}
								height={24}
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth={2}
								strokeLinecap="round"
								strokeLinejoin="round"
								className="lucide lucide-chevron-right-icon lucide-chevron-right"
							>
								<path d="m9 18 6-6-6-6" />
							</svg>
						</Link>
					)}
				</div>
			</div>
		</div>
	);
}
