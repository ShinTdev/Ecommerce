import React from "react";

export default function ProductRating({ rating }: { rating: number }) {
	const handleWidth = (order: number) => {
		if (order <= rating) {
			return "100%";
		}
		if (order > rating && order - rating < 1) {
			return (order - Math.floor(rating)) * 100 + "%";
		}
		return "0%";
	};
	return (
		<div className="flex items-center">
			{Array(5)
				.fill(0)
				.map((_, index) => (
					<div className="relative" key={index}>
						<div
							className="absolute top-0 left-0 h-full overflow-hidden"
							style={{ width: handleWidth(index + 1) }}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="#742cfe"
								stroke-width="0.75"
								stroke-linecap="round"
								stroke-linejoin="round"
								className="lucide lucide-star-icon lucide-star fill-PurpleText text-PrupleText-300 w-3 h-3"
							>
								<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
							</svg>
						</div>

						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="#742cfe"
							stroke-width="0.75"
							stroke-linecap="round"
							stroke-linejoin="round"
							className="lucide lucide-star-icon lucide-star fill-current text-gray-300 w-3 h-3"
						>
							<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
						</svg>
					</div>
				))}
		</div>
	);
}
