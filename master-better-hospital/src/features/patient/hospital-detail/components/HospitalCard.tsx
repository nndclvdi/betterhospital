import { getImageUrl } from "@/shared/utils/image";
import React from "react";
import type { Hospital } from "../../../../../generated/prisma";

interface HospitalCardProps {
	data: Pick<Hospital, "photo" | "name" | "city" | "postal_code">;
}

export default function HospitalCard({ data }: HospitalCardProps) {
	return (
		<div className="flex items-center rounded-2xl py-5 px-4 bg-white gap-4 mx-5">
			<div className="flex size-16 rounded-2xl bg-monday-background overflow-hidden shrink-0">
				<img
					src={getImageUrl(data.photo, "hospitals")}
					className="size-full object-cover"
					alt="icon"
				/>
			</div>
			<div className="flex flex-col gap-[6px] w-full overflow-x-hidden">
				<p className="font-semibold text-lg">{data.name}</p>
				<div className="flex items-center gap-1 text-nowrap">
					<img
						src="/assets/images/icons/location-grey.svg"
						className="flex size-5 shrink-0"
						alt="icon"
					/>
					<p className="font-semibold text-monday-gray truncate">
						{data.city} ({data.postal_code})
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
	);
}
