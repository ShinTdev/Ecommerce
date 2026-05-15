import type { Product } from "./product.type";

export type PurchaseSatus = -1 | 1 | 2 | 3 | 4 | 5;

export type PurchaseListStatus = PurchaseSatus | 0;

export interface Purchase {
	_id: string;
	buy_count: number;
	price: number;
	price_before_discount: number;
	status: PurchaseSatus;
	user: string;
	product: Product;
	createdAt: string;
	updatedAt: string;
}
