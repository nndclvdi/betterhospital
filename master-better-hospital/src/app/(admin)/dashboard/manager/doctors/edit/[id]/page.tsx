import FormDoctor from "@/features/admin/dashboard/doctors/components/FormDoctor";
import { findDoctor } from "@/features/admin/dashboard/doctors/services/doctorService";
import Topbar from "@/shared/components/Topbar";
import { MANAGER_DOCTORS_PAGE } from "@/shared/constants/uri-fe-page";
import type { Params } from "@/shared/types/params";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function DashboardManagerEditDoctor({ params }: Params) {
	const { id } = await params;
	const doctor = await findDoctor(id);

	if (doctor === null) {
		redirect(MANAGER_DOCTORS_PAGE);
	}

	return (
		<div id="Content" className="flex flex-col flex-1 p-6 pt-0">
			<Topbar>
				<div className="flex flex-col gap-2 w-full">
					<h1 className="font-bold text-2xl capitalize">Edit Doctor</h1>
					<Link
						href={MANAGER_DOCTORS_PAGE}
						className="flex items-center gap-1 font-semibold text-monday-gray text-lg leading-none"
					>
						<img
							src="/assets/images/icons/arrow-left-grey.svg"
							className="size-[18px] flex shrink-0"
							alt="icon"
						/>
						Manage Doctors
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
				<FormDoctor
					type="EDIT"
					values={{
						about: doctor.about,
						experience: doctor.experience,
						gender: doctor.gender,
						hospital_id: doctor.specialist.hospital_id,
						name: doctor.name,
						specialist_id: doctor.specialist.specialist_id,
						photo: doctor.photo,
						id: doctor.id,
					}}
				/>
			</main>
		</div>
	);
}
