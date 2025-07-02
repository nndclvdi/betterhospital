import Form from "@/features/admin/dashboard/hospitals/components/Form";
import Topbar from "@/shared/components/Topbar";
import { MANAGER_HOSPITALS_PAGE } from "@/shared/constants/uri-fe-page";
import Link from "next/link";
import React from "react";

export default function DashboardHospitalCreate() {
	return (
		<div id="Content" className="flex flex-col flex-1 p-6 pt-0">
			<Topbar>
				<div className="flex items-center gap-6 h-[102px] bg-white w-full rounded-3xl p-[18px]">
					<div className="flex flex-col gap-2 w-full">
						<h1 className="font-bold text-2xl capitalize">Add New Hospital</h1>
						<Link
							href={MANAGER_HOSPITALS_PAGE}
							className="flex items-center gap-1 font-semibold text-monday-gray text-lg leading-none"
						>
							<img
								src="/assets/images/icons/arrow-left-grey.svg"
								className="size-[18px] flex shrink-0"
								alt="icon"
							/>
							Manage Hospitals
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
				</div>
			</Topbar>
			<main className="flex flex-col gap-5 flex-1">
				<Form type="CREATE" />
			</main>
		</div>
	);
}
