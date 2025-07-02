import DoctorInfo from "@/features/admin/dashboard/doctors/components/DoctorInfo";
import EmptyListTransaction from "@/features/admin/dashboard/doctors/components/EmptyListTransaction";
import TxInfo from "@/features/admin/dashboard/doctors/components/TxInfo";
import { findDoctorTransaction } from "@/features/admin/dashboard/doctors/services/doctorService";
import Topbar from "@/shared/components/Topbar";
import { MANAGER_DOCTORS_PAGE } from "@/shared/constants/uri-fe-page";
import type { Params } from "@/shared/types/params";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardManagerDoctorDetail({ params }: Params) {
	const { id } = await params;
	const data = await findDoctorTransaction(id);

	if (!data) {
		redirect(MANAGER_DOCTORS_PAGE);
	}

	return (
		<div id="Content" className="flex flex-col flex-1 p-6 pt-0">
			<Topbar>
				<div className="flex flex-col gap-2 w-full">
					<h1 className="font-bold text-2xl capitalize">Doctor Details</h1>
					<Link
						href={MANAGER_DOCTORS_PAGE}
						className="flex items-center gap-1 font-semibold text-monday-gray text-lg leading-none"
					>
						<img
							src="/assets/images/icons/arrow-left-grey.svg"
							className="size-[18px] flex shrink-0"
							alt="icon"
						/>
						Manage Doctors
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
				<DoctorInfo data={data} />
				<section className="flex flex-col gap-6 flex-1 rounded-[20px] p-5 px-0 bg-white">
					<div id="Header" className="flex items-center justify-between px-5">
						<div className="flex flex-col gap-2">
							<p className="font-semibold text-xl">Latest Transactions</p>
							<p className="flex items-center gap-1 font-semibold text-monday-gray text-lg leading-none">
								<img
									src="/assets/images/icons/stetoscop-grey.svg"
									className="size-6"
									alt="icon"
								/>
								{data.transactions.length} Total Transactions
							</p>
						</div>
					</div>
					<hr className="border-monday-stroke" />
					<div className="flex flex-col px-5 gap-5 flex-1">
						{data.transactions.length > 0 ? (
							<div id="List-Container" className="flex flex-col gap-5">
								{data.transactions.map((tx) => (
									<TxInfo
										key={tx.id}
										data={{
											date: tx.booking_date,
											id: tx.id,
											status: tx.status,
											user: tx.user,
										}}
									/>
								))}
							</div>
						) : (
							<EmptyListTransaction />
						)}
					</div>
				</section>
			</main>
		</div>
	);
}
