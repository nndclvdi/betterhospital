import DoctorLists from "@/features/admin/dashboard/hospitals/components/DoctorLists";
import SpecialLists from "@/features/admin/dashboard/hospitals/components/SpecialLists";
import { findDetailHospital } from "@/features/admin/dashboard/hospitals/services/hospitalService";
import Topbar from "@/shared/components/Topbar";
import {
	BASE_URI_ADMIN_PAGE,
	MANAGER_HOSPITALS_EDIT_PAGE,
	MANAGER_HOSPITALS_PAGE,
} from "@/shared/constants/uri-fe-page";
import type { Params } from "@/shared/types/params";
import { getImageUrl } from "@/shared/utils/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function DashboardHospitalDetailPage({ params }: Params) {
	const { id } = await params;
	const hospital = await findDetailHospital(id);

	if (!hospital) {
		redirect(BASE_URI_ADMIN_PAGE);
	}

	return (
		<div id="Content" className="flex flex-col flex-1 p-6 pt-0">
			<Topbar>
				<div className="flex flex-col gap-2 w-full">
					<h1 className="font-bold text-2xl capitalize">Hospital Details</h1>
					<Link
						href={MANAGER_HOSPITALS_PAGE}
						className="flex items-center gap-1 font-semibold text-monday-gray text-lg leading-none"
					>
						<img
							src="/assets/images/icons/arrow-left-grey.svg"
							className="size-[18px] flex shrink-0"
							alt="icon"
						/>
						Manage Hospitals
					</Link>
				</div>
				<div className="flex items-center flex-nowrap gap-3">
					<Link href="#">
						<div className="flex size-14 rounded-full bg-monday-gray-background items-center justify-center overflow-hidden">
							<img
								src="/assets/images/icons/search-normal-black.svg"
								className="size-6"
								alt="icon"
							/>
						</div>
					</Link>
					<Link href="#">
						<div className="flex size-14 rounded-full bg-monday-gray-background items-center justify-center overflow-hidden">
							<img
								src="/assets/images/icons/notification-black.svg"
								className="size-6"
								alt="icon"
							/>
						</div>
					</Link>
					<div className="relative w-fit">
						<div className="flex size-14 rounded-full bg-monday-lime-green items-center justify-center overflow-hidden">
							<img
								src="/assets/images/icons/help-desk-black.svg"
								className="size-6"
								alt="icon"
							/>
						</div>
						<p className="absolute transform -translate-x-1/2 left-1/2 -bottom-2 rounded-[20px] py-1 px-2 bg-monday-black text-white w-fit font-extrabold text-[8px]">
							24/7
						</p>
					</div>
				</div>
			</Topbar>
			<main className="flex flex-col gap-5 flex-1">
				<section
					id="Hospital-Info"
					className="flex items-center justify-between gap-5 rounded-[20px] p-5 bg-white"
				>
					<div className="flex items-center gap-4 w-[320px] shrink-0">
						<div className="flex size-[92px] rounded-2xl bg-monday-background overflow-hidden shrink-0">
							<img
								src={getImageUrl(hospital?.photo, "hospitals")}
								className="size-full object-cover"
								alt="icon"
							/>
						</div>
						<div className="flex flex-col gap-[6px] flex-1">
							<p className="font-semibold text-xl w-[212px] truncate">
								{hospital.name}
							</p>
							<p className="flex items-center gap-1 font-medium text-monday-gray text-lg leading-none">
								<img
									src="/assets/images/icons/location-grey.svg"
									className="size-6"
									alt="icon"
								/>
								{hospital.city}
							</p>
						</div>
					</div>
					<div className="flex items-center gap-1 w-[210px] shrink-0">
						<img
							src="/assets/images/icons/stetoscop-black.svg"
							className="size-6 flex shrink-0"
							alt="icon"
						/>
						<p className="font-semibold text-lg text-nowrap">
							{hospital.specialists.length} Specialists
						</p>
					</div>
					<div className="flex items-center gap-1 w-[210px] shrink-0">
						<img
							src="/assets/images/icons/profile-2user-black.svg"
							className="size-6 flex shrink-0"
							alt="icon"
						/>
						<p className="font-semibold text-lg text-nowrap">
							{hospital.doctors.length} Doctors
						</p>
					</div>
					<div className="flex items-center gap-4">
						<Link
							href={MANAGER_HOSPITALS_EDIT_PAGE(hospital.id)}
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
				<div className="flex gap-5 flex-1">
					<DoctorLists
						data={hospital.doctors.map((item) => ({
							id: item.doctor.id,
							name: item.doctor.name,
							photo: item.doctor.photo,
							specialist: item.hospital_specialist.specialist.name,
						}))}
					/>
					<SpecialLists
						hospitalId={hospital.id}
						data={hospital.specialists.map((item) => ({
							id: item.id,
							name: item.specialist.name,
							photo: item.specialist.photo,
						}))}
					/>
				</div>
			</main>
		</div>
	);
}
