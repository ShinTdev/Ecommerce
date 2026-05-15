import productApi from "@/apis/product.api";
import ProductRating from "@/components/ProductRating";
import {
	formatCurrency,
	formatCurrencyToSocialStyle,
	getIdFromNameId,
	rateSale,
} from "@/utils/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Product as ProductType, ProductListConfig } from "@/types/product.type";
import Product from "../ProductList/components/Product";
import QuantityController from "@/components/QuantityController";
import purchasesAPI from "@/apis/purchase.api";
import { purchasesStatus } from "@/constants/purchase";
import { toast } from "react-toastify";

export default function ProductDetail() {
	const [buyCount, setBuyCount] = useState(1);

	const { nameId } = useParams();
	const id = getIdFromNameId(nameId as string);

	const { data: productDetail } = useQuery({
		queryKey: ["productDetail", id],
		queryFn: () => {
			return productApi.getProductDetail(id as string);
		},
	});

	// xử lý images
	const [currentIndexImage, setCurrentIndexImage] = useState([0, 5]);
	const [activeImage, setActiveImage] = useState("");
	const imageRef = useRef<HTMLImageElement>(null);

	const product = productDetail?.data.data;

	const currentImages = useMemo(
		() => (product ? product.images.slice(...currentIndexImage) : []),
		[product, currentIndexImage]
	);

	useEffect(() => {
		if (product && product.images.length > 0) {
			setActiveImage(product.images[0]);
		}
	}, [product]);

	const next = () => {
		if (currentIndexImage[1] < (product as ProductType).images.length) {
			setCurrentIndexImage([currentIndexImage[0] + 1, currentIndexImage[1] + 1]);
		}
	};

	const prev = () => {
		if (currentIndexImage[0] > 0) {
			setCurrentIndexImage([currentIndexImage[0] - 1, currentIndexImage[1] - 1]);
		}
	};

	const chooseActive = (img: string) => {
		setActiveImage(img);
	};

	const handleZoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		// lấy thông số thẻ div
		const rect = event.currentTarget.getBoundingClientRect();
		// lấy ra width, height mặc định của ảnh
		const image = imageRef.current as HTMLImageElement;
		const { naturalHeight, naturalWidth } = image;
		// Cách 1: Lấy offsetX và offsetY khi chúng ta xử lý được bubble event
		const { offsetX, offsetY } = event.nativeEvent;
		const top = offsetY * (1 - naturalHeight / rect.height);
		const left = offsetX * (1 - naturalWidth / rect.width);

		// Cách 2: lấy offsetX và offsetY khi chúng ta ko xử lý được bubble event
		// const offsetX = event.pageX - (rect.x + window.scrollX);
		// const offsetY = event.pageY - (rect.y + window.scrollY);

		// style vào image
		image.style.height = naturalHeight + "px";
		image.style.width = naturalWidth + "px";
		image.style.maxWidth = "unset";
		image.style.top = top + "px";
		image.style.left = left + "px";
	};

	const handleRemoveZoom = () => {
		imageRef.current?.removeAttribute("style");
	};

	// xử lý sản phẩm tương tự
	const queryConfig: ProductListConfig = {
		limit: "20",
		page: "1",
		category: product?.category._id,
	};

	const { data: productData } = useQuery({
		queryKey: ["products", queryConfig],
		queryFn: () => {
			return productApi.getProducts(queryConfig);
		},
		enabled: Boolean(product), // khi có product thì query ni mới chạy
		staleTime: 3 * 60 * 1000,
	});

	const addToCartMutation = useMutation({
		mutationFn: purchasesAPI.addToCart,
	});

	const handleBuyCount = (value: number) => {
		setBuyCount(value);
	};

	const queryClient = useQueryClient();

	const addToCart = () => {
		addToCartMutation.mutate(
			{ product_id: product?._id as string, buy_count: buyCount },
			{
				onSuccess: (data) => {
					toast.success(data.data.message, {
						autoClose: 1000,
					});
					queryClient.invalidateQueries({
						queryKey: ["purchases", { status: purchasesStatus.inCart }],
					});
				},
			}
		);
	};

	if (!product) return null;
	return (
		<div className=" bg-gray-50 rounded-2xl overflow-hidden">
			<div className="px-4 py-6">
				<div className="grid grid-cols-12 bg-white/80 gap-9 rounded-lg pb-6">
					<div className="col-span-5">
						<div
							className="relative pt-[100%] w-full shadow overflow-hidden rounded-lg cursor-zoom-in"
							onMouseMove={handleZoom}
							onMouseLeave={handleRemoveZoom}
						>
							<img
								src={activeImage}
								alt={product.name}
								className="absolute left-0 top-0 h-full w-full object-cover shadow pointer-events-none"
								ref={imageRef}
							/>
						</div>
						<div className="grid grid-cols-5 gap-2 py-4 relative overflow-hidden">
							<button
								className="absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer text-gray-300 z-10 "
								onClick={prev}
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
									className="lucide lucide-chevron-left-icon lucide-chevron-left"
								>
									<path d="m15 18-6-6 6-6" />
								</svg>
							</button>
							{currentImages.map((image, index) => {
								const isActive = activeImage === image;
								return (
									<div
										className="relative pt-[100%] w-full shadow rounded-lg overflow-hidden cursor-pointer"
										key={index}
										onMouseMove={() => chooseActive(image)}
									>
										<img
											src={image}
											alt=""
											className="absolute left-0 top-0 h-full w-full object-cover rounded-lg border border-gray-100"
										/>
										{isActive ? (
											<div className="absolute inset-0 border-2 border-bgButton rounded-lg"></div>
										) : (
											""
										)}
									</div>
								);
							})}

							<button
								className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer text-gray-300 z-10 "
								onClick={next}
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
							</button>
						</div>
					</div>
					<div className="col-span-7">
						<h1 className="font-38 font-bold mt-2">{product.name}</h1>

						<div className="flex items-center justify-start mt-6">
							<div className="flex items-center">
								<span className="text-bgButton mr-2">{product.rating}</span>
								<ProductRating rating={product.rating} />
							</div>

							<div className="text-gray-300 mx-3 border border-r-1 h-6"></div>

							<div className="text-sm ">
								<span>{formatCurrencyToSocialStyle(product.sold)}</span>
								<span className="ml-1">Đã bán</span>
							</div>
						</div>

						<div className="mt-5 flex items-center">
							<div className="text-PurpleText font-28 font-bold">
								<span className="">$</span>
								<span>{formatCurrency(product.price)}</span>
							</div>
							<div className="text-gray-300 font-24 line-through ml-3">
								<span className="">$</span>
								<span>{formatCurrency(product.price_before_discount)}</span>
							</div>
							<div className="bg-bgButton text-xs text-white border rounded-md px-2 py-1 capitalize ml-3">
								{rateSale(product.price_before_discount, product.price)} Giảm
							</div>
						</div>

						<div className="mt-5">
							<div className="text-md">Số Lượng</div>
							<QuantityController
								onIncrease={handleBuyCount}
								onDecrease={handleBuyCount}
								onType={handleBuyCount}
								max={product.quantity}
								value={buyCount}
							/>
						</div>

						<div className="flex items-center mt-6">
							<button
								onClick={addToCart}
								className="px-5 py-3 bg-bgButton/10 text-bgButton capitalize border border-custom rounded-md cursor-pointer flex items-center gap-2 text-md hover:bg-bgButton hover:text-white"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width={20}
									height={20}
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth={2}
									strokeLinecap="round"
									strokeLinejoin="round"
									className="lucide lucide-shopping-bag-icon lucide-shopping-bag"
								>
									<path d="M16 10a4 4 0 0 1-8 0" />
									<path d="M3.103 6.034h17.794" />
									<path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" />
								</svg>
								Thêm Vào Giỏ Hàng
							</button>

							<button className="px-5 py-3 bg-bgButton text-md text-white capitalize border border-custom rounded-md ml-4 cursor-pointer hover:bg-black hover:border-black">
								Mua Ngay
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="py-6 px-4 ">
				<div className=" bg-white/80 p-4 capitalize text-lg text-slate-700 rounded-lg font-24 font-medium">
					Mô Tả Sản Phẩm
				</div>
				<div className="p-4 mt-2 mb-4 text-sm leading-loose bg-white/80 rounded-lg">
					<div
						dangerouslySetInnerHTML={{
							__html: DOMPurify.sanitize(product.description),
						}}
					/>
				</div>
			</div>

			<div className="py-6 px-4">
				<div className=" bg-white/80 p-4 capitalize font-28 font-bold rounded-lg text-center text-primary">
					Bạn cũng có thể thích
				</div>
				<div className="p-4 mt-2 mb-4 text-sm leading-loose bg-white/80 rounded-lg">
					{productData && (
						<div className="mt-6 grid grid-cols-5 gap-3">
							{productData.data.data.products.map((product) => (
								<div className="col-span-1" key={product._id}>
									<Product product={product} />
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
