import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Topbar from "@/shared/components/Topbar";
import TransactionCard from "@/features/admin/dashboard/transactions/components/TransactionCard";
import { getTransactions } from "@/features/admin/dashboard/transactions/services/get-transactions";
import EmptyData from "@/features/admin/dashboard/transactions/components/EmptyData";

export const metadata: Metadata = {
	title: "Manage Transactions",
};

export default async function DashboardManagerTransactionPage() {
	const data = await getTransactions();

	return (
		<div id="main-container" className="flex flex-col flex-1 p-6 pt-0">
			<Topbar>
				<div className="flex flex-col gap-2 w-full">
					<h1 className="font-bold text-2xl capitalize">Manage Transactions</h1>
					<p className="flex items-center gap-1 font-semibold text-monday-gray text-lg leading-none">
						View & Update Your Transactions Here
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
				<section className="flex flex-col gap-6 flex-1 rounded-[20px] p-5 px-0 bg-white">
					<div id="Header" className="flex items-center justify-between px-5">
						<div className="flex flex-col gap-2">
							<p className="font-semibold text-xl">All Transactions</p>
							<p className="flex items-center gap-1 font-semibold text-monday-gray text-lg leading-none">
								<img
									src="/assets/images/icons/note-2-grey.svg"
									className="size-5"
									alt="icon"
								/>
								3 Total Transactions
							</p>
						</div>
					</div>
					<div className="flex flex-col px-5 gap-5 flex-1">
						{data.length > 0 ? (
							<div id="List-Container" className="flex flex-col gap-5">
								{data.map((item) => (
									<TransactionCard key={item.id} data={item} />
								))}
							</div>
						) : (
							<EmptyData />
						)}
					</div>
				</section>
			</main>
		</div>
	);
}
