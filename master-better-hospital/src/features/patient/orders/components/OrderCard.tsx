import { StatusBgColor, StatusText, StatusTextColor } from "@/shared/constants/status-text";
import { ORDER_DETAIL_PAGE } from "@/shared/constants/uri-fe-page";
import { dateFormat } from "@/shared/utils/date-formatter";
import { getImageUrl } from "@/shared/utils/image";
import Link from "next/link";
import React from "react";
import { TransactionStatus } from "../../../../../generated/prisma";

type Data = {
	hospital: {
		name: string;
		photo: string;
		city: string;
		postal_code: string;
	};
	specialist: {
		name: string;
	};
	id: string;
	booking_date: Date;
	status: string;
};

type OrderCardProps = {
	data: Data;
};

export default function OrderCard({ data }: OrderCardProps) {
	const { hospital, specialist, id, booking_date, status } = data;

	return (
		<div className="flex flex-col rounded-2xl border border-monday-stroke p-4 gap-4">
			<div className="flex items-center gap-4">
				<div className="flex size-16 rounded-2xl bg-monday-background overflow-hidden shrink-0">
					<img
						src={getImageUrl(hospital.photo, "hospitals")}
						className="size-full object-cover"
						alt="icon"
					/>
				</div>
				<div className="flex flex-col gap-[6px] w-full overflow-hidden">
					<p className="font-semibold">{hospital.name}</p>
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
					<p className="font-semibold leading-none text-white">4.8</p>
				</div>
			</div>
			<hr className="border-monday-stroke" />
			<div className="flex flex-col gap-4">
				<div className="flex items-center justify-between">
					<p className="flex items-center gap-[6px] font-medium text-monday-gray leading-none">
						<img
							src="/assets/images/icons/timer-grey.svg"
							className="size-5"
							alt="icon"
						/>
						Status
					</p>
					<p className={`rounded-[4px] py-[6px] px-2 font-bold ${StatusTextColor[status as TransactionStatus]} ${StatusBgColor[status as TransactionStatus]}`}>
						{StatusText[status as TransactionStatus]}
					</p>
				</div>
				<div className="flex items-center justify-between">
					<p className="flex items-center gap-[6px] font-medium text-monday-gray leading-none">
						<img
							src="/assets/images/icons/stetoscop-grey.svg"
							className="size-5"
							alt="icon"
						/>
						Specialist
					</p>
					<p className="font-bold leading-none">{specialist.name}</p>
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
						{dateFormat(booking_date, "MMM DD, YYYY")}
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
						{dateFormat(booking_date, "HH:mm A")}
					</p>
				</div>
			</div>
			<hr className="border-monday-stroke" />
			<Link
				href={ORDER_DETAIL_PAGE(id)}
				className="flex items-center justify-center w-full h-[56px] rounded-full py-4 px-6 bg-monday-blue/10"
			>
				<span className="font-semibold text-lg leading-none text-monday-blue">
					View Details
				</span>
			</Link>
		</div>
	);
}
