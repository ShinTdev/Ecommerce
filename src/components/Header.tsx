import logo from "@/assets/images/logo.avif";
import { ShoppingCart, Search, Heart, Trash2 } from "lucide-react";
import { TextSearch, UserCog } from "lucide-react";

import Popover from "./Popover";
import authApi from "../apis/auth.api";
import { useContext } from "react";
import { AppContext } from "../contexts/app.context";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createSearchParams, Link, useNavigate } from "react-router-dom";
import path from "../constants/path";
import useQueryConfig from "@/hooks/useQueryConfig";
import { useForm } from "react-hook-form";
import { schema, type Schema } from "@/schema/auth.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { omit } from "lodash";
import { purchasesStatus } from "@/constants/purchase";
import purchasesAPI from "@/apis/purchase.api";
import { formatCurrency } from "@/utils/utils";
import noproduct from "../assets/images/emtyCart.png";
import { queryClient } from "@/main";

type FormData = Pick<Schema, "name">;

const nameSchema = schema.pick(["name"]);
const MAX_PURCHASE = 5;

export default function Header() {
	const queryConfig = useQueryConfig();
	const navigate = useNavigate();
	const { register, handleSubmit } = useForm<FormData>({
		defaultValues: {
			name: "",
		},
		resolver: yupResolver(nameSchema),
	});

	const { isAuthenticated, setIsAuthenticated, profile, setProfile } =
		useContext(AppContext);

	const mutaionLogout = useMutation({
		mutationFn: authApi.logoutAccount,
		onSuccess: () => {
			setIsAuthenticated(false);
			setProfile(null);
			queryClient.removeQueries({
				queryKey: ["purchases", { status: purchasesStatus.inCart }],
			});
		},
	});

	const handleLogout = () => {
		mutaionLogout.mutate();
	};

	// function tìm kiếm sản phẩm
	const onSubmitSearch = handleSubmit((data) => {
		const config = queryConfig.order
			? omit({ ...queryConfig, name: data.name }, ["order", "sort_by"])
			: { ...queryConfig, name: data.name };

		navigate({
			pathname: path.productList,
			search: createSearchParams(config).toString(),
		});
	});

	// Khi chúng ta chuyển trang thì Header chỉ bị re-render
	// Chứ ko bị umnount - mounting again
	// (Trừ trường hợp logout rồi nhảy sang RegisterLayout rồi nhảy vào lại)
	// Nên các query này sẽ ko bị inactive => ko bị gọi lại => ko cần thiết phải set stale: Infinity
	// inactive khi nào => khi ko có thằng nào subcribe đên query này nữa => inactive => bắt đầu tính thời gian nó bị xoá
	const { data: purchasesInCartData } = useQuery({
		queryKey: ["purchases", { status: purchasesStatus.inCart }],
		queryFn: () => purchasesAPI.getPurchases({ status: purchasesStatus.inCart }),
		enabled: isAuthenticated,
	});

	const purchasesInCart = purchasesInCartData?.data.data;

	return (
		<header className="my-container flex flex-row items-center py-4  mx-auto">
			<div className="w-1/4 ">
				<a href="/">
					<img src={logo} alt="Logo" />
				</a>
			</div>

			<ul className="px-4 flex flex-row w-1/2">
				<li className="py-3 mx-4 font-semibold">
					<a href="#">Home</a>
				</li>
				<li className="py-3 mx-4 font-semibold">
					<a href="#">Shop</a>
				</li>
				<li className="py-3 mx-4 font-semibold">
					<a href="#">Gown</a>
				</li>
				<li className="py-3 mx-4 font-semibold">
					<a href="#">Accessories</a>
				</li>
				<li className="py-3 mx-4 font-semibold">
					<a href="#">Blogs</a>
				</li>
			</ul>

			<div className="flex flex-row items-center w-1/4">
				<Popover
					className="relative max-w-[400px] flex flex-col items-start justify-items-start border-popover border-1 shadow-md rounded-xl overflow-hidden focus-visible:outline-none"
					renderPopover={
						<div className="rounded-2xl bg-white p-2 w-full">
							{purchasesInCart ? (
								<div>
									{purchasesInCart.slice(0, MAX_PURCHASE).map((purchase) => (
										<div
											className="flex items-center justify-center shrink-0 py-2 hover:bg-gray-50"
											key={purchase._id}
										>
											<img
												src={purchase.product.image}
												alt={purchase.product.name}
												className="w-20 h-20 object-contain rounded-md mr-2"
											/>

											<div className="flex-row items-start justify-between max-h-full grow min-w-0">
												<div className="flex items-start overflow-hidden  ">
													<span className="font-13 font-bold truncate w-full">
														{purchase.product.name}
													</span>
													<Trash2 className="w-4 h-4 object-cover cursor-pointer ml-2" />
												</div>
												<div className="text-right pt-6">
													<span className="text-p14 font-medium ">
														${formatCurrency(purchase.product.price)}
													</span>
												</div>
											</div>
										</div>
									))}
									<div className="flex items-center justify-between mt-4">
										<span className="text-sm color-paragraph capitalize">
											{purchasesInCart.length > MAX_PURCHASE
												? purchasesInCart.length - MAX_PURCHASE
												: ""}{" "}
											Thêm Hàng Vào Giỏ
										</span>
										<Link
											to={path.cart}
											className="px-4 py-2 bg-bgButton text-md text-white capitalize border border-custom rounded-md ml-4 cursor-pointer hover:bg-black hover:border-black"
										>
											Xem Giỏ Hàng
										</Link>
									</div>
								</div>
							) : (
								<div className="w-[300px] h-[300px] flex flex-col items-center justify-center ">
									<img src={noproduct} alt="no purchase" className="w-full" />
									<div className="mt-3 capitalize">Chưa có sản phẩm</div>
								</div>
							)}

							<div></div>
						</div>
					}
				>
					<div className="relative">
						<ShoppingCart />
						{purchasesInCart && (
							<div className="absolute top-[-8px] right-[-10px] bg-bgButton text-white text-xs rounded-full px-[7px] py-[1px] z-10">
								{purchasesInCart?.length}
							</div>
						)}
					</div>
				</Popover>

				<form className="relative mx-4" onSubmit={onSubmitSearch}>
					<input
						type="text"
						className="py-2 pl-4 pr-8 border-black-300 rounded-[50px] shadow-lg outline-0 text-md"
						placeholder="Search"
						{...register("name")}
					/>
					<Search className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer" />
				</form>

				<Heart />
				<Popover
					className="min-w-[200px] shadow-md rounded-xl py-2 border-popover border-1"
					renderPopover={
						<div>
							{isAuthenticated ? (
								<div className="w-full text-left px-3 py-1 focus-visible:outline-0 font-14 cursor-pointer flex items-center gap-2">
									<UserCog /> {profile?.email}
								</div>
							) : (
								<Link
									to={path.login}
									className="w-full text-left px-3 py-1 focus-visible:outline-0 font-14 cursor-pointer"
								>
									Log In
								</Link>
							)}
							<button className="w-full text-left px-3 py-1 font-14 cursor-pointer">
								Create Account
							</button>
							<button
								onClick={handleLogout}
								className="w-full text-left px-3 py-1 font-14 cursor-pointer"
							>
								Log Out
							</button>
						</div>
					}
				>
					<TextSearch className="ml-4 cursor-pointer" />
				</Popover>
			</div>
		</header>
	);
}
