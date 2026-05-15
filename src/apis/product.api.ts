import type { Product, ProductList, ProductListConfig } from "../types/product.type";
import type { SusscessResponse } from "../types/utils.type";
import http from "../utils/http";

const URL = "products";

const productApi = {
	getProducts(params: ProductListConfig) {
		return http.get<SusscessResponse<ProductList>>(URL, { params });
	},

	getProductDetail(id: string) {
		return http.get<SusscessResponse<Product>>(`${URL}/${id}`);
	},
};

export default productApi;
