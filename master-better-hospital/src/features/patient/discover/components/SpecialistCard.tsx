import { getImageUrl } from "@/shared/utils/image";
import Link from "next/link";
import React from "react";
import type { Specialist as SpecialistPrisma } from "../../../../../generated/prisma";
import { BROWSE_SPECIALIST_DETAIL_PAGE } from "@/shared/constants/uri-fe-page";

type Specialist = Pick<SpecialistPrisma, "id" | "name" | "photo"> & {
	total_doctors: number;
};

interface SpecialistCardProps {
	data: Specialist;
}

export default function SpecialistCard({ data }: SpecialistCardProps) {
	return (
		<Link href={BROWSE_SPECIALIST_DETAIL_PAGE(data.id)} className="card">
			<div className="flex flex-col rounded-2xl border border-monday-stroke py-5 px-4 bg-white gap-6">
				<div className="flex size-[52px] rounded-xl bg-monday-background overflow-hidden shrink-0 p-[5px]">
					<img
						src={getImageUrl(data.photo, "specialist")}
						className="size-full object-contain"
						alt="icon"
					/>
				</div>
				<div className="flex flex-col gap-[6px]">
					<p className="font-bold text-lg overflow-hidden truncate">
						{data.name}
					</p>
					<div className="flex items-center gap-1 text-nowrap">
						<img
							src="/assets/images/icons/profile-2user-grey.svg"
							className="flex size-5 shrink-0"
							alt="icon"
						/>
						<p className="font-semibold text-monday-gray leading-none">
							{data.total_doctors} Doctors
						</p>
					</div>
				</div>
			</div>
		</Link>
	);
}
