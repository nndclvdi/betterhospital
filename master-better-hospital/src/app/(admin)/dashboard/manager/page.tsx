import Topbar from "@/shared/components/Topbar";
import Link from "next/link";
import React from "react";
import { getStats } from "@/features/admin/dashboard/stats/services/get-stats";
import { redirect } from "next/navigation";
import { formatRupiah } from "@/shared/utils/rupiahFormatter";
import { getImageUrl } from "@/shared/utils/image";
import { dateFormat } from "@/shared/utils/date-formatter";
import { MANAGER_TRANSACTIONS_DETAIL_PAGE } from "@/shared/constants/uri-fe-page";

export default async function DashboardManagerPage() {
	const stats = await getStats();

	const {
		totalDoctors,
		totalHospitals,
		totalSpecialties,
		totalTransactions,
		totalRevenue,
		recentTransactions,
	} = stats;

	return (
		<div id="Content" className="flex flex-col flex-1 p-6 pt-0">
			<Topbar>
				<div className="flex flex-col gap-2 w-full">
					<h1 className="font-bold text-2xl capitalize">Dashboard Overview</h1>
					<p className="flex items-center gap-1 font-semibold text-monday-gray text-lg leading-none">
						<img
							src="/assets/images/icons/calendar-2-grey.svg"
							className="size-6 flex shrink-0"
							alt="icon"
						/>
						Tue, 26 April 2025
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
			</Topbar>
			<main className="flex flex-col gap-5 flex-1">
				<section className="grid grid-cols-2 gap-5">
					<div className="flex flex-col rounded-3xl p-5 gap-8 blue-gradient">
						<div className="flex items-center gap-4">
							<div className="flex size-14 rounded-full bg-monday-orange items-center justify-center">
								<img
									src="/assets/images/icons/wallet-2-white-fill.svg"
									className="size-6"
									alt="icon"
								/>
							</div>
							<p className="font-medium text-lg text-white">Total Revenue</p>
						</div>
						<div className="flex flex-col gap-3">
							<p className="font-bold text-[36px] text-white">
								{formatRupiah(totalRevenue)}
							</p>
							<hr className="border-monday-stroke/20" />
							<p className="font-medium text-lg text-white/60">
								Last Updated Today
							</p>
						</div>
					</div>
					<div className="flex flex-col rounded-3xl p-5 gap-8 bg-white">
						<div className="flex items-center gap-4">
							<div className="flex size-14 rounded-full bg-monday-blue/10 items-center justify-center">
								<img
									src="/assets/images/icons/star-blue.svg"
									className="size-6"
									alt="icon"
								/>
							</div>
							<p className="font-medium text-lg text-monday-gray">
								Total Testimonials
							</p>
						</div>
						<div className="flex flex-col gap-3">
							<p className="font-bold text-[36px]">320.500</p>
							<hr className="border-monday-stroke" />
							<p className="font-medium text-lg text-monday-gray">
								Last Updated Today
							</p>
						</div>
					</div>
				</section>
				<section className="grid grid-cols-3 gap-5">
					<div className="flex flex-col rounded-3xl p-5 gap-8 bg-white">
						<div className="flex items-center gap-4">
							<div className="flex size-14 rounded-full bg-monday-blue/10 items-center justify-center">
								<img
									src="/assets/images/icons/profile-2user-blue.svg"
									className="size-6"
									alt="icon"
								/>
							</div>
							<p className="font-medium text-lg text-monday-gray">
								Total Doctors
							</p>
						</div>
						<div className="flex flex-col gap-3">
							<p className="font-bold text-[36px]">{totalDoctors}</p>
							<hr className="border-monday-stroke" />
							<p className="font-medium text-lg text-monday-gray">
								Last Updated Today
							</p>
						</div>
					</div>
					<div className="flex flex-col rounded-3xl p-5 gap-8 bg-white">
						<div className="flex items-center gap-4">
							<div className="flex size-14 rounded-full bg-monday-blue/10 items-center justify-center">
								<img
									src="/assets/images/icons/hospital-blue.svg"
									className="size-6"
									alt="icon"
								/>
							</div>
							<p className="font-medium text-lg text-monday-gray">
								Total Hospitals
							</p>
						</div>
						<div className="flex flex-col gap-3">
							<p className="font-bold text-[36px]">{totalHospitals}</p>
							<hr className="border-monday-stroke" />
							<p className="font-medium text-lg text-monday-gray">
								Last Updated Today
							</p>
						</div>
					</div>
					<div className="flex flex-col rounded-3xl p-5 gap-8 bg-white">
						<div className="flex items-center gap-4">
							<div className="flex size-14 rounded-full bg-monday-blue/10 items-center justify-center">
								<img
									src="/assets/images/icons/stetoscop-blue.svg"
									className="size-6"
									alt="icon"
								/>
							</div>
							<p className="font-medium text-lg text-monday-gray">
								Total Specialists
							</p>
						</div>
						<div className="flex flex-col gap-3">
							<p className="font-bold text-[36px]">{totalSpecialties}</p>
							<hr className="border-monday-stroke" />
							<p className="font-medium text-lg text-monday-gray">
								Last Updated Today
							</p>
						</div>
					</div>
				</section>
				<div className="flex gap-5 flex-1">
					<section className="flex flex-col gap-6 flex-1 rounded-[20px] p-5 px-0 bg-white">
						<div className="flex flex-col gap-8">
							<div
								id="Header"
								className="flex items-center justify-between px-5"
							>
								<div className="flex items-center gap-4">
									<div className="flex size-14 rounded-full bg-monday-blue/10 items-center justify-center">
										<img
											src="/assets/images/icons/note-2-blue.svg"
											className="size-6"
											alt="icon"
										/>
									</div>
									<p className="font-medium text-lg text-monday-gray">
										Total Transactions
									</p>
								</div>
							</div>
							<div className="flex items-center justify-between px-5">
								<p className="font-bold text-[36px]">{totalTransactions}</p>
								<p className="font-semibold text-lg text-monday-gray">
									Last Updated Today
								</p>
							</div>
						</div>
						<hr className="border-monday-border" />
						<div
							id="Transactions-List"
							className="flex flex-col px-5 gap-5 flex-1"
						>
							<div className="flex items-center justify-between">
								<p className="font-semibold text-2xl">Recent Transactions</p>
							</div>
							<div className="flex flex-col gap-5">
								{recentTransactions.map((val) => (
									<React.Fragment key={val.id}>
										<div className="card flex items-center justify-between gap-6">
											<div className="flex items-center gap-4 w-[320px] shrink-0">
												<div className="flex size-[92px] rounded-full bg-monday-background overflow-hidden shrink-0">
													<img
														src={getImageUrl(val.doctor.photo, "doctors")}
														className="size-full object-cover"
														alt="icon"
													/>
												</div>
												<div className="flex flex-col gap-[6px] flex-1">
													<p className="font-semibold text-xl w-[212px] truncate">
														Dr. {val.doctor.name}
													</p>
													<p className="flex items-center gap-1 font-medium text-monday-gray text-lg leading-none">
														<img
															src="/assets/images/icons/stetoscop-grey.svg"
															className="size-5"
															alt="icon"
														/>
														{val.specialist.name}
													</p>
												</div>
											</div>
											<div className="flex items-center gap-1 w-[210px] shrink-0">
												<img
													src="/assets/images/icons/calendar-2-black.svg"
													className="size-6 flex shrink-0"
													alt="icon"
												/>
												<p className="font-semibold text-lg text-nowrap">
													{dateFormat(val.booking_date)}
												</p>
											</div>
											<div className="flex items-center gap-1 w-[210px] shrink-0">
												<img
													src="/assets/images/icons/hospital-black.svg"
													className="size-6 flex shrink-0"
													alt="icon"
												/>
												<p className="font-semibold text-lg text-nowrap">
													{val.hospital.name}
												</p>
											</div>
											<div className="flex items-center gap-4">
												<Link
													href={MANAGER_TRANSACTIONS_DETAIL_PAGE(val.id)}
													className="btn btn-primary-opacity min-w-[130px] font-semibold"
												>
													Details
												</Link>
											</div>
										</div>
										<hr className="border-monday-stroke last:hidden" />
									</React.Fragment>
								))}
							</div>
							{recentTransactions.length === 0 && (
								<div
									id="Empty-State"
									className="flex flex-col flex-1 items-center justify-center rounded-[20px] border-dashed border-2 border-monday-stroke gap-8"
								>
									<img
										src="/assets/images/icons/note-remove-grey.svg"
										className="size-[52px]"
										alt="icon"
									/>
									<div className="flex flex-col gap-1 items-center text-center">
										<p className="font-semibold text-monday-gray">
											Oops, you don't have any data yet
										</p>
									</div>
								</div>
							)}
						</div>
					</section>
				</div>
			</main>
		</div>
	);
}
