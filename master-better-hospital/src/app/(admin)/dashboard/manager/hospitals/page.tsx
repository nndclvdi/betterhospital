import EmptyState from "@/features/admin/dashboard/hospitals/components/EmptyState";
import HospitalCard from "@/features/admin/dashboard/hospitals/components/HospitalCard";
import { getHospitals } from "@/features/admin/dashboard/hospitals/services/hospitalService";
import Topbar from "@/shared/components/Topbar";
import { MANAGER_HOSPITALS_CREATE_PAGE } from "@/shared/constants/uri-fe-page";
import Link from "next/link";
import React from "react";

export default async function DashboardHospitalsPage() {
	const hospitals = await getHospitals();

	return (
		<div id="Content" className="flex flex-col flex-1 p-6 pt-0">
			<Topbar>
				<div className="flex items-center gap-6 h-[102px] bg-white w-full rounded-3xl p-[18px]">
					<div className="flex flex-col gap-2 w-full">
						<h1 className="font-bold text-2xl capitalize">Manage Hospitals</h1>
						<p className="flex items-center gap-1 font-semibold text-monday-gray text-lg leading-none">
							View & Update Your Hospital Here
						</p>
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
				</div>
			</Topbar>
			<main className="flex flex-col gap-5 flex-1">
				<section className="flex flex-col gap-6 flex-1 rounded-[20px] p-5 px-0 bg-white">
					<div id="Header" className="flex items-center justify-between px-5">
						<div className="flex flex-col gap-2">
							<p className="font-semibold text-xl">All Hospitals</p>
							<p className="flex items-center gap-1 font-semibold text-monday-gray text-lg leading-none">
								<img
									src="/assets/images/icons/hospital-grey.svg"
									className="size-5"
									alt="icon"
								/>
								{hospitals.length} Total Hospitals
							</p>
						</div>
						<Link
							href={MANAGER_HOSPITALS_CREATE_PAGE}
							className="btn btn-primary font-semibold text-lg"
						>
							Add New
							<img
								src="/assets/images/icons/add-white.svg"
								className="flex sixe-6 shrink-0"
								alt="icon"
							/>
						</Link>
					</div>
					<div className="flex flex-col px-5 gap-5 flex-1">
						{hospitals.length > 0 ? (
							<div id="List-Container" className="flex flex-col gap-5">
								{hospitals.map((item) => (
									<HospitalCard
										key={item.id}
										data={{
											city: item.city,
											id: item.id,
											name: item.name,
											phone: item.phone,
											photo: item.photo,
											totalDoctors: item.total_doctor,
											totalSpecialist: item.total_specialist,
										}}
									/>
								))}
							</div>
						) : (
							<EmptyState />
						)}
					</div>
				</section>
			</main>
		</div>
	);
}
