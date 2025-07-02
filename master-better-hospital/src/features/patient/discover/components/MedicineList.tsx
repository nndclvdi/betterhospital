"use client";

import Link from "next/link";
import React from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

export default function MedicineList() {
	return (
		<div
			id="Meds-Vits"
			className="flex flex-col w-full py-5 gap-4 bg-white mt-5 mb-5"
		>
			<div className="flex items-center justify-between px-5">
				<div className="flex flex-col gap-1">
					<h2 className="font-bold text-lg">Medicine & Vitamins</h2>
					<p className="font-semibold text-sm text-monday-gray leading-none">
						Stay Healty Everyday
					</p>
				</div>
				<Link
					href="#"
					className="rounded-full border border-monday-stroke py-3 px-4 font-bold text-xs leading-none text-monday-gray"
				>
					VIEW ALL
				</Link>
			</div>
			<div className="swiper w-full">
				<Swiper
					direction="horizontal"
					slidesOffsetAfter={20}
					slidesOffsetBefore={20}
					spaceBetween={20}
					slidesPerView={"auto"}
					className="swiper-wrapper w-full"
				>
					<SwiperSlide className="swiper-slide !w-fit">
						<Link href="#" className="card">
							<div className="flex flex-col rounded-2xl overflow-hidden border border-monday-stroke w-[220px] shrink-0">
								<div className="relative flex w-full h-[180px] bg-monday-background overflow-hidden">
									<img
										src="/assets/images/thumbnails/product-1.png"
										className="size-full object-cover"
										alt="phot"
									/>
								</div>
								<div className="flex flex-col gap-2 py-5 px-4 bg-white">
									<p className="font-semibold w-[188px] overflow-hidden truncate">
										Tolak Angin Flu 1 Box
									</p>
									<div className="flex items-center gap-1 text-nowrap">
										<img
											src="/assets/images/icons/shop-grey.svg"
											className="flex size-5 shrink-0"
											alt="icon"
										/>
										<p className="font-semibold text-monday-gray leading-none">
											Bimore Pharmacy
										</p>
									</div>
								</div>
							</div>
						</Link>
					</SwiperSlide>
					<SwiperSlide className="swiper-slide !w-fit">
						<Link href="#" className="card">
							<div className="flex flex-col rounded-2xl overflow-hidden border border-monday-stroke w-[220px] shrink-0">
								<div className="relative flex w-full h-[180px] bg-monday-background overflow-hidden">
									<img
										src="/assets/images/thumbnails/product-2.png"
										className="size-full object-cover"
										alt="phot"
									/>
								</div>
								<div className="flex flex-col gap-2 py-5 px-4 bg-white">
									<p className="font-semibold w-[188px] overflow-hidden truncate">
										Tolak Angin Batuk 1 Box
									</p>
									<div className="flex items-center gap-1 text-nowrap">
										<img
											src="/assets/images/icons/shop-grey.svg"
											className="flex size-5 shrink-0"
											alt="icon"
										/>
										<p className="font-semibold text-monday-gray leading-none">
											Bimore Pharmacy
										</p>
									</div>
								</div>
							</div>
						</Link>
					</SwiperSlide>
					<SwiperSlide className="swiper-slide !w-fit">
						<Link href="#" className="card">
							<div className="flex flex-col rounded-2xl overflow-hidden border border-monday-stroke w-[220px] shrink-0">
								<div className="relative flex w-full h-[180px] bg-monday-background overflow-hidden">
									<img
										src="/assets/images/thumbnails/product-1.png"
										className="size-full object-cover"
										alt="phot"
									/>
								</div>
								<div className="flex flex-col gap-2 py-5 px-4 bg-white">
									<p className="font-semibold w-[188px] overflow-hidden truncate">
										Tolak Angin Flu 1 Box
									</p>
									<div className="flex items-center gap-1 text-nowrap">
										<img
											src="/assets/images/icons/shop-grey.svg"
											className="flex size-5 shrink-0"
											alt="icon"
										/>
										<p className="font-semibold text-monday-gray leading-none">
											Bimore Pharmacy
										</p>
									</div>
								</div>
							</div>
						</Link>
					</SwiperSlide>
					<SwiperSlide className="swiper-slide !w-fit">
						<Link href="#" className="card">
							<div className="flex flex-col rounded-2xl overflow-hidden border border-monday-stroke w-[220px] shrink-0">
								<div className="relative flex w-full h-[180px] bg-monday-background overflow-hidden">
									<img
										src="/assets/images/thumbnails/product-2.png"
										className="size-full object-cover"
										alt="phot"
									/>
								</div>
								<div className="flex flex-col gap-2 py-5 px-4 bg-white">
									<p className="font-bold w-[188px] truncate">
										Tolak Angin Batuk 1 Box
									</p>
									<div className="flex items-center gap-1 text-nowrap">
										<img
											src="/assets/images/icons/shop-grey.svg"
											className="flex size-5 shrink-0"
											alt="icon"
										/>
										<p className="font-semibold text-monday-gray leading-none">
											Bimore Pharmacy
										</p>
									</div>
								</div>
							</div>
						</Link>
					</SwiperSlide>
				</Swiper>
			</div>
		</div>
	);
}
