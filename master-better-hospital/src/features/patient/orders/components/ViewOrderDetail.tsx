"use client";

import Link from "next/link";
import React, { useState } from "react";
import { getImageUrl } from "@/shared/utils/image";
import { dateFormat } from "@/shared/utils/date-formatter";
import { formatRupiah } from "@/shared/utils/rupiahFormatter";
import ModalProof from "./ModalProof";
import { ORDERS_PAGE } from "@/shared/constants/uri-fe-page";

type Order = {
	id: string;
	status: "PENDING" | "SUCCESS" | "FAILED";
	subtotal: number;
	tax_fee: number;
	total: number;
	booking_date: Date;
	proof: string;
	hospital: {
		name: string;
		photo: string;
		city: string;
		postal_code: string;
		address: string;
	};
	specialist: {
		name: string;
	};
	doctor: {
		name: string;
		photo: string;
	};
};

type ViewOrderDetailProps = {
	order: Order;
};

export default function ViewOrderDetail({ order }: ViewOrderDetailProps) {
	const [showModal, setShowModal] = useState<boolean>(false);

	return (
		<>
			<div
				id="Mobile-Body"
				className="flex flex-col flex-1 bg-[#dae1e9] min-w-0"
			>
				<div
					id="Content-Container"
					className="flex flex-col min-h-screen w-full max-w-[640px] mx-auto bg-monday-background"
				>
					<div id="Top-Nav" className="flex relative w-full h-[128px]">
						<div className="fixed z-30 top-0 w-full max-w-[640px] px-5 pt-8">
							<div className="flex items-center justify-between h-[76px] bg-white rounded-2xl p-4 gap-5 drop-shadow-sm">
								<Link href={ORDERS_PAGE} className="size-11 flex shrink-0">
									<img
										src="/assets/images/icons/mobile-back-button.svg"
										className="size-full"
										alt="icon"
									/>
								</Link>
								<h1 className="font-bold text-lg leading-none text-center">
									Order Details
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
						<div id="status" className="w-full max-w-[640px] relative px-5">
							{order.status === "FAILED" && (
								<div
									id="Note-Red"
									className="relative w-full min-h-16 rounded-t-[20px] overflow-hidden"
								>
									<div className="absolute w-[inherit] h-full overflow-hidden">
										<img
											src="/assets/images/backgrounds/mobile-red-note.svg"
											className="w-full h-full object-cover object-right"
											alt="background"
										/>
									</div>
									<div className="relative flex items-center w-full h-full p-5 gap-[10px]">
										<img
											src="/assets/images/icons/note-remove-white-fill.svg"
											className="flex size-6 shrink-0"
											alt="icon"
										/>
										<p className="font-bold text-sm leading-[1.4em] text-white">
											Booking declined. Refund on the way
										</p>
									</div>
								</div>
							)}
							{order.status === "SUCCESS" && (
								<div
									id="Note-Green"
									className="relative w-full min-h-16 rounded-t-[20px] overflow-hidden"
								>
									<div className="absolute w-[inherit] h-full overflow-hidden">
										<img
											src="/assets/images/backgrounds/light-green-note.svg"
											className="w-full h-full object-cover object-right"
											alt="background"
										/>
									</div>
									<div className="relative flex items-center w-full h-full p-5 gap-[10px]">
										<img
											src="/assets/images/icons/calendar-tick-white-fill.svg"
											className="flex size-6 shrink-0"
											alt="icon"
										/>
										<p className="font-bold text-sm leading-[1.4em] text-white">
											Doctor confirmed. See you soon!
										</p>
									</div>
								</div>
							)}
						</div>
						<div className="flex flex-col w-full flex-1 p-5 pt-8 gap-8 bg-white">
							<div className="flex flex-col gap-4">
								<p className="font-bold">Booking Review</p>
								<div className="flex flex-col rounded-2xl border border-monday-stroke p-5 px-4 gap-4">
									<div className="flex items-center gap-4">
										<div className="flex size-16 rounded-full bg-monday-background overflow-hidden shrink-0">
											<img
												src={getImageUrl(order.doctor.photo, "doctors")}
												className="size-full object-cover"
												alt="icon"
											/>
										</div>
										<div className="flex flex-col gap-[6px] w-full">
											<p className="font-semibold">{order.doctor.name}</p>
											<div className="flex items-center gap-1 text-nowrap">
												<img
													src="/assets/images/icons/stetoscop-grey.svg"
													className="flex size-5 shrink-0"
													alt="icon"
												/>
												<p className="font-semibold text-monday-gray leading-none">
													{order.specialist.name}
												</p>
											</div>
										</div>
										<div className="flex items-center rounded-full w-fit h-fit shrink-0 bg-monday-orange py-[6px] px-[10px] gap-0.5">
											<img
												src="/assets/images/icons/star-sliced-white.svg"
												className="flex size-5 shrink-0"
												alt="icon"
											/>
											<p className="font-semibold leading-none text-white">
												5.0
											</p>
										</div>
									</div>
									<hr className="border-monday-stroke" />
									<div className="flex flex-col gap-4">
										{order.status === "PENDING" && (
											<div className="flex items-center justify-between">
												<p className="flex items-center gap-[6px] font-medium text-monday-gray leading-none">
													<img
														src="/assets/images/icons/timer-grey.svg"
														className="size-5"
														alt="icon"
													/>
													Status
												</p>
												<p className="rounded-[4px] py-[6px] px-2 bg-monday-orange/10 font-bold text-monday-orange">
													Waiting
												</p>
											</div>
										)}
										{order.status === "SUCCESS" && (
											<div className="flex items-center justify-between">
												<p className="flex items-center gap-[6px] font-medium text-monday-gray leading-none">
													<img
														src="/assets/images/icons/timer-grey.svg"
														className="size-5"
														alt="icon"
													/>
													Status
												</p>
												<p className="rounded-[4px] py-[6px] px-2 bg-monday-green/10 font-bold text-monday-green">
													Approved
												</p>
											</div>
										)}
										{order.status === "FAILED" && (
											<div className="flex items-center justify-between">
												<p className="flex items-center gap-[6px] font-medium text-monday-gray leading-none">
													<img
														src="/assets/images/icons/timer-grey.svg"
														className="size-5"
														alt="icon"
													/>
													Status
												</p>
												<p className="rounded-[4px] py-[6px] px-2 bg-monday-red/10 font-bold text-monday-red">
													Rejected
												</p>
											</div>
										)}
										<div className="flex items-center justify-between">
											<p className="flex items-center gap-[6px] font-medium text-monday-gray leading-none">
												<img
													src="/assets/images/icons/note-text-grey.svg"
													className="size-5"
													alt="icon"
												/>
												Order ID
											</p>
											<p className="font-bold leading-none">
												{order.id.split("").splice(0, 4).join("").toUpperCase()}
											</p>
										</div>
										<div className="flex items-center justify-between">
											<p className="flex items-center gap-[6px] font-medium text-monday-gray leading-none">
												<img
													src="/assets/images/icons/calendar-2-grey.svg"
													className="size-5"
													alt="icon"
												/>
												Date
											</p>
											<p className="font-bold leading-none">
												{dateFormat(order.booking_date, "DD MMMM YYYY")}
											</p>
										</div>
										<div className="flex items-center justify-between">
											<p className="flex items-center gap-[6px] font-medium text-monday-gray leading-none">
												<img
													src="/assets/images/icons/clock-grey.svg"
													className="size-5"
													alt="icon"
												/>
												Time
											</p>
											<p className="font-bold leading-none">
												{dateFormat(order.booking_date, "HH:mm")}
											</p>
										</div>
										<div className="flex items-center justify-between">
											<p className="flex items-center gap-[6px] font-medium text-monday-gray leading-none">
												<img
													src="/assets/images/icons/ticket-expired-grey.svg"
													className="size-5"
													alt="icon"
												/>
												Price
											</p>
											<p className="font-bold leading-none">
												{formatRupiah(order.subtotal)}
											</p>
										</div>
										<div className="flex items-center justify-between">
											<p className="flex items-center gap-[6px] font-medium text-monday-gray leading-none">
												<img
													src="/assets/images/icons/money-grey.svg"
													className="size-5"
													alt="icon"
												/>
												Sub Total
											</p>
											<p className="font-bold leading-none">
												{formatRupiah(order.subtotal)}
											</p>
										</div>
										<div className="flex items-center justify-between">
											<p className="flex items-center gap-[6px] font-medium text-monday-gray leading-none">
												<img
													src="/assets/images/icons/receipt-2-grey.svg"
													className="size-5"
													alt="icon"
												/>
												Tax 11%
											</p>
											<p className="font-bold leading-none">
												{formatRupiah(order.tax_fee)}
											</p>
										</div>
										<hr className="border-monday-stroke" />
										<div className="flex items-center justify-between">
											<p className="flex items-center gap-[6px] font-medium text-monday-gray leading-none">
												<img
													src="/assets/images/icons/receipt-text-grey.svg"
													className="size-5"
													alt="icon"
												/>
												Grand Total
											</p>
											<p className="font-bold text-lg leading-none text-monday-red">
												{formatRupiah(Number(order.total))}
											</p>
										</div>
									</div>
								</div>
							</div>
							<div className="flex flex-col gap-4">
								<p className="font-bold">Hospital Details</p>
								<div className="flex flex-col rounded-2xl border border-monday-stroke p-5 px-4 gap-4">
									<div className="flex items-center gap-4">
										<div className="flex size-16 rounded-2xl bg-monday-background overflow-hidden shrink-0">
											<img
												src={getImageUrl(order.hospital.photo, "hospitals")}
												className="size-full object-cover"
												alt="icon"
											/>
										</div>
										<div className="flex flex-col gap-[6px] w-full overflow-hidden">
											<p className="font-semibold text-lg">
												{order.hospital.name}
											</p>
											<div className="flex items-center gap-1 text-nowrap">
												<img
													src="/assets/images/icons/location-grey.svg"
													className="flex size-5 shrink-0"
													alt="icon"
												/>
												<p className="font-semibold text-monday-gray truncate">
													{order.hospital.city} ({order.hospital.postal_code})
												</p>
											</div>
										</div>
										<div className="flex items-center rounded-full w-fit h-fit shrink-0 bg-monday-orange py-[6px] px-[10px] gap-0.5">
											<img
												src="/assets/images/icons/star-sliced-white.svg"
												className="flex size-5 shrink-0"
												alt="icon"
											/>
											<p className="font-semibold leading-none text-white">
												4.8
											</p>
										</div>
									</div>
									<hr className="border-monday-stroke" />
									<div className="w-full h-[270px] overflow-hidden rounded-[20px] resize-none">
										<div id="g-mapdisplay" className="size-full">
											<iframe
												title="map"
												className="size-full border-none"
												frameBorder="0"
												src="https://www.google.com/maps/embed/v1/place?q=Jakarta&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
											/>
										</div>
									</div>
									<p className="font-medium leading-[1.6em] text-monday-gray">
										{order.hospital.address}
									</p>
								</div>
							</div>
							<div className="flex flex-col gap-4">
								<p className="font-bold">Proof of Payment</p>
								<div className="flex flex-col rounded-2xl border border-monday-stroke p-5 px-4 gap-5">
									<div className="flex flex-col gap-4">
										<div className="flex items-center justify-between">
											<p className="flex items-center gap-[6px] font-medium text-monday-gray leading-none">
												<img
													src="/assets/images/icons/calendar-2-grey.svg"
													className="size-5"
													alt="icon"
												/>
												Bank Name
											</p>
											<p className="font-bold leading-none">BWA BANK</p>
										</div>
										<div className="flex items-center justify-between">
											<p className="flex items-center gap-[6px] font-medium text-monday-gray leading-none">
												<img
													src="/assets/images/icons/clock-grey.svg"
													className="size-5"
													alt="icon"
												/>
												Bank Account
											</p>
											<p className="font-bold leading-none">Bimore Care</p>
										</div>
										<div className="flex items-center justify-between">
											<p className="flex items-center gap-[6px] font-medium text-monday-gray leading-none">
												<img
													src="/assets/images/icons/ticket-expired-grey.svg"
													className="size-5"
													alt="icon"
												/>
												Bank Number
											</p>
											<p className="font-bold leading-none">555 300 2003</p>
										</div>
									</div>
									<div className="relative flex w-full h-[218px] rounded-[20px] shrink-0 overflow-hidden">
										<img
											id="Thumbnail"
											src={getImageUrl(order.proof, "payment")}
											className="relative size-full object-cover"
											alt="icon"
										/>
										<button
											type="button"
											onClick={() => setShowModal(true)}
											className="absolute transform -translate-x-1/2 left-1/2 bottom-3 flex items-center justify-center rounded-full py-[10px] px-3 gap-[6px] bg-white"
										>
											<img
												src="/assets/images/icons/maximize-3-black.svg"
												className="size-5 flex shrink-0"
												alt="icon"
											/>
											<p className="font-semibold text-sm leading-none">
												PREVIEW
											</p>
										</button>
									</div>
								</div>
							</div>
							<div
								id="Bottom-Bar"
								className="flex relative w-full h-[104px] -ml-5"
							>
								<div className="fixed z-30 bottom-0 w-full max-w-[640px] px-5 py-6 bg-white border-t border-monday-stroke">
									<Link
										href="/customer-service"
										className="flex items-center w-full justify-center gap-[6px] rounded-full py-4 px-6 bg-monday-blue/10 disabled:bg-monday-stroke"
									>
										<span className="font-semibold text-lg leading-none text-monday-blue">
											Customer Services
										</span>
										<img
											src="/assets/images/icons/messages-blue.svg"
											className="flex size-6 shrink-0"
											alt="icon"
										/>
									</Link>
								</div>
							</div>
						</div>
					</main>
				</div>
			</div>
			{showModal && (
				<ModalProof
					imageUrl={getImageUrl(order.proof, "payment")}
					onClose={() => setShowModal(false)}
				/>
			)}
		</>
	);
}
