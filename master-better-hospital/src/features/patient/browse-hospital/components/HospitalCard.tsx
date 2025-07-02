import Link from "next/link";
import React from "react";
import type { Hospital } from "../../../../../generated/prisma";
import { getImageUrl } from "@/shared/utils/image";
import { HOSPITAL_DETAIL_PAGE } from "@/shared/constants/uri-fe-page";

interface HospitalCardProps {
	data: Pick<Hospital, "id" | "name" | "photo" | "postal_code" | "city"> & {
		total_doctor: number;
	};
}

export default function HospitalCard({ data }: HospitalCardProps) {
	return (
		<Link href={HOSPITAL_DETAIL_PAGE(data.id)} className="card">
			<div className="flex items-center rounded-2xl border border-monday-stroke  p-4 bg-white gap-4">
				<div className="flex w-[100px] h-[120px] rounded-xl bg-monday-background overflow-hidden shrink-0">
					<img
						src={getImageUrl(data.photo, "hospitals")}
						className="size-full object-cover"
						alt="thumbnail"
					/>
				</div>
				<div className="flex flex-col gap-[6px] overflow-hidden">
					<p className="font-semibold text-lg">{data.name}</p>
					<div className="flex items-center gap-1 text-nowrap">
						<img
							src="/assets/images/icons/profile-2user-grey.svg"
							className="flex size-5 shrink-0"
							alt="icon"
						/>
						<p className="font-semibold text-monday-gray truncate">
							{data.total_doctor} Doctors
						</p>
					</div>
					<div className="flex items-center gap-1 text-nowrap">
						<img
							src="/assets/images/icons/location-grey.svg"
							className="flex size-5 shrink-0"
							alt="icon"
						/>
						<p className="font-semibold text-monday-gray truncate">
							{data.city} {data.postal_code}
						</p>
					</div>
					<div className="flex items-center gap-1 text-nowrap">
						<img
							src="/assets/images/icons/star-sliced.svg"
							className="flex size-5 shrink-0"
							alt="icon"
						/>
						<p className="font-semibold text-monday-gray truncate">
							<span className="text-monday-orange">4.8</span> (2400 Reviews)
						</p>
					</div>
				</div>
			</div>
		</Link>
	);
}
