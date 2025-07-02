import { dateFormat } from "@/shared/utils/date-formatter";
import { STATUS_COLOR, STATUS_TEXT } from "../constants/transaction.constant";
import type { Transaction } from "../types/transaction.type";

interface ITxInfoProps {
	data: Transaction;
}

export default function TxInfo({ data }: ITxInfoProps) {
	return (
		<>
			<div className="card flex items-center justify-between gap-6">
				<div className="flex items-center gap-4 w-[320px] shrink-0">
					<div className="flex size-[92px] rounded-full bg-monday-background overflow-hidden shrink-0">
						<img
							src="/assets/images/photos/user-5.png"
							className="size-full object-cover"
							alt="icon"
						/>
					</div>
					<div className="flex flex-col gap-[6px] flex-1">
						<p className="font-semibold text-xl w-[222px] truncate">
							{data.user.name}
						</p>
						<p className="flex items-center gap-1 font-medium text-monday-gray text-lg leading-none">
							<img
								src="/assets/images/icons/man-grey.svg"
								className="size-6"
								alt="icon"
							/>
							{data.user.gender === "MALE" ? "Male" : "Female"}
						</p>
					</div>
				</div>
				<div className="flex flex-col gap-2 w-[220px]">
					<p className="flex items-center gap-0.5 font-semibold text-lg leading-none">
						<img
							src="/assets/images/icons/calendar-2-black.svg"
							className="size-6"
							alt="icon"
						/>
						{dateFormat(data.date, "DD MMM YYYY")}
					</p>
				</div>
				<div className="flex flex-col gap-2 w-[220px]">
					<p className="flex items-center gap-0.5 font-semibold text-lg leading-none">
						<img
							src="/assets/images/icons/clock-black.svg"
							className="size-6"
							alt="icon"
						/>
						{dateFormat(data.date, "HH:mm")}
					</p>
				</div>
				<p
					className={`badge flex w-[100px] shrink-0 rounded-full py-3 items-center justify-center text-white font-bold text-sm leading-none ${STATUS_COLOR.SUCCESS}`}
				>
					{STATUS_TEXT[data.status]}
				</p>
			</div>
			<hr className="border-monday-stroke last:hidden" />
		</>
	);
}
