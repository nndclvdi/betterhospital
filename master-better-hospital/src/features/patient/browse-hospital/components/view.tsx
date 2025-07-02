"use client";

import { BROWSE_SPECIALIST_PAGE } from "@/shared/constants/uri-fe-page";
import { getImageUrl } from "@/shared/utils/image";
import Link from "next/link";
import React from "react";
import HospitalCard from "./HospitalCard";
import type { HospitalSpecialistValues } from "../utils/schema";

interface BrowseHospitalViewProps {
	data: HospitalSpecialistValues;
}

export default function BrowseHospitalView({ data }: BrowseHospitalViewProps) {
	const total_doctor = data.hospitals.reduce((acc, curr) => {
		return acc + curr._count.doctors;
	}, 0);

	const hospitals = data.hospitals.map((val) => {
		const total_doctor = val._count.doctors;

		return {
			id: val.hospital.id,
			name: val.hospital.name,
			photo: val.hospital.photo,
			postal_code: val.hospital.postal_code,
			city: val.hospital.city,
			total_doctor,
		};
	});

	return (
		<div id="Mobile-Body" className="flex flex-col flex-1 bg-[#dae1e9] min-w-0">
			<div
				id="Content-Container"
				className="flex flex-col min-h-screen w-full max-w-[640px] mx-auto bg-monday-background"
			>
				<div id="Top-Nav" className="flex relative w-full h-[128px]">
					<div className="fixed z-30 top-0 w-full max-w-[640px] px-5 pt-8">
						<div className="flex items-center justify-between h-[76px] bg-white rounded-2xl p-4 gap-5 drop-shadow-sm">
							<Link
								href={BROWSE_SPECIALIST_PAGE}
								className="size-11 flex shrink-0"
							>
								<img
									src="/assets/images/icons/mobile-back-button.svg"
									className="size-full"
									alt="icon"
								/>
							</Link>
							<h1 className="font-bold text-lg leading-none text-center">
								Hospital Specialist
							</h1>
							<Link href="#" className="size-11 flex shrink-0">
								<img
									src="/assets/images/icons/mobile-more-button.svg"
									className="size-full"
									alt="icon"
								/>
							</Link>
						</div>
					</div>
				</div>
				<main className="flex flex-col flex-1">
					<div className="flex items-center rounded-2xl py-5 px-4 bg-white gap-4 mx-5">
						<div className="flex size-[72px] rounded-2xl bg-monday-background overflow-hidden shrink-0 p-2">
							<img
								src={getImageUrl(data.photo, "specialist")}
								className="size-full object-contain"
								alt="icon"
							/>
						</div>
						<div className="flex flex-col gap-[6px]">
							<p className="font-semibold text-lg line-clamp-1">{data.name}</p>
							<div className="flex items-center gap-1 text-nowrap">
								<img
									src="/assets/images/icons/profile-2user-grey.svg"
									className="flex size-5 shrink-0"
									alt="icon"
								/>
								<p className="font-semibold text-monday-gray leading-none">
									{total_doctor} Doctors
								</p>
							</div>
						</div>
					</div>
					<div
						id="Browse-Hospitals"
						className="flex flex-col rounded-2xl w-full flex-1 p-5 gap-4 bg-white mt-5 pb-[96px]"
					>
						<div className="flex items-center justify-between">
							<div className="flex flex-col gap-1">
								<h2 className="font-bold text-lg">Browse Hospitals</h2>
								<div className="flex items-center gap-1 text-nowrap">
									<img
										src="/assets/images/icons/hospital-grey.svg"
										className="flex size-5 shrink-0"
										alt="icon"
									/>
									<p className="font-semibold text-monday-gray leading-none">
										{hospitals.length} Total Hospitals
									</p>
								</div>
							</div>
						</div>
						<div className="flex flex-col gap-4">
							{hospitals.map((val) => (
								<HospitalCard key={val.id} data={val} />
							))}
						</div>
					</div>
				</main>
				<button
					type="button"
					className="fixed bottom-[28px] transform -translate-x-1/2 left-1/2 z-10 flex items-center rounded-full py-3 px-4 bg-monday-blue gap-[6px] w-fit"
				>
					<img
						src="/assets/images/icons/filter-white.svg"
						className="flex size-6 shrink-0"
						alt="icon"
					/>
					<p className="font-medium leading-none text-white">Filter</p>
				</button>
			</div>
		</div>
	);
}
