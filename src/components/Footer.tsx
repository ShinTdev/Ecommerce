import React from "react";
import { MapPinHouse, Phone, Mail } from "lucide-react";

export default function Footer() {
	return (
		<footer className="mt-15 bg-grayBg text-grayText ">
			<div className="w-primary mx-auto">
				<section className=" flex align-center py-p50 border-b border-line">
					<h3 className="text-p30 font-bold text-primary">Sign Up For Newsletter</h3>
					<div className="flex align-center justify-center">
						<input
							type="text"
							placeholder="Email"
							className="py-2 px-3 w-w480 rounded-full shadow-input ml-m50 mr-m30 outline-0 text-p14 bg-white"
						/>
						<button className="bg-bgButton text-white text-p20 px-8 py-2 rounded-full font-bold">
							Subscribe
						</button>
					</div>
					<div>
						<img src="" alt="" />
					</div>
				</section>

				<section className="py-p60 grid grid-cols-5 gap-4 ">
					<div className=" ">
						<h5 className="text-p28 text-primary font-bold mb-m20">About Us</h5>
						<p className="inline-block ">
							Whether you're looking for the latest trends, everyday essentials, or unique
							finds, our carefully curated selection is designed to meet your needs.
						</p>
					</div>
					<div>
						<h5 className="text-p28 text-primary font-bold mb-m20">Extra</h5>
						<ul>
							<li className="text-grayText leading-lh-35 cursor-pointer hover:text-bgButton">
								<a href="">Search</a>
							</li>
							<li className="text-grayText leading-lh-35 cursor-pointer hover:text-bgButton">
								<a href="">News</a>
							</li>
							<li className="text-grayText leading-lh-35 cursor-pointer hover:text-bgButton">
								<a href="">All Shop</a>
							</li>
							<li className="text-grayText leading-lh-35 cursor-pointer hover:text-bgButton">
								<a href="">All products</a>
							</li>
						</ul>
					</div>
					<div>
						<h5 className="text-p28 text-primary font-bold mb-m20">Services</h5>
						<ul>
							<li className="text-grayText leading-lh-35 cursor-pointer hover:text-bgButton">
								<a href="">About Us</a>
							</li>
							<li className="text-grayText leading-lh-35 cursor-pointer hover:text-bgButton">
								<a href="">Contact us</a>
							</li>
							<li className="text-grayText leading-lh-35 cursor-pointer hover:text-bgButton">
								<a href="">Shipping</a>
							</li>
							<li className="text-grayText leading-lh-35 cursor-pointer hover:text-bgButton">
								<a href="">Privacy Policy</a>
							</li>
							<li className="text-grayText leading-lh-35 cursor-pointer hover:text-bgButton">
								<a href="">Terms & Conditions</a>
							</li>
						</ul>
					</div>
					<div>
						<h5 className="text-p28 text-primary font-bold mb-m20">Products</h5>
						<ul>
							<li className="text-grayText leading-lh-35 cursor-pointer hover:text-bgButton">
								<a href="">Our Products</a>
							</li>
							<li className="text-grayText leading-lh-35 cursor-pointer hover:text-bgButton">
								<a href="">Classic Fashion</a>
							</li>
							<li className="text-grayText leading-lh-35 cursor-pointer hover:text-bgButton">
								<a href="">Empire western</a>
							</li>
							<li className="text-grayText leading-lh-35 cursor-pointer hover:text-bgButton">
								<a href="">Squaw dress</a>
							</li>
						</ul>
					</div>
					<div>
						<h5 className="text-p28 text-primary font-bold mb-m20">Contact Us</h5>
						<ul>
							<li className="text-grayText leading-lh-35 cursor-pointer flex items-center ">
								<MapPinHouse className="text-bgButton mr-2" />
								4800 San Mateo Ln NE
							</li>
							<li className="text-grayText leading-lh-35 cursor-pointer flex items-center">
								<Phone className="text-bgButton mr-2" />
								(505) 881-0080
							</li>
							<li className="text-grayText leading-lh-35 cursor-pointer flex items-center ">
								<Mail className="text-bgButton mr-2" />
								kidhippo@email.com
							</li>
						</ul>
					</div>
				</section>
			</div>
		</footer>
	);
}
