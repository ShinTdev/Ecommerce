import React from "react";
import classNames from "classnames";
import { Link, createSearchParams } from "react-router-dom";
import type { QueryConfig } from "../../ProductList";
import path from "../../../../constants/path";

interface Props {
	queryConfig: QueryConfig;
	pageSize: number;
}

export default function Pagination({ queryConfig, pageSize }: Props) {
	const RANGE = 2;

	const page = Number(queryConfig.page);

	const renderPagination = () => {
		let dotAfter = false;
		let dotBefore = false;

		const renderDotAfter = (index: number) => {
			if (!dotAfter) {
				dotAfter = true;
				return (
					<span
						key={index}
						className="shadow bg-white text-bgButton border border-bgButton px-3 py-2 cursor-pointer rounded-sm"
					>
						...
					</span>
				);
			}
			return null;
		};

		const renderDotBefore = (index: number) => {
			if (!dotBefore) {
				dotBefore = true;
				return (
					<span
						key={index}
						className="shadow bg-white text-bgButton border border-bgButton px-3 py-2 cursor-pointer rounded-sm"
					>
						...
					</span>
				);
			}
			return null;
		};

		return Array(pageSize)
			.fill(0)
			.map((_, index) => {
				const pageNumber = index + 1;
				if (
					page <= RANGE * 2 + 1 &&
					pageNumber > page + RANGE &&
					pageNumber <= pageSize - RANGE + 1
				) {
					return renderDotAfter(index);
				} else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
					if (pageNumber > RANGE && pageNumber < page - RANGE) {
						return renderDotBefore(index);
					} else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
						return renderDotAfter(index);
					}
				} else if (
					page >= pageSize - RANGE * 2 &&
					pageNumber > RANGE &&
					pageNumber < page - RANGE
				) {
					return renderDotBefore(index);
				}
				return (
					<Link
						to={{
							pathname: path.productList,
							search: createSearchParams({
								...queryConfig,
								page: pageNumber.toString(),
							}).toString(),
						}}
						className={classNames(
							"shadow border border-bgButton  px-3 py-2 cursor-pointer rounded-sm hover:bg-bgButton/90 hover:text-white",
							{
								"bg-bgButton text-white": pageNumber === page,
								"bg-white text-bgButton": pageNumber !== page,
							}
						)}
						key={index}
					>
						{pageNumber}
					</Link>
				);
			});
	};

	return (
		<div className="flex items-center mt-10 gap-4 justify-center">
			{page === 1 ? (
				<span className="shadow cursor-not-allowed bg-white text-bgButton border border-bgButton px-3 py-2 rounded-sm">
					Prev
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
					className="shadow bg-white text-bgButton border border-bgButton px-3 py-2 cursor-pointer rounded-sm hover:bg-bgButton/90 hover:text-white"
				>
					Prev
				</Link>
			)}

			{renderPagination()}

			{page === pageSize ? (
				<span className="shadow bg-white cursor-not-allowed text-bgButton border border-bgButton px-3 py-2 w-auto  rounded-sm">
					Next
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
					className="shadow bg-white text-bgButton border border-bgButton px-3 py-2 w-auto cursor-pointer rounded-sm hover:bg-bgButton/90 hover:text-white"
				>
					Next
				</Link>
			)}
		</div>
	);
}
