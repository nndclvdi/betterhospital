import React from "react";
import type { SpecialistInfo as Specialist } from "../types/specialist.type";
import { getImageUrl } from "@/shared/utils/image";
import { formatRupiah } from "@/shared/utils/rupiahFormatter";
import Link from "next/link";
import { MANAGER_SPECIALIST_EDIT_PAGE } from "@/shared/constants/uri-fe-page";

interface ISpecialistInfoProps {
	data: Specialist;
}

export default function SpecialistInfo({ data }: ISpecialistInfoProps) {
	return (
		<section
			id="Specialist-Info"
			className="flex items-center justify-between gap-5 rounded-[20px] p-5 bg-white"
		>
			<div className="flex items-center gap-4 w-[320px] shrink-0">
				<div className="flex size-[92px] rounded-2xl bg-monday-background overflow-hidden shrink-0 p-[10px]">
					<img
						src={getImageUrl(data.photo, "specialist")}
						className="size-full object-contain"
						alt="icon"
					/>
				</div>
				<div className="flex flex-col gap-[6px] flex-1">
					<p className="font-semibold text-xl w-[212px] truncate">
						{data.name}
					</p>
					<p className="font-semibold text-xl text-monday-red leading-none">
						{formatRupiah(data.price)}
					</p>
				</div>
			</div>
			<div className="flex items-center gap-1 w-[164px] shrink-0">
				<img
					src="/assets/images/icons/verify-blue-fill.svg"
					className="size-6 flex shrink-0"
					alt="icon"
				/>
				<p className="font-semibold text-lg text-nowrap text-monday-blue">
					Certified
				</p>
			</div>
			<div className="flex items-center gap-1 w-[210px] shrink-0">
				<img
					src="/assets/images/icons/profile-2user-black.svg"
					className="size-6 flex shrink-0"
					alt="icon"
				/>
				<p className="font-semibold text-lg text-nowrap">
					{data.total_doctor} Doctors
				</p>
			</div>
			<div className="flex items-center gap-4">
				<Link
					href={MANAGER_SPECIALIST_EDIT_PAGE(data.id)}
					className="btn btn-black min-w-[120px] font-semibold"
				>
					<img
						src="/assets/images/icons/edit-white.svg"
						className="flex size-6 shrink-0"
						alt="icon"
					/>
					Edit
				</Link>
			</div>
		</section>
	);
}
