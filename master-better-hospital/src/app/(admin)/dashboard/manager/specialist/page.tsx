import RowItem from "@/features/admin/dashboard/specialist/components/RowItem";
import { getSpecialists } from "@/features/admin/dashboard/specialist/lib/services/specialistService";
import Topbar from "@/shared/components/Topbar";
import {
	MANAGER_SPECIALIST_CREATE_PAGE,
	MANAGER_SPECIALIST_PAGE,
} from "@/shared/constants/uri-fe-page";
import Link from "next/link";
import React from "react";

export default async function SpecialistPage() {
	const specialists = await getSpecialists();

	return (
		<div id="Content" className="flex flex-col flex-1 p-6 pt-0">
			<Topbar>
				<div className="flex flex-col gap-2 w-full">
					<h1 className="font-bold text-2xl capitalize">Manage Specialists</h1>
					<p className="flex items-center gap-1 font-semibold text-monday-gray text-lg leading-none">
						View & Update Your Specialist Here
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
							<p className="font-semibold text-xl">All Specialists</p>
							<p className="flex items-center gap-1 font-semibold text-monday-gray text-lg leading-none">
								<img
									src="/assets/images/icons/stetoscop-grey.svg"
									className="size-6"
									alt="icon"
								/>
								{specialists.length} Total Specialists
							</p>
						</div>
						<Link
							href={MANAGER_SPECIALIST_CREATE_PAGE}
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
					<hr className="border-monday-border" />
					<div className="flex flex-col px-5 gap-5 flex-1">
						{specialists.length > 0 ? (
							<div id="List-Container" className="flex flex-col gap-5">
								{specialists.map((item) => (
									<RowItem
										key={item.id}
										data={{
											name: item.name,
											id: item.id,
											photo: item.photo,
											price: item.price,
											totalDoctors: item.total_doctor,
										}}
									/>
								))}
							</div>
						) : (
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
									<Link href="#" className="font-bold text-monday-blue">
										Create Now +
									</Link>
								</div>
							</div>
						)}
					</div>
				</section>
			</main>
		</div>
	);
}
