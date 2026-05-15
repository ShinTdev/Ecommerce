import QuantityController from "@/components/QuantityController";
import { formatCurrency } from "@/utils/utils";
import { Trash2 } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function Cart() {
	return (
		<div className="mt-5">
			<div className="grid grid-cols-12 rounded-md bg-gray-50/50 px-8 py-5 shadow">
				<div className="col-span-6">
					<div className="flex items-center gap-2 ">
						<input type="checkbox" name="" id="" className="cursor-pointer h-4 w-4" />
						<span className="text-PurpleText font-md font-bold">Sản Phẩm</span>
					</div>
				</div>
				<div className="col-span-6">
					<div className="grid grid-cols-6 text-center">
						<div className="col-span-2 text-PurpleText font-md font-bold">Số Lượng</div>
						<div className="col-span-2 text-PurpleText font-md font-bold">Số Tiền</div>
						<div className="col-span-2 text-PurpleText font-md font-bold">Thao Tác</div>
					</div>
				</div>
			</div>
			<div className="mt-3 bg-gray-50/50 px-4 py-4 rounded-md shadow">
				<div className="grid grid-cols-12 rounded-md bg-gray-50/50 px-4 py-3 border border-gray-200">
					<div className="col-span-6">
						<div className="flex items-center gap-2">
							<input type="checkbox" name="" id="" className="cursor-pointer h-4 w-4" />
							<div className="flex items-start gap-2 max-w-[700px]">
								<Link
									to=""
									className="w-25 h-25 rounded-md shrink-0 object-cover overflow-hidden"
								>
									<img
										src="https://i.pinimg.com/474x/6a/38/be/6a38bea03a64096129aec3cd07b4ebf6.jpg"
										alt=""
										className="rounded-md w-full h-full"
									/>
								</Link>
								<span className="text-sm line-clamp-2">
									Điện Thoại Vsmart Active 3 6GB/64GB - Hàng Chính Hãng Điện Thoại Vsmart
									Active 3 6GB/64GB - Hàng Chính Hãng
								</span>
							</div>
						</div>
					</div>
					<div className="col-span-6">
						<div className="grid grid-cols-6 text-center">
							<div className="col-span-2">
								<QuantityController classNameWrapper="justify-center" />
							</div>
							<div className="col-span-2">
								<div className="text-PurpleText font-md font-medium">
									<span className="">$</span>
									<span>{formatCurrency(3190000)}</span>
								</div>
							</div>
							<div className="col-span-2 flex items-start justify-center">
								<Trash2 className="w-5 h-5 object-cover cursor-pointer " />
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-12 rounded-md bg-gray-50/50 px-8 py-5 shadow mt-3">
				<div className="col-span-6">
					<div className="flex items-center gap-2 ">
						<input type="checkbox" name="" id="" className="cursor-pointer h-4 w-4" />
						<span className="text-PurpleText font-md font-bold">Chọn Tất Cả</span>
						<span className="text-PurpleText font-md font-bold ml-3">Xoá</span>
					</div>
				</div>
				<div className="col-span-6 text-right">
					<div className="flex items-center justify-end">
						<div className="text-md">Tổng thanh toán (0 sản phẩm): </div>
						<div className="text-PurpleText font-md font-medium">
							<span className="">$</span>
							<span>{formatCurrency(3190000)}</span>
						</div>
					</div>
					<div className="flex items-center justify-end">
						<div className="text-xs">Tiết kiệm: </div>
						<div className="text-PurpleText font-xs font-medium">
							<span className="">$</span>
							<span>{formatCurrency(3190000)}</span>
						</div>
					</div>
					<button className="mt-3 max-w-[500px] ml-auto px-5 py-3 bg-bgButton text-md text-white capitalize border border-custom rounded-xl cursor-pointer hover:bg-black hover:border-black">
						Mua Hàng
					</button>
				</div>
			</div>
		</div>
	);
}
