import AsideFilter from "./components/AsideFilter";
import SortProductFilter from "./components/SortProductFilter";
import Product from "./components/Product/Product";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import productApi from "../../apis/product.api";
import Pagination from "./components/Pagination";
import categoryApi from "../../apis/category.api";
import useQueryConfig from "@/hooks/useQueryConfig";
import type { ProductListConfig } from "@/types/product.type";

// export type QueryConfig = {
// 	[key in keyof ProductListConfig]: string;
// };

export default function ProductList() {
	// const queryParams: QueryConfig = useQueryParams();
	// const queryConfig: QueryConfig = omitBy(
	// 	{
	// 		page: queryParams.page || "1",
	// 		exclude: queryParams.exclude,
	// 		limit: queryParams.limit || "20",
	// 		name: queryParams.name,
	// 		order: queryParams.order,
	// 		price_max: queryParams.price_max,
	// 		price_min: queryParams.price_min,
	// 		rating_filter: queryParams.rating_filter,
	// 		sort_by: queryParams.sort_by,
	// 		category: queryParams.category,
	// 	},
	// 	isUndefined
	// );

	const queryConfig = useQueryConfig();

	const { data: productData } = useQuery({
		queryKey: ["products", queryConfig],
		queryFn: () => {
			return productApi.getProducts(queryConfig as ProductListConfig);
		},
		placeholderData: keepPreviousData,
		staleTime: 3 * 60 * 1000,
	});

	const { data: categoriesData } = useQuery({
		queryKey: ["categories"],
		queryFn: () => {
			return categoryApi.getCategory();
		},
	});

	return (
		<div className="py-6">
			<div className="container">
				<h2 className="font-48 font-bold text-center mb-6">Classic Fashion</h2>
				<p className="text-center font-14 color-paragraph ">
					At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
					praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias
					excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui
					officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem
					rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis
					est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere
					possimus, omnis voluptas assumenda est, omnis dolor repellendus.
				</p>
				{productData && (
					<div className="grid grid-cols-12 gap-6 mt-10">
						<div className="col-span-3">
							<AsideFilter
								categories={categoriesData?.data.data || []}
								queryConfig={queryConfig}
							/>
						</div>
						<div className="col-span-9">
							<SortProductFilter
								queryConfig={queryConfig}
								pageSize={productData.data.data.pagination.page_size}
							/>
							<div className="mt-6 grid grid-cols-4 gap-3">
								{productData.data.data.products.map((product) => (
									<div className="col-span-1" key={product._id}>
										<Product product={product} />
									</div>
								))}
							</div>
							<Pagination
								queryConfig={queryConfig}
								pageSize={productData.data.data.pagination.page_size}
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
