"use client";

import React from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import Link from "next/link";
import { getImageUrl } from "@/shared/utils/image";

type Doctor = {
	id: string;
	name: string;
	photo: string;
	hospital: string;
	specialist: string;
};

interface DoctorListClientProps {
	data: Doctor[];
}

export default function DoctorListClient({ data }: DoctorListClientProps) {
	return (
		<Swiper
			direction="horizontal"
			slidesOffsetAfter={20}
			slidesOffsetBefore={20}
			spaceBetween={20}
			slidesPerView={"auto"}
			className="swiper-wrapper w-full"
		>
			{data.map((item) => (
				<SwiperSlide key={item.id} className="swiper-slide !w-fit">
					<Link href="/home" className="card">
						<div className="flex flex-col rounded-2xl overflow-hidden border border-monday-stroke w-[300px] shrink-0">
							<div className="relative flex w-full h-[180px] bg-monday-background overflow-hidden">
								<img
									src={getImageUrl(item.photo, "doctors")}
									className="mx-auto object-cover"
									alt="phot"
								/>
								<img
									src="/assets/images/icons/available.svg"
									className="w-[100px] absolute top-4 left-4"
									alt="status"
								/>
							</div>
							<div className="flex items-center justify-between py-3 px-4 bg-monday-blue">
								<p className="font-bold leading-none text-white overflow-hidden truncate">
									{item.hospital}
								</p>
								<img
									src="/assets/images/icons/hospital-white-fill.svg"
									className="flex size-5 shrink-0"
									alt="icon"
								/>
							</div>
							<div className="flex items-center justify-between py-5 px-4 bg-white">
								<div className="flex flex-col gap-[6px]">
									<p className="font-semibold text-lg w-[190px] overflow-hidden truncate">
										{item.name}
									</p>
									<div className="flex items-center gap-1 text-nowrap">
										<img
											src="/assets/images/icons/stetoscop-grey.svg"
											className="flex size-5 shrink-0"
											alt="icon"
										/>
										<p className="font-semibold text-monday-gray leading-none">
											{item.specialist}
										</p>
									</div>
								</div>
								<div className="flex items-center rounded-full w-fit h-fit shrink-0 bg-monday-orange py-[6px] px-[10px] gap-0.5">
									<img
										src="/assets/images/icons/star-sliced-white.svg"
										className="flex size-5 shrink-0"
										alt="icon"
									/>
									<p className="font-semibold leading-none text-white">4.8</p>
								</div>
							</div>
						</div>
					</Link>
				</SwiperSlide>
			))}
		</Swiper>
	);
}
