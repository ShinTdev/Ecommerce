import React from "react";
import { Link } from "react-router-dom";
import type { Product as ProductType } from "@/types/product.type";
import ProductRating from "@/components/ProductRating";
import {
	formatCurrency,
	formatCurrencyToSocialStyle,
	generateNameId,
} from "@/utils/utils";
import path from "@/constants/path";

interface ProductProp {
	product: ProductType;
}

export default function Product({ product }: ProductProp) {
	return (
		<Link
			to={`${path.productList}${generateNameId({ name: product.name, id: product._id })}`}
			className="bg-white shadow rounded-sm hover:translate-y-[-0.04rem] hover:shadow-md duration-100 transition-transform overflow-hidden block"
		>
			<div className="w-full pt-[100%] relative">
				<img
					src={product.image}
					alt={product.name}
					className="absolute top-0 left-0 bg-white w-full h-full object-cover "
				/>
			</div>
			<div className="p-2 overflow-hidden">
				<h4 className="text-sm min-h-[1.75rem] line-clamp-2">{product.name}</h4>
				<div className="mt-2 flex items-center">
					<div className="text-gray-300 text-sm line-through">
						<span className="text-xs">$</span>
						<span>{formatCurrency(product.price_before_discount)}</span>
					</div>
					<div className="text-PurpleText text-sm ml-2">
						<span className="text-xs">$</span>
						<span>{formatCurrency(product.price)}</span>
					</div>
				</div>

				<div className="mt-3 flex items-center">
					<ProductRating rating={product.rating} />
					<div className="ml-2 text-sm">
						<span>{formatCurrencyToSocialStyle(product.sold)}</span>
						<span className="ml-1">Đã bán</span>
					</div>
				</div>
			</div>
		</Link>
	);
}
