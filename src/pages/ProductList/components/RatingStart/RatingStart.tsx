import { createSearchParams, useNavigate } from "react-router-dom";
import path from "../../../../constants/path";
import type { QueryConfig } from "../../ProductList";

/**
 * rule RatingStart
 *
 * index 0 : có 5 cái màu vàng tương ứng từ indexStart 0 - 4 đều màu vàng
 * index 1 : có 4 cái màu vàng tương ứng từ indexStart 0 - 3 đều màu vàng
 * index 2 : có 3 cái màu vàng tương ứng từ indexStart 0 - 2 đều màu vàng
 * index 3 : có 2 cái màu vàng tương ứng từ indexStart 0 - 1 đều màu vàng
 * index 4 : có 1 cái màu vàng tương ứng từ indexStart 0 đều màu vàng
 */

interface Props {
	queryConfig: QueryConfig;
}

export default function RatingStart({ queryConfig }: Props) {
	const navigate = useNavigate();

	const handleFilterRating = (ratingFilter: number) => {
		navigate({
			pathname: path.productList,
			search: createSearchParams({
				...queryConfig,
				rating_filter: String(ratingFilter),
			}).toString(),
		});
	};

	return (
		<ul className=" py-4">
			<li>
				<div>
					{Array(5)
						.fill(0)
						.map((_, index) => (
							<div
								className="flex items-center text-sm"
								key={index}
								onClick={() => handleFilterRating(5 - index)}
							>
								{Array(5)
									.fill(0)
									.map((_, indexStart) => {
										if (indexStart < 5 - index) {
											return (
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width={24}
													height={24}
													viewBox="0 0 24 24"
													fill="none"
													stroke="#742cfe"
													strokeWidth="0.75"
													strokeLinecap="round"
													strokeLinejoin="round"
													className="lucide lucide-star-icon lucide-star fill-bgButton cursor-pointer"
													key={indexStart}
												>
													<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
												</svg>
											);
										}

										return (
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width={24}
												height={24}
												viewBox="0 0 24 24"
												fill="none"
												stroke="#742cfe"
												strokeWidth="0.75"
												strokeLinecap="round"
												strokeLinejoin="round"
												className="lucide lucide-star-icon lucide-star cursor-pointer"
												key={indexStart}
											>
												<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
											</svg>
										);
									})}

								{index !== 0 ? (
									<span className="pl-2 font-14 capitalize color-paragraph">Trở lên</span>
								) : (
									""
								)}
							</div>
						))}
				</div>
			</li>
		</ul>
	);
}
