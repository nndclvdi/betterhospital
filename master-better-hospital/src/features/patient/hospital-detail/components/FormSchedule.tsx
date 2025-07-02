"use client";

import { dateFormat } from "@/shared/utils/date-formatter";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
	formScheduleSchema,
	type FormScheduleValues,
} from "../schema/schedule";
import { zodResolver } from "@hookform/resolvers/zod";
import { useScheduleDetail } from "../api/get-schedule-detail";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/shared/states/checkout";
import { BOOK_APPOINTMENT } from "@/shared/constants/uri-fe-page";

interface FormScheduleProps {
	schedules: string[];
	doctorId: string;
	hospitalId: string;
}

export default function FormSchedule({
	doctorId,
	hospitalId,
	schedules,
}: FormScheduleProps) {
	const router = useRouter();
	const { update } = useCheckout();
	const { handleSubmit, register, watch, reset } = useForm<FormScheduleValues>({
		resolver: zodResolver(formScheduleSchema),
	});
	const date = watch("date");

	const { data } = useScheduleDetail({ hospitalId, doctorId, date });

	const handleBooking = (val: FormScheduleValues) => {
		update({
			booking_date: dayjs(val.date_time).toDate(),
			doctor_id: doctorId,
			hospital_id: hospitalId,
		});

		router.push(BOOK_APPOINTMENT);
	};

	useEffect(() => {
		reset({ date_time: undefined, date });
	}, [date, reset]);

	return (
		<div
			id="Choose-Date"
			className="flex flex-col w-full flex-1 p-5 pb-0 gap-4 bg-white mt-5 min-h-[536px]"
		>
			<form
				onSubmit={handleSubmit(handleBooking)}
				className="flex flex-col gap-8"
			>
				<div className="peer/date flex flex-col gap-4">
					<p className="font-bold">Choose Date</p>
					<div className="grid grid-cols-3 gap-4">
						{schedules.map((item, i) => (
							<label
								key={`schedule-date-${i + 1}`}
								className="group relative flex flex-col items-center justify-center text-center rounded-xl ring-[1.5px] ring-monday-stroke p-4 gap-1 has-[:checked]:ring-2 has-[:checked]:ring-monday-blue has-[:checked]:bg-monday-blue/10 has-[:disabled]:bg-monday-stroke transition-300"
							>
								<input
									type="radio"
									className="absolute -z-10"
									value={item}
									{...register("date")}
								/>
								<p className="font-bold text-lg group-has-[:checked]:text-monday-blue transition-300">
									{dateFormat(item, "DD MMM")}
								</p>
								<p className="font-semibold text-sm text-monday-gray leading-none">
									{dateFormat(item, "ddd")}
								</p>
							</label>
						))}
					</div>
				</div>
				<div className="peer/time peer-has-[:checked]/date:flex hidden flex-col gap-4">
					<p className="font-bold">Choose Time</p>
					<div className="grid grid-cols-3 gap-4">
						{data?.map((item, index) => (
							<label
								key={`schedule-time-${index + 1}`}
								className="group relative flex flex-col items-center justify-center text-center rounded-xl ring-[1.5px] ring-monday-stroke p-4 gap-1 has-[:checked]:ring-2 has-[:checked]:ring-monday-blue has-[:checked]:bg-monday-blue/10 has-[:disabled]:bg-monday-stroke transition-300"
							>
								<input
									type="radio"
									className="absolute -z-10"
									value={dayjs(item.date).toISOString()}
									disabled={!item.is_available}
									{...register("date_time")}
								/>
								<div className="flex items-center gap-1">
									<div className="relative flex size-[18px] shrink-0">
										<img
											src="/assets/images/icons/clock-blue-thick.svg"
											className="absolute size-full object-contain opacity-0 group-has-[:checked]:opacity-100 transition-300"
											alt="icon"
										/>
										<img
											src="/assets/images/icons/clock-black-thick.svg"
											className="absolute size-full object-contain opacity-100 group-has-[:checked]:opacity-0 transition-300"
											alt="icon"
										/>
									</div>
									<p className="font-bold group-has-[:checked]:text-monday-blue transition-300">
										{item.is_available
											? dateFormat(item.date, "HH:mm")
											: "Soldout"}
									</p>
								</div>
								<p className="font-semibold text-sm text-monday-blue group-has-[:checked]:text-monday-gray group-has-[:disabled]:text-monday-gray transition-300 leading-none">
									Available
								</p>
							</label>
						))}
					</div>
				</div>
				<div className="peer-has-[:checked]/time:flex hidden h-[104px] w-full">
					<div id="Bottom-Bar" className="flex relative w-full h-[104px] -ml-5">
						<div className="fixed z-30 bottom-0 w-full max-w-[640px] px-5 py-6 bg-white border-t border-monday-stroke">
							<button
								type="submit"
								className="flex items-center w-full justify-between rounded-full py-4 px-6 bg-monday-blue"
							>
								<span className="font-semibold text-lg leading-none text-white">
									Continue Payment
								</span>
								<img
									src="/assets/images/icons/arrow-right-circle-white.svg"
									className="flex size-6 shrink-0"
									alt="icon"
								/>
							</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}
