import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getDoctorSchedule } from "@/features/patient/hospital-detail/services/get-doctor-schedule";
import { redirect } from "next/navigation";
import { HOSPITAL_DOCTORS_DETAIL_PAGE } from "@/shared/constants/uri-fe-page";
import HospitalCard from "@/features/patient/hospital-detail/components/HospitalCard";
import DoctorCard from "@/features/patient/hospital-detail/components/DoctorCard";
import FormSchedule from "@/features/patient/hospital-detail/components/FormSchedule";

export const metadata: Metadata = {
	title: "Book Doctor",
};

export default async function BookDoctorPage({
	params,
}: { params: { id: string; doctorId: string } }) {
	const { doctorId, id } = await params;
	const data = await getDoctorSchedule(doctorId, id);

	if (data === null) {
		return redirect(HOSPITAL_DOCTORS_DETAIL_PAGE(id, doctorId));
	}

	console.log(data);

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
								href="mobile-doctor-details.html"
								className="size-11 flex shrink-0"
							>
								<img
									src="/assets/images/icons/mobile-back-button.svg"
									className="size-full"
									alt="icon"
								/>
							</Link>
							<h1 className="font-bold text-lg leading-none text-center">
								Book Doctor
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
					<HospitalCard
						data={{
							city: data.hospitals[0].hospital_specialist.hospital.city,
							name: data.hospitals[0].hospital_specialist.hospital.name,
							photo: data.hospitals[0].hospital_specialist.hospital.photo,
							postal_code:
								data.hospitals[0].hospital_specialist.hospital.postal_code,
						}}
					/>
					<div className="p-5">
						<DoctorCard
							hospital_id={id}
							data={{
								experience: data.experience,
								gender: data.gender,
								id: data.id,
								name: data.name,
								photo: data.photo,
								specialist:
									data.hospitals[0].hospital_specialist.specialist.name,
							}}
							clickable={false}
						/>
					</div>
					<FormSchedule
						schedules={data.schedules}
						doctorId={doctorId}
						hospitalId={id}
					/>
				</main>
			</div>
		</div>
	);
}
