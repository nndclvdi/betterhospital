"use client";

import Link from "next/link";
import React from "react";
import type { Specialist } from "../../../../../../generated/prisma";
import { formatRupiah } from "@/shared/utils/rupiahFormatter";
import { getImageUrl } from "@/shared/utils/image";
import {
	MANAGER_SPECIALIST_DETAIL_PAGE,
	MANAGER_SPECIALIST_EDIT_PAGE,
} from "@/shared/constants/uri-fe-page";

interface RowItemProps {
	data: Omit<Specialist, "createdAt" | "updatedAt" | "about"> & {
		totalDoctors: number;
	};
}

export default function RowItem({ data }: RowItemProps) {
	const imageUrl = getImageUrl(data.photo, "specialist");

	return (
		<>
			<div className="card flex items-center justify-between gap-6">
				<div className="flex items-center gap-4 w-[280px] shrink-0">
					<div className="flex size-[92px] rounded-2xl bg-monday-background overflow-hidden shrink-0 p-[10px]">
						<img
							src={imageUrl}
							className="size-full object-contain"
							alt="icon"
						/>
					</div>
					<div className="flex flex-col gap-[6px] flex-1">
						<p className="font-semibold text-xl w-[172px] truncate">
							{data.name}
						</p>
						<p className="font-semibold text-xl text-monday-red">
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
				<div className="flex items-center gap-1 w-[164px] shrink-0">
					<img
						src="/assets/images/icons/profile-2user-black.svg"
						className="size-6 flex shrink-0"
						alt="icon"
					/>
					<p className="font-semibold text-lg text-nowrap">
						{data.totalDoctors} Doctors
					</p>
				</div>
				<div className="flex items-center gap-4">
					<Link
						href={MANAGER_SPECIALIST_DETAIL_PAGE(data.id)}
						className="btn btn-primary-opacity min-w-[120px] font-semibold"
					>
						Details
					</Link>
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
			</div>
			<hr className="border-monday-stroke last:hidden" />
		</>
	);
}
