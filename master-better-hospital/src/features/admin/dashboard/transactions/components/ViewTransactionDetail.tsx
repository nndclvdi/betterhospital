"use client";

import Topbar from "@/shared/components/Topbar";
import Link from "next/link";
import React, { useState } from "react";
import { getImageUrl } from "@/shared/utils/image";
import { dateFormat } from "@/shared/utils/date-formatter";
import { formatRupiah } from "@/shared/utils/rupiahFormatter";
import { StatusBgColor, StatusText } from "@/shared/constants/status-text";
import type { Transaction } from "../../../../../../generated/prisma";
import { useUpdateTransaction } from "../api/update-transaction";
import { useRouter } from "next/navigation";

type ViewTransactionDetailProps = {
	data: Transaction & {
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
		user: {
			name: string;
			photo: string;
			gender: string;
		};
	};
};

export default function ViewTransactionDetail({
	data,
}: ViewTransactionDetailProps) {
	const [showModal, setShowModal] = useState<boolean>(false);
	const { mutateAsync: approveTransaction, isPending } = useUpdateTransaction();
	const router = useRouter();

	const handleShowModal = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const handleApproveTransaction = async () => {
		await approveTransaction({
			id: data.id,
			isApproved: true,
		});
		router.refresh();
	};

	const handleRejectTransaction = async () => {
		await approveTransaction({
			id: data.id,
			isApproved: false,
		});
		router.refresh();
	};

	return (
		<>
			<div id="Content" className="flex flex-col flex-1 p-6 pt-0">
				<Topbar>
					<div className="flex flex-col gap-2 w-full">
						<h1 className="font-bold text-2xl capitalize">
							Transaction Details
						</h1>
						<Link
							href="/dashboard/manager/transactions"
							className="flex items-center gap-1 font-semibold text-monday-gray text-lg leading-none"
						>
							<img
								src="/assets/images/icons/arrow-left-grey.svg"
								className="size-[18px] flex shrink-0"
								alt="icon"
							/>
							Manage Transactions
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
						id="Transaction-info"
						className="flex items-center justify-between gap-5 rounded-[20px] p-5 bg-white"
					>
						<div className="flex items-center gap-4 w-full">
							<div className="flex size-[92px] rounded-full bg-monday-background overflow-hidden shrink-0">
								<img
									src={getImageUrl(data.user.photo, "patients")}
									className="size-full object-cover"
									alt="user-photo"
								/>
							</div>
							<div className="flex flex-col gap-[6px] flex-1">
								<p className="font-semibold text-xl line-clamp-1">
									{data.user.name}
								</p>
								<p className="flex items-center gap-1 font-medium text-monday-gray text-lg leading-none">
									<img
										src="/assets/images/icons/woman-grey.svg"
										className="size-6"
										alt="icon"
									/>
									{data.user.gender}
								</p>
							</div>
						</div>
						<div className="flex items-center gap-4 w-full">
							<div className="flex size-[92px] rounded-2xl bg-monday-background overflow-hidden shrink-0 p-[10px]">
								<img
									src="/assets/images/thumbnails/heart.png"
									className="size-full object-cover"
									alt="icon"
								/>
							</div>
							<div className="flex flex-col gap-[6px] flex-1">
								<p className="font-semibold text-xl line-clamp-1">
									{data.specialist.name}
								</p>
								<p className="flex items-center gap-1 font-medium text-monday-gray text-lg leading-none">
									<img
										src="/assets/images/icons/hospital-grey.svg"
										className="size-6"
										alt="icon"
									/>
									{data.hospital.name}
								</p>
							</div>
						</div>
						<p
							className={`badge flex w-[100px] shrink-0 rounded-full py-3 items-center justify-center text-white font-bold text-sm leading-none ${StatusBgColor[data.status]}`}
						>
							{StatusText[data.status]}
						</p>
					</section>
					<div className="flex gap-5 flex-1">
						<section
							id="Booking-Details"
							className="flex flex-col gap-5 w-[calc((550/960)*100%)] shrink-0"
						>
							{data.status === "FAILED" && (
								<div
									id="Note-Red"
									className="relative w-full h-[92px] rounded-[20px] overflow-hidden"
								>
									<div className="absolute w-full h-full overflow-hidden">
										<img
											src="/assets/images/backgrounds/red-note.svg"
											className="w-full h-full object-cover"
											alt="background"
										/>
									</div>
									<div className="relative flex items-center w-full h-full p-5 gap-[10px]">
										<img
											src="/assets/images/icons/note-remove-white-fill.svg"
											className="flex size-[52px] shrink-0"
											alt="icon"
										/>
										<p className="font-semibold text-lg leading-[1.4em] text-white">
											Sorry, the doctor isn't available. We're processing your
											refund now.
										</p>
									</div>
								</div>
							)}
							{data.status === "SUCCESS" && (
								<div
									id="Note-Green"
									className="relative w-full h-[92px] rounded-[20px] overflow-hidden"
								>
									<div className="absolute w-full h-full overflow-hidden">
										<img
											src="/assets/images/backgrounds/green-note.svg"
											className="w-full h-full object-cover"
											alt="background"
										/>
									</div>
									<div className="relative flex items-center w-full h-full p-5 gap-[10px]">
										<img
											src="/assets/images/icons/stickynote-white-fill.svg"
											className="flex size-[52px] shrink-0"
											alt="icon"
										/>
										<p className="font-semibold text-lg leading-[1.4em] text-white">
											Appointment approved. The doctor has confirmed their
											availability 😄{" "}
										</p>
									</div>
								</div>
							)}
							<div className="flex flex-col h-fit w-full rounded-[20px] p-5 gap-5 bg-white">
								<p className="header font-semibold text-xl">Booking Details</p>
								<div className="flex flex-col gap-4">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-4 w-full">
											<div className="flex size-[92px] rounded-full bg-monday-background overflow-hidden shrink-0">
												<img
													src={getImageUrl(data.doctor.photo, "doctors")}
													className="size-full object-cover"
													alt="doctor-photo"
												/>
											</div>
											<div className="flex flex-col gap-[6px] flex-1">
												<p className="font-semibold text-xl">
													{data.doctor.name}
												</p>
												<p className="flex items-center gap-1 font-medium text-monday-gray text-lg">
													<img
														src="/assets/images/icons/stetoscop-grey.svg"
														className="size-5"
														alt="icon"
													/>
													{data.specialist.name}
												</p>
											</div>
										</div>
										<div className="flex flex-col justify-center text-right gap-2 shrink-0">
											<p className="flex items-center gap-0.5 font-semibold text-lg leading-none text-nowrap">
												<img
													src="/assets/images/icons/briefcase-blue-fill.svg"
													className="size-5"
													alt="icon"
												/>
												12 years
											</p>
											<p className="font-medium text-lg text-monday-gray leading-none">
												Experience
											</p>
										</div>
									</div>
									<div className="flex flex-col rounded-2xl border border-monday-stroke p-5 gap-5">
										<div className="flex items-center justify-between">
											<p className="flex items-center gap-[6px] font-medium text-monday-gray text-lg leading-none">
												<img
													src="/assets/images/icons/calendar-2-grey.svg"
													className="size-6"
													alt="icon"
												/>
												Date
											</p>
											<p className="font-semibold text-xl leading-none">
												{dateFormat(data.booking_date, "DD MMMM YYYY")}
											</p>
										</div>
										<div className="flex items-center justify-between">
											<p className="flex items-center gap-[6px] font-medium text-monday-gray text-lg leading-none">
												<img
													src="/assets/images/icons/clock-grey.svg"
													className="size-6"
													alt="icon"
												/>
												Time
											</p>
											<p className="font-semibold text-xl leading-none">
												{dateFormat(data.booking_date, "HH:mm")}
											</p>
										</div>
										<div className="flex items-center justify-between">
											<p className="flex items-center gap-[6px] font-medium text-monday-gray text-lg leading-none">
												<img
													src="/assets/images/icons/ticket-expired-grey.svg"
													className="size-6"
													alt="icon"
												/>
												Price
											</p>
											<p className="font-semibold text-xl leading-none">
												{formatRupiah(data.subtotal)}
											</p>
										</div>
										<div className="flex items-center justify-between">
											<p className="flex items-center gap-[6px] font-medium text-monday-gray text-lg leading-none">
												<img
													src="/assets/images/icons/receipt-2-grey.svg"
													className="size-6"
													alt="icon"
												/>
												Tax 11%
											</p>
											<p className="font-semibold text-xl leading-none">
												{formatRupiah(data.tax_fee)}
											</p>
										</div>
										<hr className="border-monday-stroke" />
										<div className="flex items-center justify-between">
											<p className="flex items-center gap-[6px] font-medium text-monday-gray text-lg leading-none">
												<img
													src="/assets/images/icons/receipt-text-grey.svg"
													className="size-6"
													alt="icon"
												/>
												Grand Total
											</p>
											<p className="font-semibold text-2xl leading-none">
												{formatRupiah(Number(data.total))}
											</p>
										</div>
									</div>
								</div>
								<div className="flex flex-col gap-2">
									<p className="header font-semibold text-xl">
										Proof of Payment
									</p>
									<div className="relative w-full h-[333px] rounded-2xl overflow-hidden bg-monday-gray-background">
										<img
											src={getImageUrl(data.proof, "payment")}
											className="size-full object-cover"
											alt="proof"
										/>
										<button
											type="button"
											onClick={handleShowModal}
											className="absolute transform -translate-x-1/2 left-1/2 bottom-3 flex items-center justify-center rounded-full py-[10px] px-3 gap-[6px] bg-white"
										>
											<img
												src="/assets/images/icons/maximize-3-black.svg"
												className="size-5 flex shrink-0"
												alt="icon"
											/>
											<p className="font-extrabold text-sm leading-none">
												PREVIEW
											</p>
										</button>
									</div>
								</div>
								{data.status === "PENDING" && (
									<div className="flex flex-col gap-4">
										<button
											type="button"
											disabled={isPending}
											onClick={handleApproveTransaction}
											className="btn point btn-primary font-semibold text-lg leading-none"
										>
											{isPending ? "Loading..." : "Approve Order"}
										</button>
										<button
											type="button"
											disabled={isPending}
											onClick={handleRejectTransaction}
											className="btn bg-monday-red/10 text-monday-red rounded-2xl font-semibold text-lg leading-none"
										>
											{isPending ? "Loading..." : "Reject Order"}
										</button>
									</div>
								)}
							</div>
						</section>
						<section
							id="Hospital-Details"
							className="flex flex-col h-fit w-full rounded-[20px] p-5 gap-6 bg-white"
						>
							<p className="header font-semibold text-xl">Hospital Details</p>
							<div className="flex items-center gap-4 w-full">
								<div className="flex size-[92px] rounded-2xl bg-monday-background overflow-hidden shrink-0">
									<img
										src={getImageUrl(data.hospital.photo, "hospitals")}
										className="size-full object-cover"
										alt="hospital-photo"
									/>
								</div>
								<div className="flex flex-col gap-2 flex-1">
									<p className="font-semibold text-xl line-clamp-1">
										{data.hospital.name}
									</p>
									<p className="flex items-center gap-1 font-medium text-monday-gray text-lg leading-none">
										<img
											src="/assets/images/icons/location-grey.svg"
											className="size-6"
											alt="icon"
										/>
										{data.hospital.city}
									</p>
									<p className="flex items-center gap-0.5 font-semibold text-lg leading-none">
										<img
											src="/assets/images/icons/star-sliced.svg"
											className="size-6"
											alt="icon"
										/>
										4.8/5.0
									</p>
								</div>
							</div>
							<div className="w-full h-[290px] overflow-hidden rounded-3xl resize-none">
								<div id="g-mapdisplay" className="size-full">
									<iframe
										className="size-full border-none"
										title="maps"
										src="https://www.google.com/maps/embed/v1/place?q=Jakarta&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
									/>
								</div>
							</div>
							<p className="font-semibold text-lg leading-[1.6em]">
								{data.hospital.address}
							</p>
						</section>
					</div>
				</main>
			</div>

			{showModal && (
				<div
					id="Preview-Modal"
					className="modal flex flex-1 items-center justify-center h-full fixed top w-full"
				>
					<div
						data-close-modal
						className="backdrop absolute w-full h-full bg-[#292D32B2]"
					/>
					<div className="relative flex flex-col w-[720px] h-fit m-auto items-center justify-center gap-8">
						<div className="flex w-full items-center justify-center">
							<div className="rounded-2xl overflow-hidden size-auto">
								<img
									src={getImageUrl(data.proof, "payment")}
									className="w-full h-full object-contain max-h-[80vh]"
									alt="proof of payment"
								/>
							</div>
						</div>
						<button
							type="button"
							onClick={handleCloseModal}
							className="flex items-center w-fit h-12 rounded-full border border-white/10 bg-white/10 py-3 px-4 gap-2"
						>
							<img
								src="/assets/images/icons/close-circle-white.svg"
								className="flex size-6 shrink-0"
								alt="icon"
							/>
							<p className="font-medium text-white">Close Preview</p>
						</button>
					</div>
				</div>
			)}
		</>
	);
}
