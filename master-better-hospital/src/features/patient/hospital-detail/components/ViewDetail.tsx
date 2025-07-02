import Link from "next/link";
import React from "react";
import { getHospital } from "../services/get-hospital";
import { getImageUrl } from "@/shared/utils/image";
import { redirect } from "next/navigation";
import {
	BROWSE_SPECIALIST_PAGE,
	HOSPITAL_DOCTORS_PAGE,
} from "@/shared/constants/uri-fe-page";

interface HospitalDetailViewProps {
	id: string;
}

export default async function HospitalDetailView({
	id,
}: HospitalDetailViewProps) {
	const data = await getHospital(id);

	if (data === null) {
		return redirect(BROWSE_SPECIALIST_PAGE);
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
								href="mobile-hospital-specialist.html"
								className="size-11 flex shrink-0"
							>
								<img
									src="/assets/images/icons/mobile-back-button.svg"
									className="size-full"
									alt="icon"
								/>
							</Link>
							<h1 className="font-bold text-lg leading-none text-center">
								Hospital Details
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
					<div
						id="Thumbnail"
						className="relative w-full h-[460px] overflow-hidden bg-monday-background"
					>
						<div className="absolute z-10 w-full h-[100px] bg-[linear-gradient(180deg,rgba(7,14,30,0.5)_0%,rgba(7,14,30,0)_100%)]" />
						<img
							src={getImageUrl(data?.photo, "hospitals")}
							className="size-full object-cover"
							alt="icon"
						/>
					</div>
					<div className="flex flex-col w-full py-6 px-5 bg-white gap-8">
						<div className="flex flex-col gap-3">
							<div className="flex items-center gap-2">
								<div className="flex items-center rounded-full w-fit h-fit shrink-0 bg-monday-orange py-[6px] px-[10px] gap-0.5">
									<img
										src="/assets/images/icons/star-sliced-white.svg"
										className="flex size-5 shrink-0"
										alt="icon"
									/>
									<p className="font-semibold leading-none text-white">4.8</p>
								</div>
								<p className="font-semibold text-lg leading-none text-monday-gray">
									2040 Reviews
								</p>
							</div>
							<div className="flex flex-col gap-[6px]">
								<p className="font-bold text-2xl leading-none">{data.name}</p>
								<div className="flex items-center gap-1">
									<img
										src="/assets/images/icons/location-grey.svg"
										className="flex size-6 shrink-0"
										alt="icon"
									/>
									<p className="font-semibold text-lg text-monday-gray">
										{data.city} (320125)
									</p>
								</div>
							</div>
						</div>
						<hr className="border-monday-stroke" />
						<div className="flex flex-col gap-2">
							<p className="font-bold leading-none">About Hospital</p>
							<p className="font-medium leading-[1.6em] text-monday-gray">
								{data.about}
							</p>
						</div>
						<div className="flex flex-col gap-4">
							<div className="flex items-center justify-between">
								<h2 className="font-bold">Popular Facilities</h2>
								<Link
									href="mobile-browse-specialist.html"
									className="rounded-full border border-monday-stroke py-3 px-4 font-bold text-xs leading-none text-monday-gray"
								>
									VIEW ALL
								</Link>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="card flex flex-col rounded-2xl border border-monday-stroke py-5 px-4 bg-white gap-6">
									<div className="flex size-12 rounded-xl bg-monday-blue/10 overflow-hidden shrink-0 items-center justify-center">
										<img
											src="/assets/images/icons/house-blue.svg"
											className="size-6 object-contain"
											alt="icon"
										/>
									</div>
									<div className="flex flex-col gap-1">
										<p className="font-semibold">Inpatient room</p>
										<p className="font-medium text-sm text-monday-gray leading-none">
											Rest with Family.
										</p>
									</div>
								</div>
								<div className="card flex flex-col rounded-2xl border border-monday-stroke py-5 px-4 bg-white gap-6">
									<div className="flex size-12 rounded-xl bg-monday-blue/10 overflow-hidden shrink-0 items-center justify-center">
										<img
											src="/assets/images/icons/help-desk-blue.svg"
											className="size-6 object-contain"
											alt="icon"
										/>
									</div>
									<div className="flex flex-col gap-1">
										<p className="font-semibold">Room Services</p>
										<p className="font-medium text-sm text-monday-gray leading-none">
											All Good, Enjoy!
										</p>
									</div>
								</div>
								<div className="card flex flex-col rounded-2xl border border-monday-stroke py-5 px-4 bg-white gap-6">
									<div className="flex size-12 rounded-xl bg-monday-blue/10 overflow-hidden shrink-0 items-center justify-center">
										<img
											src="/assets/images/icons/wifi-square-blue.svg"
											className="size-6 object-contain"
											alt="icon"
										/>
									</div>
									<div className="flex flex-col gap-1">
										<p className="font-semibold">Free WiFi</p>
										<p className="font-medium text-sm text-monday-gray leading-none">
											High speed Wi-Fi.
										</p>
									</div>
								</div>
								<div className="card flex flex-col rounded-2xl border border-monday-stroke py-5 px-4 bg-white gap-6">
									<div className="flex size-12 rounded-xl bg-monday-blue/10 overflow-hidden shrink-0 items-center justify-center">
										<img
											src="/assets/images/icons/weight-blue.svg"
											className="size-6 object-contain"
											alt="icon"
										/>
									</div>
									<div className="flex flex-col gap-1">
										<p className="font-semibold">Gym Center</p>
										<p className="font-medium text-sm text-monday-gray leading-none">
											Always stay fit.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="flex items-center rounded-2xl p-4 bg-white gap-2 mx-5 mt-5">
						<div className="flex size-[52px] rounded-full bg-monday-background overflow-hidden shrink-0">
							<img
								src="/assets/images/photos/user-6.png"
								className="size-full object-cover"
								alt="icon"
							/>
						</div>
						<div className="flex flex-col gap-[6px] w-full overflow-hidden">
							<div className="flex items-center gap-1 text-nowrap">
								<p className="font-bold truncate">Rosamina Baro</p>
								<img
									src="/assets/images/icons/verify-blue-fill.svg"
									className="flex size-5 shrink-0"
									alt="icon"
								/>
							</div>
							<p className="font-semibold text-monday-gray leading-none">
								Hospital CS
							</p>
						</div>
						<Link href="#" className="flex size-11 shrink-0">
							<img
								src="/assets/images/icons/call-circle-blue-fill.svg"
								className="flex size-11 shrink-0"
								alt="icon"
							/>
						</Link>
					</div>
					<div className="flex flex-col w-full py-6 px-5 bg-white gap-4 mt-5">
						<p className="font-bold leading-none">Hospital Address</p>
						<div className="w-full h-[270px] overflow-hidden rounded-[20px] resize-none">
							<div id="g-mapdisplay" className="size-full">
								<iframe
									title="hospital-map"
									className="size-full border-none"
									frameBorder="0"
									src={`https://www.google.com/maps/embed/v1/place?q=${data?.city}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`}
								/>
							</div>
						</div>
						<p className="font-semibold leading-[1.6em]">{data.address}</p>
					</div>
					<div id="Bottom-Bar" className="flex relative w-full h-[104px] mt-5">
						<div className="fixed z-30 bottom-0 w-full max-w-[640px] px-5 py-6 bg-white border-t border-monday-stroke">
							<Link
								href={HOSPITAL_DOCTORS_PAGE(data.id)}
								className="flex items-center w-full justify-between rounded-full py-4 px-6 bg-monday-blue"
							>
								<span className="font-semibold text-lg leading-none text-white">
									Choose Available Doctors
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
