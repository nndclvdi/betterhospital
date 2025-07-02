import Link from "next/link";
import React from "react";
import type { Doctor } from "../../../../../generated/prisma";
import { getImageUrl } from "@/shared/utils/image";
import { HOSPITAL_DOCTORS_DETAIL_PAGE } from "@/shared/constants/uri-fe-page";

interface DoctorCardProps {
	data: Pick<Doctor, "id" | "name" | "photo" | "experience" | "gender"> & {
		specialist: string;
	};
	hospital_id: string;
	clickable?: boolean;
}

export default function DoctorCard({
	data,
	hospital_id,
	clickable = true,
}: DoctorCardProps) {
	return (
		<>
			{clickable ? (
				<Link
					href={HOSPITAL_DOCTORS_DETAIL_PAGE(hospital_id, data.id)}
					className="card"
				>
					<div className="flex flex-col rounded-2xl border border-monday-stroke  p-4 bg-white gap-4">
						<div className="flex items-center gap-[10px]">
							<div className="flex size-16 rounded-full bg-monday-background overflow-hidden shrink-0">
								<img
									src={getImageUrl(data.photo, "doctors")}
									className="size-full object-cover"
									alt="icon"
								/>
							</div>
							<div className="flex flex-col gap-[6px] w-full">
								<p className="font-semibold">{data.name}</p>
								<div className="flex items-center gap-1 text-nowrap">
									<img
										src="/assets/images/icons/stetoscop-grey.svg"
										className="flex size-5 shrink-0"
										alt="icon"
									/>
									<p className="font-semibold text-monday-gray leading-none">
										{data.specialist}
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
						<hr className="border border-monday-stroke" />
						<div className="grid grid-cols-2 gap-4">
							<div className="flex flex-col gap-2 items-center text-center shrink-0">
								<p className="flex items-center gap-0.5 font-semibold leading-none text-nowrap">
									<img
										src="/assets/images/icons/briefcase-blue-fill.svg"
										className="size-5"
										alt="icon"
									/>
									{data.experience} years
								</p>
								<p className="font-medium text-sm text-monday-gray leading-none">
									Experience
								</p>
							</div>
							<div className="flex flex-col gap-2 items-center text-center">
								<p className="flex items-center gap-0.5 font-semibold leading-none">
									<img
										src={`/assets/images/icons/${data.gender === "MALE" ? "man" : "woman"}-black-fill.svg`}
										className="size-5"
										alt="icon"
									/>
									{data.gender === "MALE" ? "Male" : "Female"}
								</p>
								<p className="font-medium text-sm text-monday-gray leading-none">
									Gender
								</p>
							</div>
						</div>
					</div>
				</Link>
			) : (
				<div className="flex flex-col rounded-2xl border border-monday-stroke  p-4 bg-white gap-4">
					<div className="flex items-center gap-[10px]">
						<div className="flex size-16 rounded-full bg-monday-background overflow-hidden shrink-0">
							<img
								src={getImageUrl(data.photo, "doctors")}
								className="size-full object-cover"
								alt="icon"
							/>
						</div>
						<div className="flex flex-col gap-[6px] w-full">
							<p className="font-semibold">{data.name}</p>
							<div className="flex items-center gap-1 text-nowrap">
								<img
									src="/assets/images/icons/stetoscop-grey.svg"
									className="flex size-5 shrink-0"
									alt="icon"
								/>
								<p className="font-semibold text-monday-gray leading-none">
									{data.specialist}
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
					<hr className="border border-monday-stroke" />
					<div className="grid grid-cols-2 gap-4">
						<div className="flex flex-col gap-2 items-center text-center shrink-0">
							<p className="flex items-center gap-0.5 font-semibold leading-none text-nowrap">
								<img
									src="/assets/images/icons/briefcase-blue-fill.svg"
									className="size-5"
									alt="icon"
								/>
								{data.experience} years
							</p>
							<p className="font-medium text-sm text-monday-gray leading-none">
								Experience
							</p>
						</div>
						<div className="flex flex-col gap-2 items-center text-center">
							<p className="flex items-center gap-0.5 font-semibold leading-none">
								<img
									src={`/assets/images/icons/${data.gender === "MALE" ? "man" : "woman"}-black-fill.svg`}
									className="size-5"
									alt="icon"
								/>
								{data.gender === "MALE" ? "Male" : "Female"}
							</p>
							<p className="font-medium text-sm text-monday-gray leading-none">
								Gender
							</p>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
