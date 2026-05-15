import type { Purchase, PurchaseListStatus } from "@/types/purchase.type";
import type { SusscessResponse } from "@/types/utils.type";
import http from "@/utils/http";

const URL = "purchases";

const purchasesAPI = {
	addToCart(body: { product_id: string; buy_count: number }) {
		return http.post<SusscessResponse<Purchase>>(`${URL}/add-to-cart`, body);
	},

	getPurchases(params: { status: PurchaseListStatus }) {
		return http.get<SusscessResponse<Purchase[]>>(URL, { params });
	},

	buyPurchases(body: { product_id: string; buy_count: number }[]) {
		return http.post<SusscessResponse<Purchase[]>>(`${URL}/buy-products`, body);
	},

	updatePurchase(body: { product_id: string; buy_count: number }) {
		return http.put<SusscessResponse<Purchase>>(`${URL}/buy-products`, body);
	},

	deletePurchase(purchaseIds: string[]) {
		return http.delete<SusscessResponse<{ deleted_count: number }>>(`${URL}`, {
			data: purchaseIds,
		});
	},
};

export default purchasesAPI;
