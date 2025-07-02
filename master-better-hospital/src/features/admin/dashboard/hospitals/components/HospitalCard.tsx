"use client";

import Link from "next/link";
import React from "react";
import type { Hospital } from "../types/hospital";
import { getImageUrl } from "@/shared/utils/image";
import {
	MANAGER_HOSPITALS_DETAIL_PAGE,
	MANAGER_HOSPITALS_EDIT_PAGE,
} from "@/shared/constants/uri-fe-page";

interface HospitalItemProps {
	data: Hospital;
}

export default function HospitalItem({ data }: HospitalItemProps) {
	const imageUrl = getImageUrl(data.photo, "hospitals");

	return (
		<div className="card flex flex-col gap-5 p-4 rounded-2xl border border-monday-stroke">
			<div className="flex items-center justify-between gap-6">
				<div className="flex items-center gap-4 w-[380px] shrink-0">
					<div className="flex size-[92px] rounded-2xl bg-monday-background overflow-hidden shrink-0">
						<img src={imageUrl} className="size-full object-cover" alt="icon" />
					</div>
					<div className="flex flex-col gap-[6px] flex-1">
						<p className="font-semibold text-xl w-[272px] truncate">
							{data.name}
						</p>
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
				<div className="flex items-center gap-4">
					<Link
						href={MANAGER_HOSPITALS_DETAIL_PAGE(data.id)}
						className="btn btn-primary-opacity min-w-[120px] font-semibold"
					>
						Details
					</Link>
					<Link
						href={MANAGER_HOSPITALS_EDIT_PAGE(data.id)}
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
			<hr className="border-monday-stroke" />
			<div className="flex items-center gap-10">
				<div className="flex items-center w-full gap-3">
					<div className="flex size-[56px] rounded-full p-4 bg-monday-gray-background overflow-hidden">
						<img
							src="/assets/images/icons/profile-2user-black.svg"
							className="size-6 object-contain object-center"
							alt="icon"
						/>
					</div>
					<div>
						<p className="font-semibold text-xl">{data.totalDoctors}</p>
						<p className="font-medium text-monday-gray">Total Doctors</p>
					</div>
				</div>
				<div className="flex items-center w-full gap-3">
					<div className="flex size-[56px] rounded-full p-4 bg-monday-gray-background overflow-hidden">
						<img
							src="/assets/images/icons/stetoscop-black.svg"
							className="size-6 object-contain object-center"
							alt="icon"
						/>
					</div>
					<div>
						<p className="font-semibold text-xl">{data.totalSpecialist}</p>
						<p className="font-medium text-monday-gray">Total Specialists</p>
					</div>
				</div>
				<div className="flex items-center w-full gap-3">
					<div className="flex size-[56px] rounded-full p-4 bg-monday-gray-background overflow-hidden">
						<img
							src="/assets/images/icons/call-black.svg"
							className="size-6 object-contain object-center"
							alt="icon"
						/>
					</div>
					<div>
						<p className="font-semibold text-xl">08125553320</p>
						<p className="font-medium text-monday-gray">Phone Number</p>
					</div>
				</div>
			</div>
		</div>
	);
}
