"use client";

import React from "react";
import type { Hospital } from "../types/hospital";
import { getImageUrl } from "@/shared/utils/image";

interface HospitalInfoProps {
	data: Pick<
		Hospital,
		"name" | "photo" | "totalDoctors" | "totalSpecialist" | "city"
	>;
}

export default function HospitalInfo({ data }: HospitalInfoProps) {
	return (
		<section
			id="Hospital-Info"
			className="flex items-center justify-between gap-5 rounded-[20px] p-5 bg-white"
		>
			<div className="flex items-center gap-4 w-full">
				<div className="flex size-[92px] rounded-2xl bg-monday-background overflow-hidden shrink-0">
					<img
						src={getImageUrl(data.photo, "hospitals")}
						className="size-full object-cover"
						alt="icon"
					/>
				</div>
				<div className="flex flex-col gap-[6px] flex-1">
					<p className="font-semibold text-xl">{data.name}</p>
					<p className="flex items-center gap-1 font-medium text-monday-gray text-lg leading-none">
						<img
							src="/assets/images/icons/location-grey.svg"
							className="size-6"
							alt="icon"
						/>
						{data.city}
					</p>
				</div>
			</div>
			<div className="flex items-center gap-1 w-full">
				<img
					src="/assets/images/icons/stetoscop-black.svg"
					className="size-6 flex shrink-0"
					alt="icon"
				/>
				<p className="font-semibold text-lg text-nowrap">
					{data.totalSpecialist} Specialists
				</p>
			</div>
			<div className="flex items-center gap-1 w-full">
				<img
					src="/assets/images/icons/profile-2user-black.svg"
					className="size-6 flex shrink-0"
					alt="icon"
				/>
				<p className="font-semibold text-lg text-nowrap">
					{data.totalDoctors} Doctors
				</p>
			</div>
		</section>
	);
}
