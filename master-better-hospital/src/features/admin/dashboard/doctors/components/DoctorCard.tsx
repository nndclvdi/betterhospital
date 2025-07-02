"use client";

import React from "react";
import type { Doctor } from "../../../../../../generated/prisma";
import { getImageUrl } from "@/shared/utils/image";
import Link from "next/link";
import {
	MANAGER_DOCTORS_DETAIL_PAGE,
	MANAGER_DOCTORS_EDIT_PAGE,
} from "@/shared/constants/uri-fe-page";

interface IDoctorCardProps {
	data: Pick<Doctor, "id" | "name" | "experience" | "gender" | "photo"> & {
		specialist: string;
	};
}

export default function DoctorCard({ data }: IDoctorCardProps) {
	return (
		<div className="card flex flex-col rounded-[20px] border border-monday-stroke p-5 gap-5">
			<div className="flex items-center justify-between">
				<p className="font-medium text-lg text-monday-gray leading-none">
					Gender:
				</p>
				<p className="flex items-center gap-0.5 font-semibold text-lg leading-none">
					<img
						src={`/assets/images/icons/${data.gender === "MALE" ? "man" : "woman"}-black-fill.svg`}
						className="size-6"
						alt="icon"
					/>
					{data.gender === "MALE" ? "Male" : "Female"}
				</p>
			</div>
			<hr className="border-monday-stroke last:hidden" />
			<div className="flex items-center justify-between gap-6">
				<div className="flex items-center gap-4 w-[300px] shrink-0">
					<div className="flex size-[92px] rounded-full bg-monday-background overflow-hidden shrink-0">
						<img
							src={getImageUrl(data.photo, "doctors")}
							className="size-full object-cover"
							alt="icon"
						/>
					</div>
					<div className="flex flex-col gap-[6px] flex-1">
						<p className="font-semibold text-xl w-[202px] truncate">
							{data.name}
						</p>
						<p className="flex items-center gap-1 font-medium text-monday-gray text-lg leading-none">
							<img
								src="/assets/images/icons/stetoscop-grey.svg"
								className="size-5"
								alt="icon"
							/>
							{data.specialist}
						</p>
					</div>
				</div>
				<div className="flex flex-col gap-2 w-[149px]">
					<p className="flex items-center gap-0.5 font-semibold text-lg leading-none">
						<img
							src="/assets/images/icons/star-sliced.svg"
							className="size-6"
							alt="icon"
						/>
						4.8/5.0
					</p>
					<p className="font-medium text-lg text-monday-gray leading-none">
						Rating
					</p>
				</div>
				<div className="flex flex-col gap-2 w-[149px] shrink-0">
					<p className="flex items-center gap-0.5 font-semibold text-lg leading-none text-nowrap">
						<img
							src="/assets/images/icons/briefcase-blue-fill.svg"
							className="size-6"
							alt="icon"
						/>
						{data.experience} years
					</p>
					<p className="font-medium text-lg text-monday-gray leading-none">
						Experience
					</p>
				</div>
				<div className="flex items-center gap-4">
					<Link
						href={MANAGER_DOCTORS_DETAIL_PAGE(data.id)}
						className="btn btn-primary-opacity min-w-[120px] font-semibold"
					>
						Details
					</Link>
					<Link
						href={MANAGER_DOCTORS_EDIT_PAGE(data.id)}
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
		</div>
	);
}
