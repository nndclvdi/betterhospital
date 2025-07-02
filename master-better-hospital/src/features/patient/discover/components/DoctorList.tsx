import Link from "next/link";
import React from "react";
import DoctorListClient from "./DoctorList.client";
import { getDoctors } from "../services/discoverService";

export default async function DoctorList() {
	const data = await getDoctors();

	return (
		<div
			id="Our-Doctor"
			className="flex flex-col w-full py-5 gap-4 bg-white mt-5"
		>
			<div className="flex items-center justify-between px-5">
				<div className="flex flex-col gap-1">
					<h2 className="font-bold text-lg">Our Great Doctors</h2>
					<p className="font-semibold text-sm text-monday-gray leading-none">
						Make Appointment
					</p>
				</div>
				<Link
					href="#"
					className="rounded-full border border-monday-stroke py-3 px-4 font-bold text-xs leading-none text-monday-gray"
				>
					VIEW ALL
				</Link>
			</div>
			<div className="swiper w-full">
				<DoctorListClient
					data={data.map((val) => ({
						hospital: val.hospitals[0].hospital_specialist.hospital.name,
						id: val.id,
						name: val.name,
						photo: val.photo,
						specialist: val.hospitals[0].hospital_specialist.specialist.name,
					}))}
				/>
			</div>
		</div>
	);
}
