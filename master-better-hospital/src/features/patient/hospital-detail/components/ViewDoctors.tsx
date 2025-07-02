import Link from "next/link";
import React from "react";
import DoctorCard from "./DoctorCard";
import { getHospitalDoctors } from "../services/get-hospital-doctors";
import { redirect } from "next/navigation";
import { HOSPITAL_DETAIL_PAGE } from "@/shared/constants/uri-fe-page";
import { getImageUrl } from "@/shared/utils/image";
import HospitalCard from "./HospitalCard";

interface HospitalDoctorsViewProps {
	id: string;
}

export default async function HospitalDoctorsView({
	id,
}: HospitalDoctorsViewProps) {
	const data = await getHospitalDoctors(id);

	if (data === null) {
		return redirect(HOSPITAL_DETAIL_PAGE(id));
	}

	const total_doctor = data.specialists.reduce((acc, curr) => {
		return acc + curr.doctors.length;
	}, 0);

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
								href={HOSPITAL_DETAIL_PAGE(id)}
								className="size-11 flex shrink-0"
							>
								<img
									src="/assets/images/icons/mobile-back-button.svg"
									className="size-full"
									alt="icon"
								/>
							</Link>
							<h1 className="font-bold text-lg leading-none text-center">
								Hospital Doctors
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
							city: data.city,
							name: data.name,
							photo: data.photo,
							postal_code: data.postal_code,
						}}
					/>
					<div
						id="Browse-Doctors"
						className="flex flex-col w-full flex-1 p-5 gap-4 bg-white mt-5 pb-[96px]"
					>
						<div className="flex items-center justify-between">
							<div className="flex flex-col gap-1">
								<h2 className="font-bold text-lg">Browse Doctors</h2>
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
						<div className="flex flex-col gap-4">
							{data.specialists.map((item, i) => (
								<React.Fragment key={`specialist-${i + 1}`}>
									{item.doctors.map((val) => (
										<DoctorCard
											key={val.doctor.id}
											data={{
												experience: val.doctor.experience,
												gender: val.doctor.gender,
												id: val.doctor.id,
												name: val.doctor.name,
												photo: val.doctor.photo,
												specialist: val.hospital_specialist.specialist.name,
											}}
											hospital_id={data.id}
										/>
									))}
								</React.Fragment>
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
