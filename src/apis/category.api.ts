import type { Category } from "../types/category.type";
import type { SusscessResponse } from "../types/utils.type";
import http from "../utils/http";

const URL = "categories";

const categoryApi = {
	getCategory() {
		return http.get<SusscessResponse<Category[]>>(URL);
	},
};

export default categoryApi;
