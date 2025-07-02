import Link from "next/link";
import React from "react";
import { dateFormat } from "@/shared/utils/date-formatter";
import { getImageUrl } from "@/shared/utils/image";
import { StatusBgColor, StatusText } from "@/shared/constants/status-text";
import type { TransactionStatus } from "../../../../../../generated/prisma";
import { MANAGER_TRANSACTIONS_DETAIL_PAGE } from "@/shared/constants/uri-fe-page";

type TransactionCardProps = {
	data: {
		user: {
			name: string;
			gender: string;
			photo: string;
		};
		hospital: {
			name: string;
			city: string;
			photo: string;
		};
		status: string;
		specialist: {
			name: string;
		};
		booking_date: Date;
		id: string;
	};
};

export default function TransactionCard({ data }: TransactionCardProps) {
	return (
		<div className="card flex flex-col gap-5 p-4 rounded-2xl border border-monday-stroke">
			<div className="flex items-center justify-between gap-5">
				<div className="flex items-center gap-4 w-full">
					<div className="flex size-[92px] rounded-full bg-monday-background overflow-hidden shrink-0">
						<img
							src={getImageUrl(data.user.photo, "patients")}
							className="size-full object-cover"
							alt="icon"
						/>
					</div>
					<div className="flex flex-col gap-[6px] flex-1">
						<p className="font-semibold text-xl line-clamp-1">
							{data.user.name}
						</p>
						<p className="flex items-center gap-1 font-medium text-monday-gray text-lg leading-none">
							<img
								src="/assets/images/icons/man-grey.svg"
								className="size-6"
								alt="icon"
							/>
							{data.user.gender}
						</p>
					</div>
				</div>
				<div className="flex items-center gap-4 w-full">
					<div className="flex size-[92px] rounded-2xl bg-monday-background overflow-hidden shrink-0">
						<img
							src={getImageUrl(data.hospital.photo, "hospitals")}
							className="size-full object-cover"
							alt="icon"
						/>
					</div>
					<div className="flex flex-col gap-[6px] flex-1">
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
					</div>
				</div>
				<p
					className={`badge flex w-[100px] shrink-0 rounded-full py-3 items-center justify-center text-white font-bold text-sm leading-none ${StatusBgColor[data.status as TransactionStatus]}`}
				>
					{StatusText[data.status as TransactionStatus]}
				</p>
			</div>
			<hr className="border-monday-stroke" />
			<div className="flex items-center gap-5">
				<div className="flex items-center w-full gap-3">
					<div className="flex size-[56px] rounded-full p-4 bg-monday-gray-background overflow-hidden">
						<img
							src="/assets/images/icons/stetoscop-black.svg"
							className="size-6 object-contain object-center"
							alt="icon"
						/>
					</div>
					<div>
						<p className="font-semibold text-xl">{data.specialist.name}</p>
						<p className="font-medium text-monday-gray">Specialist Name</p>
					</div>
				</div>
				<div className="flex items-center w-full gap-3">
					<div className="flex size-[56px] rounded-full p-4 bg-monday-gray-background overflow-hidden">
						<img
							src="/assets/images/icons/calendar-2-black.svg"
							className="size-6 object-contain object-center"
							alt="icon"
						/>
					</div>
					<div>
						<p className="font-semibold text-xl">
							{dateFormat(data.booking_date, "DD MMMM YYYY")}
						</p>
						<p className="font-medium text-monday-gray">Appointment Schedule</p>
					</div>
				</div>
				<Link
					href={MANAGER_TRANSACTIONS_DETAIL_PAGE(data.id)}
					className="btn btn-primary-opacity min-w-[120px] font-semibold"
				>
					Details
				</Link>
			</div>
		</div>
	);
}
