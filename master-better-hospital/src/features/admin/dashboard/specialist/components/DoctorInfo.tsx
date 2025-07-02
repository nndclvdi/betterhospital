"use client";

import React from "react";
import type { Doctor } from "../../../../../../generated/prisma";
import { getImageUrl } from "@/shared/utils/image";

interface IDoctorInfoProps {
	data: Pick<Doctor, "id" | "name" | "photo" | "gender" | "experience"> & {
		specialist: string;
	};
}

export default function DoctorInfo({ data }: IDoctorInfoProps) {
	return (
		<>
			<hr className="border-monday-stroke last:hidden" />
			<div className="card flex items-center justify-between gap-6">
				<div className="flex items-center gap-4 w-[320px] shrink-0">
					<div className="flex size-[92px] rounded-full bg-monday-background overflow-hidden shrink-0">
						<img
							src={getImageUrl(data.photo, "doctors")}
							className="size-full object-cover"
							alt="icon"
						/>
					</div>
					<div className="flex flex-col gap-[6px] flex-1">
						<p className="font-semibold text-xl w-[222px] truncate">
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
				<div className="flex flex-col gap-2 w-[180px]">
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
				<div className="flex flex-col gap-2 w-[180px] shrink-0">
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
				<div className="flex flex-col gap-2 w-[180px]">
					<p className="flex items-center gap-0.5 font-semibold text-lg leading-none">
						<img
							src="/assets/images/icons/woman-black-fill.svg"
							className="size-6"
							alt="icon"
						/>
						{data.gender === "MALE" ? "Male" : "Female"}
					</p>
					<p className="font-medium text-lg text-monday-gray leading-none">
						Gender
					</p>
				</div>
			</div>
			<hr className="border-monday-stroke last:hidden" />
		</>
	);
}
