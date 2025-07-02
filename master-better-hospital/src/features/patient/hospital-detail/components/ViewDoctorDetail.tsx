import Link from "next/link";
import React from "react";
import { getDoctor } from "../services/get-doctor";
import { redirect } from "next/navigation";
import {
	HOSPITAL_DETAIL_PAGE,
	HOSPITAL_DOCTORS_BOOK_PAGE,
} from "@/shared/constants/uri-fe-page";
import { getImageUrl } from "@/shared/utils/image";
import DoctorService from "./DoctorService";
import DoctorTestimony from "./DoctorTestimony";
import { formatRupiah } from "@/shared/utils/rupiahFormatter";

interface ViewDoctorDetailProps {
	hospitalId: string;
	doctorId: string;
}

export default async function ViewDoctorDetail({
	doctorId,
	hospitalId,
}: ViewDoctorDetailProps) {
	const data = await getDoctor(hospitalId, doctorId);

	if (data === null) {
		return redirect(HOSPITAL_DETAIL_PAGE(hospitalId));
	}

	return (
		<div id="Mobile-Body" className="flex flex-col flex-1 bg-[#dae1e9] min-w-0">
			<div
				id="Content-Container"
				className="flex flex-col min-h-screen w-full max-w-[640px] mx-auto bg-monday-background"
			>
				<div id="Top-Nav" className="flex relative w-full">
					<div className="fixed z-30 top-0 w-full max-w-[640px] px-5 pt-8">
						<div className="flex items-center justify-between h-[76px] bg-white rounded-2xl p-4 gap-5 drop-shadow-sm">
							<Link
								href="mobile-hospital-doctors.html"
								className="size-11 flex shrink-0"
							>
								<img
									src="/assets/images/icons/mobile-back-button.svg"
									className="size-full"
									alt="icon"
								/>
							</Link>
							<h1 className="font-bold text-lg leading-none text-center">
								Doctor Details
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
				<main className="flex flex-col flex-1 bg-white">
					<div
						id="Thumbnail"
						className="flex flex-col w-full h-[622px] overflow-hidden bg-monday-background"
					>
						<div className="absolute transform -translate-x-1/2 left-1/2 top-[134px] flex w-[365px] h-[326px] overflow-hidden mx-auto">
							<img
								src={getImageUrl(data.photo, "doctors")}
								className="size-full object-contain object-top"
								alt="phot"
							/>
						</div>
						<div className="relative flex flex-col min-h-[189px] rounded-2xl border border-monday-stroke p-4 bg-white gap-4 mx-5 mb-5 mt-auto">
							<div className="flex items-center gap-[10px]">
								<div className="flex flex-col gap-[6px] w-full">
									<p className="font-bold text-xl">Dr. {data.name}</p>
									<div className="flex items-center gap-1 text-nowrap">
										<img
											src="/assets/images/icons/stetoscop-grey.svg"
											className="flex size-5 shrink-0"
											alt="icon"
										/>
										<p className="font-semibold text-lg text-monday-gray leading-none">
											{data.hospitals[0].hospital_specialist.specialist.name}
										</p>
									</div>
								</div>
								<div className="flex items-center rounded-full w-fit h-fit shrink-0 bg-monday-orange py-[6px] px-[10px] gap-0.5">
									<img
										src="/assets/images/icons/star-sliced-white.svg"
										className="flex size-5 shrink-0"
										alt="icon"
									/>
									<p className="font-semibold leading-none text-white">5.0</p>
								</div>
							</div>
							<div className="flex items-center rounded-2xl border border-monday-stroke p-4 gap-4">
								<div className="flex flex-col gap-2 items-center text-center w-full">
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
								<div className="flex h-[32px] shrink-0 border border-monday-stroke" />
								<div className="flex flex-col gap-2 items-center text-center w-full">
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
					</div>
					<div className="flex flex-col w-full py-6 px-5 bg-white gap-8">
						<div className="flex flex-col gap-2">
							<p className="font-bold leading-none">About Doctor</p>
							<p className="font-medium leading-[1.6em] text-monday-gray">
								{data.about}
							</p>
						</div>
						<DoctorService />
						<DoctorTestimony />
					</div>
					<div id="Bottom-Bar" className="flex relative w-full h-[141px] mt-3">
						<div className="fixed z-30 bottom-0 flex flex-col w-full max-w-[640px] px-5 py-6 bg-white border-t border-monday-stroke gap-3">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-1 text-nowrap">
									<img
										src="/assets/images/icons/ticket-expired-grey.svg"
										className="flex size-5 shrink-0"
										alt="icon"
									/>
									<p className="font-semibold text-monday-gray leading-none">
										Price:
									</p>
								</div>
								<p className="font-bold text-xl text-monday-red">
									{formatRupiah(
										data.hospitals[0].hospital_specialist.specialist.price,
									)}
								</p>
							</div>
							<Link
								href={HOSPITAL_DOCTORS_BOOK_PAGE(hospitalId, doctorId)}
								className="flex items-center w-full justify-between rounded-full py-4 px-6 bg-monday-blue"
							>
								<span className="font-semibold text-lg leading-none text-white">
									Set Appointment
								</span>
								<img
									src="/assets/images/icons/arrow-right-circle-white.svg"
									className="flex size-6 shrink-0"
									alt="icon"
								/>
							</Link>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}
