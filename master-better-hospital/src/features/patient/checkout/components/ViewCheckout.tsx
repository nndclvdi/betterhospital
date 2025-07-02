"use client";

import { useCheckout } from "@/shared/states/checkout";
import Link from "next/link";
import React, { useRef } from "react";
import { useDetailCheckout } from "../api/get-detail-checkout";
import { redirect, useRouter } from "next/navigation";
import {
	BOOK_APPOINTMENT_SUCCESS,
	HOME_PAGE,
} from "@/shared/constants/uri-fe-page";
import DoctorCard from "../../hospital-detail/components/DoctorCard";
import { getImageUrl } from "@/shared/utils/image";
import { dateFormat } from "@/shared/utils/date-formatter";
import { formatRupiah } from "@/shared/utils/rupiahFormatter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateOrder } from "../api/create-order";
import dayjs from "dayjs";

const fileSchema = z.object({
	proof: z.instanceof(File).refine((file) => file?.type.includes("image"), {
		message: "File must be image",
	}),
});

type FileSchema = z.infer<typeof fileSchema>;

export default function ViewCheckout() {
	const uploadRef = useRef<HTMLInputElement>(null);
	const { data } = useCheckout();
	const { data: checkout, isLoading } = useDetailCheckout({
		doctor_id: data?.doctor_id ?? "",
		hospital_id: data?.hospital_id ?? "",
	});
	const { mutateAsync, isPending } = useCreateOrder();
	const router = useRouter();

	const {
		handleSubmit,
		formState: { errors },
		watch,
		setValue,
	} = useForm<FileSchema>({
		resolver: zodResolver(fileSchema),
	});

	const proofImg = watch("proof");

	if (isLoading) {
		return null;
	}

	if (!checkout) {
		return redirect(HOME_PAGE);
	}

	const doctor = checkout.doctor;
	const hospital = checkout.hospital_specialist.hospital;

	const onSubmit = async (val: FileSchema) => {
		try {
			const formData = new FormData();

			const subtotal = checkout.hospital_specialist.specialist.price;
			const tax_fee =
				(checkout.hospital_specialist.specialist.price * 11) / 100;
			const total = subtotal + tax_fee;

			formData.append("booking_date", dayjs(data?.booking_date).toISOString());
			formData.append("proof", val.proof);
			formData.append("subtotal", subtotal.toString());
			formData.append("tax_fee", tax_fee.toString());
			formData.append("total", total.toString());
			formData.append("hospital_id", data?.hospital_id ?? "");
			formData.append("doctor_id", data?.doctor_id ?? "");

			const response = await mutateAsync(formData);

			router.push(BOOK_APPOINTMENT_SUCCESS(response.id));
		} catch (error) {
			console.log(error);
		}
	};

	console.log(errors);

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
								href="mobile-book-doctors.html"
								className="size-11 flex shrink-0"
							>
								<img
									src="/assets/images/icons/mobile-back-button.svg"
									className="size-full"
									alt="icon"
								/>
							</Link>
							<h1 className="font-bold text-lg leading-none text-center">
								Review & Checkout
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
					<div className="p-5">
						<DoctorCard
							clickable={false}
							data={{
								experience: doctor.experience,
								gender: doctor.gender,
								id: doctor.id,
								name: doctor.name,
								photo: doctor.photo,
								specialist: checkout.hospital_specialist.specialist.name,
							}}
							hospital_id={data?.hospital_id ?? ""}
						/>
					</div>
					<div
						id="Checkout-Details"
						className="flex flex-col w-full flex-1 p-5 pb-0 gap-4 bg-white mt-5 min-h-[536px]"
					>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="flex flex-col gap-8"
						>
							<div className="flex flex-col gap-4">
								<p className="font-bold">Booking Details</p>
								<div className="flex flex-col rounded-2xl border border-monday-stroke">
									<div className="flex items-center gap-4 p-5 px-4">
										<div className="flex size-16 rounded-2xl bg-monday-background overflow-hidden shrink-0">
											<img
												src={getImageUrl(hospital.photo, "hospitals")}
												className="size-full object-cover"
												alt="icon"
											/>
										</div>
										<div className="flex flex-col gap-[6px] w-full overflow-hidden">
											<p className="font-bold">{hospital.name}</p>
											<div className="flex items-center gap-1 text-nowrap">
												<img
													src="/assets/images/icons/location-grey.svg"
													className="flex size-5 shrink-0"
													alt="icon"
												/>
												<p className="font-semibold text-monday-gray truncate">
													{hospital.city} ({hospital.postal_code})
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
									<div className="flex flex-col p-5 px-4 gap-4">
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
												{dateFormat(data?.booking_date ?? new Date())}
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
												{dateFormat(
													data?.booking_date ?? new Date(),
													"HH:mm A",
												)}
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
												{formatRupiah(
													checkout.hospital_specialist.specialist.price,
												)}
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
												{formatRupiah(
													checkout.hospital_specialist.specialist.price,
												)}
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
												{formatRupiah(
													(checkout.hospital_specialist.specialist.price * 11) /
														100,
												)}
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
												{formatRupiah(
													checkout.hospital_specialist.specialist.price +
														(checkout.hospital_specialist.specialist.price *
															11) /
															100,
												)}
											</p>
										</div>
									</div>
								</div>
							</div>
							<div className="flex flex-col gap-4">
								<p className="font-bold">Proof of Payment</p>
								<div className="flex flex-col rounded-2xl border border-monday-stroke p-5 px-4 gap-4">
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
									<div className="relative flex w-full h-[218px] rounded-[20px] shrink-0 overflow-hidden bg-monday-background">
										<div
											id="Add-Photo"
											className="absolute flex items-center justify-center rounded-[20px] size-full border-[1.5px] border-dashed border-monday-blue bg-monday-blue/10"
										>
											<button
												type="button"
												onClick={() => uploadRef.current?.click()}
												className="font-bold text-sm leading-none text-monday-blue text-center"
											>
												Add Proof of Payment +
											</button>
										</div>
										<input
											type="file"
											id="File-Input"
											accept="image/*"
											className="absolute inset-0 -z-10 cursor-pointer"
											ref={uploadRef}
											onChange={(e) => {
												if (e.target.files) {
													setValue("proof", e.target.files[0]);
												}
											}}
										/>
										{proofImg && (
											<>
												<img
													id="Thumbnail"
													src={URL.createObjectURL(proofImg)}
													className="relative size-full object-cover"
													alt="icon"
												/>
												<button
													type="button"
													id="Change-Photo"
													onClick={() => uploadRef.current?.click()}
													className="absolute rounded-full py-4 px-5 bg-monday-black text-nowrap font-bold text-sm text-white h-fit transform -translate-x-1/2 left-1/2 bottom-3  z-20"
												>
													Change Image
												</button>
											</>
										)}
									</div>
								</div>
							</div>
							<div
								id="Bottom-Bar"
								className="flex relative w-full h-[104px] -ml-5"
							>
								<div className="fixed z-30 bottom-0 w-full max-w-[640px] px-5 py-6 bg-white border-t border-monday-stroke">
									<button
										type="submit"
										disabled={Object.keys(errors).length > 0 || isPending}
										id="Submit-Btn"
										className="flex items-center w-full justify-between rounded-full py-4 px-6 bg-monday-blue disabled:bg-monday-stroke"
									>
										<span className="font-semibold text-lg leading-none text-white">
											{isPending ? "Loading..." : "Book Now"}
										</span>
										<img
											src="/assets/images/icons/arrow-right-circle-white.svg"
											className="flex size-6 shrink-0"
											alt="icon"
										/>
									</button>
									{errors.proof?.message && (
										<p className="mt-1 text-sm text-red-500">
											{errors.proof.message}
										</p>
									)}
								</div>
							</div>
						</form>
					</div>
				</main>
			</div>
		</div>
	);
}
